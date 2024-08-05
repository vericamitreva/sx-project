import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  Controls,
  MarkerType,
  useNodesState,
  Edge,
  addEdge,
  useEdgesState,
  ConnectionLineType,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from 'antd'
import dagre from 'dagre'
import CustomEdgeComponent from './CustomEdge/CustomEdgeComponent.tsx'
import EditComponent from './Edit/EditComponent'
import CustomNodeComponent from './CustomNode/CustomNodeComponent.tsx'
import nodesData from './../../assets/data/data.json'
import MODULES_ARR from '../../assets/modules.tsx'

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
  const initialNodeData = { label: 'New Node', shape: 'rectangle', color: 'black' }

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [nodeData, setNodeData] = useState(initialNodeData)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('')
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  const addNewNode = () => {
    const newNode: CustomNode = {
      id: (nodes.length + 1).toString(),
      data: nodeData,
      position: {
        x: nodes.length * 20,
        y: nodes.length * 20,
      },
      style: {},
      type: 'customNode',
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
      color: node.data.color,
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
                color: nodeData.color,
              },
            }
          }
          return node
        })
      )
    }
  }, [nodeData, selectedNodeId])

  useEffect(() => {
    const jsonNodes: CustomNode[] = nodesData.map((node) => {
      const module = MODULES_ARR.find((module) => module.name === node.task_module)
      const icon = MODULES_ARR.find((module) => module.name === node.task_module)?.whiteIcon

      return {
        id: node.id.toString(),
        data: {
          label: node.task_name,
          shape: 'rectangle',
          color: 'black',
          taskModule: node.task_module,
          taskOrder: node.task_order,
          startTasks: node.start_tasks,
          backgroundColor: module ? module.color : '',
          icon: icon,
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
  }, [setNodes, setEdges])

  return (
    <>
      <Button onClick={addNewNode} style={{ margin: '1rem' }}>
        ADD NEW NODE
      </Button>
      <div style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable={true}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onPaneClick={() => setIsEditOpen(false)}
          onNodeClick={(_e, node) => selectNode(node)}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ strokeWidth: 1, stroke: 'black' }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
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
    </>
  )
}

export default FlowComponent