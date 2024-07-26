import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Node,
  Controls,
  MarkerType,
  useNodesState,
  Edge,
  addEdge,
  useEdgesState,
  ConnectionLineType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from 'antd'
import CustomEdgeComponent from "./CustomEdge/CustomEdgeComponent.tsx"
import EditComponent from './Edit/EditComponent'
import CustomNodeComponent from './CustomNode/CustomNodeComponent.tsx'

const nodeTypes = { customNode: CustomNodeComponent }
const edgeTypes = { customEdge: CustomEdgeComponent } 

interface CustomNode extends Node {
}

const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
  const [nodeName, setNodeName] = useState<string>("New Node")
  const [nodeColor, setNodeColor] = useState<string>("black")
  const [nodeShape, setNodeShape] = useState<string>("rectangle")
  const [selectedNodeId, setSelectedNodeId] = useState<string>("")
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  const addNewNode = () => {
    const newNode: CustomNode = {
      id: (nodes.length + 1).toString(),
      data: { label: "New Node", shape: "rectangle", color: "black" },
      position: {
        x: nodes.length * 20,
        y: nodes.length * 20,
      },
      type: "customNode"
    }

    setNodes((prev) => [...prev, newNode])
  }

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            type: "customEdge",
            markerEnd: { type: MarkerType.Arrow, color: "black" },
            style: { strokeWidth: 1, stroke: "black" },
          },
          edges
        )
      ),
    []
  )

  const selectNode = (node: CustomNode) => {
    setSelectedNodeId(node.id);
    setNodeName(node.data.label);
    setNodeColor(node.data.color);
    setNodeShape(node.data.shape);
    setIsEditOpen(true);
  }

  useEffect(() => {
    if (selectedNodeId) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              data: { ...node.data, label: nodeName, shape: nodeShape, color: nodeColor }
            }
          }
          return node
        })
      )
    }
  }, [nodeName, nodeColor, nodeShape, selectedNodeId])

  return (
    <>
      <Button onClick={addNewNode} style={{ margin: '1rem' }}>
        ADD NEW NODE
      </Button>
      <div style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={true}
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
        >
          <Controls />
        </ReactFlow>
      </div>
      {isEditOpen ? (
        <EditComponent
          nodeName={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          setNodeColor={setNodeColor}
          setNodeShape={setNodeShape}
        />
      ) : ""}
    </>
  )
}

export default FlowComponent
