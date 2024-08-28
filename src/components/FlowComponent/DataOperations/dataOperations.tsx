import { Edge } from "reactflow"
import { CustomNode } from "../../../assets/types"

const saveNodes = (nodes: CustomNode[]) : Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveNodesToStorage(nodes)
        resolve()
      }, 10)
      console.log("Saving Nodes:", nodes)
    })
}

const saveEdges = (edges: Edge[]) : Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
        saveEdgesToStorage(edges)
        resolve()
        }, 10)
    })
}

const fetchNodes = () : Promise<CustomNode[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getNodesFromStorage())
      }, 10)
    })
}

const fetchEdges = () : Promise<Edge[]> => {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve(getEdgesFromStorage())
    }, 10)
    })
}

const saveNodesToStorage = (nodes: CustomNode[]) => {
    localStorage.setItem("nodes", JSON.stringify(nodes))
}

const saveEdgesToStorage = (edges: Edge[]) => {
    localStorage.setItem("edges", JSON.stringify(edges))
}

const getNodesFromStorage = () => {
    const nodes = localStorage.getItem("nodes")
    return nodes ? JSON.parse(nodes) : []
}

const getEdgesFromStorage = () => {
    const edges = localStorage.getItem("edges")
    return edges ? JSON.parse(edges) : []
}

export { saveNodes, saveEdges, fetchNodes, fetchEdges, saveNodesToStorage, saveEdgesToStorage }