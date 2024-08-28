import { Edge } from "reactflow"
import { CustomNode, NodeData } from "../../../assets/types"
import { getLayoutedElements } from "../DagreLayout/DagreLayout"
import { saveEdges, saveNodes } from "../DataOperations/dataOperations"
import { MarkerType } from "@xyflow/react"

export const addNewNode = (
    nodes: CustomNode[], 
    setNodes: (nodes: CustomNode[]) => void,
    edges: Edge[],  
    setEdges: (edges: Edge[]) => void,
    initialNodeData: NodeData
) => {

    const maxId = nodes.length > 0 ? Math.max(...nodes.map((node) => parseInt(node.id))) : 0
    const newNodeId = (maxId+1).toString()

    const newNodeData: NodeData = {
      ...initialNodeData,
      id: newNodeId,
    }

    const newNode: CustomNode = {
      id: newNodeId,
      data: newNodeData,
      style: {
        borderRadius: '5px',
      },
      position: { x: 0, y: 0 }, 
      type: 'customNode'
    }

    const updatedNodes = [...nodes, newNode]
    setNodes(updatedNodes)
    saveNodes(updatedNodes as CustomNode[]) 

    const newEdge: Edge = {
      id: `${newNodeId}-${newNode.data.startTasks[0]}`,
      source: (parseInt(newNodeId)-1).toString(),
      target: newNodeId,
      type: "customEdge",
      markerEnd: { type: MarkerType.Arrow, color: 'black' },
      style: { strokeWidth: 1, stroke: 'black' },
    }

    const updatedEdges = [...edges, newEdge]
    setEdges(updatedEdges)
    saveEdges(updatedEdges)

    const {nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(
      updatedNodes as CustomNode[],
      updatedEdges,
      "TB"
    )

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
}