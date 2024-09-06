import { Edge } from "reactflow"
import MODULES_ARR from "../../../assets/modules"
import { CustomNode, NodeData, TaskType } from "../../../assets/types"
import data from "./../../../assets/data/data.json"
import { MarkerType } from "@xyflow/react"

export const fetchNodesFromJson = async (): Promise<CustomNode[]> => {
  let localStorageNodes = localStorage.getItem("nodes")
  let parsedNodes: CustomNode[] = localStorageNodes ? JSON.parse(localStorageNodes) : []

  let jsonNodes = data.map((node) => {
    const module = MODULES_ARR.find((module) => module.name === node.task_module)
    
    const nodeData: NodeData = {
      id: node.id.toString(),
      label: node.task_name,
      shape: 'rectangle',
      borderColor: 'black',
      taskModule: node.task_module,
      startTasks: node.start_tasks,
      backgroundColor: module ? module.color : '',
      icon: node.task_module,
      taskName: node.task_name, 
      taskType: node.task_type as TaskType,
      attachmentType: '',
      hasAttachment: false,
      timeToCompleteInDays: 0,
      taskOrder: node.task_order,
      responsibleUser: [],
      responsibleGroup: [],
    }

    return {
      id: node.id.toString(),
      data: nodeData,
      style: { borderRadius: '5px' },
      position: { x: 0, y: 0 },
      type: 'customNode',
    }
  })

  const mergedNodes = jsonNodes.map(jsonNode => {
    const existingNode = parsedNodes.find((node) => node.id === jsonNode.id)
    return existingNode ? { ...jsonNode, ...existingNode } : jsonNode
  })
  

  return mergedNodes
}

export const fetchEdgesFromJson = async (): Promise<Edge[]> => {
  let localStorageEdges = localStorage.getItem("edges")
  let parsedEdges : Edge[] = localStorageEdges ? JSON.parse(localStorageEdges) : []

  let jsonEdges = data.flatMap((node) => 
    node.start_tasks.map((startTask) => ({
      id: `${node.id}-${startTask}`,
      source: node.id.toString(),
      target: startTask.toString(),
      type: 'customEdge',
      markerEnd: { type: MarkerType.Arrow, color: 'black' },
      style: { strokeWidth: 1, stroke: 'black' },
    }))
  )

  const mergedEdges = jsonEdges.map((jsonEdge) => {
    const existingEdge = parsedEdges.find((egde) => egde.id === jsonEdge.id)
    return existingEdge ? {...jsonEdge, ...existingEdge} : jsonEdge
  })

  return mergedEdges
}

