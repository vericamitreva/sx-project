import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  MarkerType,
  useNodesState,
  Edge,
  addEdge,
  useEdgesState,
  ConnectionLineType,
  PanOnScrollMode,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from 'antd'
import CustomEdgeComponent from './CustomEdge/CustomEdgeComponent.tsx'
import EditComponent from './Edit/EditComponent.tsx'
import CustomNodeComponent from './CustomNode/CustomNodeComponent.tsx'
import style from "./flowComponent.module.css"
import type { CustomNode, NodeData, TaskType } from '../../assets/types.ts'
import { saveNodes} from './DataOperations/dataOperations.tsx'
import { addNewNode } from './AddNewNode/addNewNode.tsx'
import { fetchFlowData } from './FetchFlowData/fetchFlowData.tsx'

const nodeTypes = { customNode: CustomNodeComponent }
const edgeTypes = { customEdge: CustomEdgeComponent }

const FlowComponent = () => {
  
  const initialNodeData = {
    id: '',
    label: 'New Node',
    shape: 'rectangle',
    borderColor: 'black',
    taskModule: "",
    startTasks: [] as number[],
    backgroundColor: "",
    taskName: '',
    taskType: 'task' as TaskType,
    attachmentType: '',
    hasAttachment: false,
    timeToCompleteInDays: 0,
    taskOrder: 0,
    responsibleUser: [] as number[],
    responsibleGroup: [] as number[],
    icon: ""
  }

  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [nodeData, setNodeData] = useState<NodeData>(initialNodeData)
  const [selectedNodeId, setSelectedNodeId] = useState<string>('')
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const proOptions = { hideAttribution: true }
  const { setViewport, fitView } = useReactFlow()

  //localStorage.clear()

  const handleAddNewNode = () => {
    addNewNode(nodes as CustomNode[], setNodes, edges, setEdges, initialNodeData)
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
    [edges]
  )

  const selectNode = (node: CustomNode) => {
    setSelectedNodeId(node.id)
    setNodeData(node.data)
    setIsEditOpen(true)
  }

  useEffect(() => {
    fetchFlowData(
      setNodes,
      setEdges,
      setViewport,
      fitView,
      setContainerWidth
    )
  }, [setNodes, setEdges, setViewport, fitView])

  useEffect(() => {
    const updateNode = async () => {
      if (selectedNodeId) {
        const updatedNodes = nodes.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, ...nodeData } }
            : node
        )

        setNodes(updatedNodes)
        await saveNodes(updatedNodes as CustomNode[])
        //await fetchNodes()
        console.log("Updated Nodes", updatedNodes)
      }
    }

    updateNode()

    console.log("Selected Node ID:", selectedNodeId)
    console.log("Node Data:", nodeData)

  }, [nodeData])

  const handleButtonClick = () => {
    localStorage.clear()
  }

  //console.log(nodes)

  return (
    <>
      <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center"}} onClick={() => (setIsEditOpen(false))}>
        <div onClick={(e) => {e.stopPropagation()}}>
          <Button onClick={handleAddNewNode} style={{ margin: '1rem' }}>
            ADD NEW NODE
          </Button>
          <Button onClick={handleButtonClick}>
            CLEAR LOCAL STORAGE
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
            onClick={(e) => {e.stopPropagation()}}
            onPaneClick={() => setIsEditOpen(false)}
            onNodeClick={(_e, node) => selectNode(node as CustomNode)}
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
            nodeData={nodeData}
            setNodeData={setNodeData}
            nodes={nodes}
            setNodes={setNodes}
            selectedNodeId={selectedNodeId} 
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default FlowComponent
