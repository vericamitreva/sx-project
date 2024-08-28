import { Edge } from "reactflow"
import MODULES_ARR from "../../../assets/modules"
import { CustomNode, TaskType } from "../../../assets/types"
import { MarkerType } from "@xyflow/react"
import data from "./../../../assets/data/data.json"

export const fetchNodesFromJson = async (): Promise<CustomNode[]> => {
    return data.map((node) => {
      const module = MODULES_ARR.find((module) => module.name === node.task_module)
      //const icon = MODULES_ARR.find((module) => module.name === node.task_module)?.colorIcon

      const nodeData = {
        id: node.id.toString(),
        label: node.task_name,
        shape: 'rectangle',
        borderColor: 'black',
        taskModule: node.task_module,
        startTasks: node.start_tasks,
        backgroundColor: module ? module.color : '',
        //icon: icon,
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
        style: {
          borderRadius: '5px',
        },
        position: { x: 0, y: 0 },
        type: 'customNode',
      }
    })
}

export const fetchEdgesFromJson = async (): Promise<Edge[]> => {
    return data.flatMap((node) =>
      node.start_tasks.map((startTask) => ({
        id: `${node.id}-${startTask}`,
        source: node.id.toString(),
        target: startTask.toString(),
        type: 'customEdge',
        markerEnd: { type: MarkerType.Arrow, color: 'black' },
        style: { strokeWidth: 1, stroke: 'black' },
      }))
    )
}

