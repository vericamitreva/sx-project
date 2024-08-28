// src/flowComponent/DagreLayout.ts
import dagre from 'dagre'
import { Edge, Position } from 'reactflow'
import { CustomNode } from '../../../assets/types'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 150
const nodeHeight = 60

export const getLayoutedElements = (
  nodes: CustomNode[],
  edges: Edge[],
  direction = 'TB'
): { nodes: CustomNode[]; edges: Edge[] } => {
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const layoutedNode: CustomNode = {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    }

    return layoutedNode
  })

  return { nodes: layoutedNodes, edges }
}
