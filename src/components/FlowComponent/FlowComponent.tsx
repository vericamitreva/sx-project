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
import { saveEdges, saveNodes} from './DataOperations/dataOperations.tsx'
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

  const handleSaveEdit = async () => {
    if (selectedNodeId) {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNodeId ? { ...node, data: nodeData } : node
      )
      setNodes(updatedNodes)
      await saveNodes(updatedNodes as CustomNode[])
      localStorage.setItem("nodes", JSON.stringify(updatedNodes))

      const updatedEdges = edges.filter(edge => 
        nodeData.startTasks.includes(parseInt(edge.target)) 
        || edge.source !== selectedNodeId)
      
      nodeData.startTasks.forEach((startTask) => {
        const alreadyExistingEdge = updatedEdges.some(edge => 
          edge.source === selectedNodeId && edge.target === startTask.toString()
        )

        if (!alreadyExistingEdge) {
          updatedEdges.push({
            id: `${selectedNodeId}-${startTask}`,
            source: selectedNodeId,
            target: startTask.toString(),
            type: "customEdge",
            markerEnd: { type: MarkerType.Arrow, color: "black"},
            style: { strokeWidth: 1, stroke: "black" }
          })
        }
      })

      console.log(updatedEdges)

      setEdges(updatedEdges)
      await saveEdges(updatedEdges as Edge[])
      localStorage.setItem("edges", JSON.stringify(updatedEdges))

      setIsEditOpen(false)
    }
  }

  const handleButtonClick = () => {
    localStorage.clear()
    fetchFlowData(
      setNodes,
      setEdges,
      setViewport,
      fitView,
      setContainerWidth
    )
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
        {isEditOpen && selectedNodeId &&
          <EditComponent
            nodeName={nodeData.label}
            nodeData={nodeData}
            setNodeData={setNodeData}
            nodes={nodes}
            setNodes={setNodes}
            selectedNodeId={selectedNodeId}
            handleSaveEdit={handleSaveEdit}
          />
        }
      </div>
    </>
  )
}

export default FlowComponent
