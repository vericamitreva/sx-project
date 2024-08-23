import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  MarkerType,
  useNodesState,
  Edge,
  addEdge,
  useEdgesState,
  ConnectionLineType,
  Position,
  PanOnScrollMode,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from 'antd'
import dagre from 'dagre'
import CustomEdgeComponent from './CustomEdge/CustomEdgeComponent.tsx'
import EditComponent from './Edit/EditComponent'
import CustomNodeComponent from './CustomNode/CustomNodeComponent.tsx'
import nodesData from './../../assets/data/data.json'
import MODULES_ARR from '../../assets/modules.tsx'
import style from "./flowComponent.module.css"

const nodeTypes = { customNode: CustomNodeComponent }
const edgeTypes = { customEdge: CustomEdgeComponent }

interface CustomNode extends Node {}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 150
const nodeHeight = 60

const getLayoutedElements = (nodes: CustomNode[], edges: Edge[], direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const FlowComponent = () => {
  const initialNodeData = { 
    label: 'New Node', 
    shape: 'rectangle', 
    borderColor: 'black' }

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [nodeData, setNodeData] = useState(initialNodeData)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('')
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const proOptions = { hideAttribution: true }

  const addNewNode = () => {
    const maxId = nodes.length > 0 ? Math.max(...nodes.map((node) => parseInt(node.id))) : 0
    const newNodeId = (maxId+1).toString()

    console.log(newNodeId)

    const newNode: CustomNode = {
      id: newNodeId,
      data: nodeData,
      position: {
        x: nodes.length * 20,
        y: nodes.length * 20,
      },
      style: {},
      type: 'customNode'
    }

    setNodes((prev) => [...prev, newNode])
  }

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            type: 'customEdge',
            markerEnd: { type: MarkerType.Arrow, color: 'black' },
            style: { strokeWidth: 1, stroke: 'black' },
          },
          edges
        )
      ),
    []
  )

  const selectNode = (node: CustomNode) => {
    setSelectedNodeId(node.id)
    setNodeData({
      label: node.data.label,
      shape: node.data.shape,
      borderColor: node.data.borderColor,
    })
    setIsEditOpen(true)
  }

  useEffect(() => {
    if (selectedNodeId) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: nodeData.label,
                shape: nodeData.shape,
                borderColor: nodeData.borderColor,
              },
            }
          }
          return node
        })
      )
    }
  }, [nodeData, selectedNodeId])

  const { setViewport, fitView } = useReactFlow()

  useEffect(() => {
    const jsonNodes: CustomNode[] = nodesData.map((node) => {
      const module = MODULES_ARR.find((module) => module.name === node.task_module)
      const icon = MODULES_ARR.find((module) => module.name === node.task_module)?.colorIcon

      return {
        id: node.id.toString(),
        data: {
          id: node.id,
          label: node.task_name,
          shape: 'rectangle',
          borderColor: 'black',
          taskModule: node.task_module,
          startTasks: node.start_tasks,
          backgroundColor: module ? module.color : '',
          icon: icon
        },
        style: {
          borderRadius: '5px',
        },
        position: { x: 0, y: 0 },
        type: 'customNode',
      }
    })

    const jsonEdges: Edge[] = nodesData.flatMap((node) =>
      node.start_tasks.map((startTask) => ({
        id: `${node.id}-${startTask}`,
        source: node.id.toString(),
        target: startTask.toString(),
        type: 'customEdge',
        markerEnd: { type: MarkerType.Arrow, color: 'black' },
        style: { strokeWidth: 1, stroke: 'black' },
      }))
    )

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      jsonNodes,
      jsonEdges,
      'TB'
    )

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)

    const graphWidth = (Math.max(...layoutedNodes.map(node => node.position.x)) + Math.min(...layoutedNodes.map(node => node.position.x)))+nodeWidth/2
    const graphWidthWindow = window.innerWidth < 1240 ? 0.5*graphWidth : 1.5*graphWidth

    setContainerWidth(graphWidthWindow)

    setViewport({ x: 0, y:0, zoom: window.innerWidth < 1240 ? 0.5 : 1.5 })
    fitView()

  }, [setNodes, setEdges, setViewport])

  return (
    <>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>
          <Button onClick={addNewNode} style={{ margin: '1rem' }}>
            ADD NEW NODE
          </Button>
        </div>
        <div style={{position: "relative", height: "100dvh", width: `${containerWidth}px`}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodesDraggable={false}
            nodesConnectable={false}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onPaneClick={() => setIsEditOpen(false)}
            onNodeClick={(_e, node) => selectNode(node)}
            connectionLineType={ConnectionLineType.SmoothStep}
            connectionLineStyle={{ strokeWidth: 1, stroke: 'black' }}
            panOnScroll={false}
            panOnDrag={false}
            preventScrolling={false}
            panOnScrollMode={PanOnScrollMode.Vertical}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            proOptions={proOptions}
            className={style.flow}
            color='white'
          >
            {/* <Controls /> */}
          </ReactFlow>
        </div>
        {isEditOpen ? (
          <EditComponent
            nodeName={nodeData.label}
            onChange={(e) => setNodeData((prev) => ({ ...prev, label: e.target.value }))}
            nodeData={nodeData}
            setNodeData={setNodeData}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default FlowComponent