import React from "react"
import styles from "./editComponent.module.css"
import { Button, Input, Select } from "antd"
import { CgShapeRhombus } from "react-icons/cg"
import { TbOvalVertical } from "react-icons/tb"
import { LuRectangleHorizontal } from "react-icons/lu"
import type { EditComponentProps } from "../../../assets/types"
import MODULES_ARR from "../../../assets/modules"
import { Option } from "antd/es/mentions"
import nodesData from "./../../../assets/data/data.json"

const EditComponent: React.FC<EditComponentProps> = ({ nodeName, onChange, nodeData, setNodeData }) => {

  const handleColorButtonClick = (borderColor: string) => {
    setNodeData({...nodeData, borderColor})
  }

  const handleShapeButtonClick = (shape: string) => {
    setNodeData({...nodeData, shape})
  }

  const handleModuleChange = (taskModule: string) => {
    const module = MODULES_ARR.find((module) => (module.name === taskModule))
    setNodeData({ 
      ...nodeData, 
      taskModule, 
      backgroundColor: module?.color || "", 
      icon: module?.colorIcon
    })
  }

  const handleStartTasksChange = (value: string[]) => {
    const startTasks = value.map(Number)
    setNodeData({...nodeData, startTasks})
  }

  return (
    <>
      <div className={styles.editContainer} onClick={(e) => {e.stopPropagation()}}>
        <div className={styles.editText}>
          <h4>EDIT SELECTED NODE</h4>
        </div>
        <div className={styles.labelsContainer}>
          <div className={styles.labelContainer}>
            <label>Label Name: </label>
            <textarea
              value={nodeName}
              onChange={onChange}
              rows={4}
              style={{ width: '100%' }}
            ></textarea>
          </div>
          <div className={styles.labelContainer}>
            <label>Choose a border color:</label>
            <div className={styles.colorButtons}>
              {["red", "yellow", "green"].map((color) => (
                <Button key={color} style={{color, border: `1px solid ${color}` }} onClick={() => handleColorButtonClick(color)}>
                  {color.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.labelContainer}>
            <label>Choose a node shape:</label>
            <div className={styles.shapeButtons}>
              <Button onClick={() => handleShapeButtonClick("rectangle")}>
                <LuRectangleHorizontal style={{ strokeWidth: "3" }} />
              </Button>
              <Button onClick={() => handleShapeButtonClick("oval")}>
                <TbOvalVertical style={{ strokeWidth: "3" }} />
              </Button>
              <Button onClick={() => handleShapeButtonClick("rhombus")}>
                <CgShapeRhombus />
              </Button>
            </div>
          </div>
          <div>
            <label>Attachment Type</label>
          </div>
          <div>
            <label>Has Attachment</label>
            <Input
              type="checkbox"
            />
          </div>
          <div>
            <label>Time to complete in days:</label>
          </div>
          <div className={styles.labelContainer}>
            <label>Task Module</label>
            <Select value={nodeData.taskModule} onChange={handleModuleChange}>
              {MODULES_ARR.map((module) => (
                <Option key={module.name} value={module.name}>
                  {module.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Task Order</label>
            <Select mode="tags" value={nodeData.startTasks.map(String)} onChange={handleStartTasksChange}>
              {nodesData.map((node) => (
                <Option key={node.id.toString()} value={node.id.toString()}>
                  {node.id.toString()}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Responsible User</label>
          </div>
          <div>
            <label>Responsible Group</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditComponent
