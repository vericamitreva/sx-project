import { Edge } from "reactflow"
import { CustomNode } from "../../../assets/types"
import { getLayoutedElements } from "../DagreLayout/DagreLayout"
import { fetchEdges, fetchNodes, saveEdges, saveNodes } from "../DataOperations/dataOperations"
import { fetchEdgesFromJson, fetchNodesFromJson } from "../FetchNodes&EdgesFromJSON/FetchNodes&EdgesFromJSON"

const nodeWidth = 150

export const fetchFlowData = async (
    setNodes: (nodes: CustomNode[]) => void,
    setEdges: (edges: Edge[]) => void,
    setViewport: (viewport: { x: number, y: number, zoom: number }) => void,
    fitView: () => void,
    setContainerWidth: (width: number) => void
) => {

    const storedNodes = await fetchNodes()
    const storedEdges = await fetchEdges()

    const jsonNodes = await fetchNodesFromJson()
    const jsonEdges = await fetchEdgesFromJson()

    const allNodes: CustomNode[] = Array.from(new Map([...storedNodes, ...jsonNodes].map((node) => [node.id, node as CustomNode])).values())

    const allEdges = Array.from(new Map([...storedEdges, ...jsonEdges].map((edge) => [edge.id, edge])).values())

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      allNodes,
      allEdges,
      'TB'
    )

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)

    saveNodes(layoutedNodes)
    saveEdges(layoutedEdges)

    const updateViewport = async () => {
      const graphWidth = (Math.max(...layoutedNodes.map(node => node.position.x)) + Math.min(...layoutedNodes.map(node => node.position.x)))+nodeWidth/2
      const graphWidthWindow = window.innerWidth < 1240 ? 0.5*graphWidth : 1.5*graphWidth
  
      setContainerWidth(graphWidthWindow)

      fitView()
      setViewport({ x: 0, y:0, zoom: window.innerWidth < 1240 ? 0.5 : 1.5 })
    }

    window.addEventListener("resize", updateViewport)
    updateViewport()

    return () => window.removeEventListener("resize", updateViewport)
    
  }