import React, { useState } from "react"
import styles from "./editComponent.module.css"
import { Button, Input, InputNumber, Select } from "antd"
import { CgShapeRhombus } from "react-icons/cg"
import { TbOvalVertical } from "react-icons/tb"
import { LuRectangleHorizontal } from "react-icons/lu"
import type { EditComponentProps, NodeData } from "../../../assets/types"
import MODULES_ARR from "../../../assets/modules"
import { fetchResponsibleUsers } from "../FetchResponsibleUsers/FetchResponsibleUsers"

const EditComponent: React.FC<EditComponentProps> = ({ nodeName, nodeData, setNodeData, handleSaveEdit}) => {
  const [userOptions, setUserOptions] = useState<{ id: number; name: string }[]>([])

  const handleUpdateNodeData = (newData: Partial<NodeData>) => {
    setNodeData((prev) => ({ ...prev, ...newData }))
  }  

  const handleColorButtonClick = (borderColor: string) => {
    handleUpdateNodeData({ borderColor })
  }

  const handleShapeButtonClick = (shape: string) => {
    handleUpdateNodeData({ shape })
  }

  const handleResponsibleUserChange = (responsibleUser: number[]) => {
    handleUpdateNodeData({ responsibleUser })
  }

  const handleModuleChange = (taskModule: string) => {
    const module = MODULES_ARR.find((module) => (module.name === taskModule))
    handleUpdateNodeData({ 
      taskModule, 
      backgroundColor: module?.color, 
      icon: taskModule
    })
  }

  const getUserOptions = async () => {
    const users = await fetchResponsibleUsers()
    setUserOptions(users)
  }
  getUserOptions()

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
              onChange={(e) => handleUpdateNodeData({ label: e.target.value })}
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
          <div className={styles.labelContainerRow}>
            <label>Has Attachment</label>
            <Input
              type="checkbox"
            />
          </div>
          <div className={styles.labelContainerRow}>
            <label>Time to complete in days:</label>
            <InputNumber
            value={nodeData.timeToCompleteInDays}
            onChange={(timeToCompleteInDays) => handleUpdateNodeData({ timeToCompleteInDays })}
            />
          </div>
          <div className={styles.labelContainer}>
            <label>Task Module</label>
            <Select value={nodeData.taskModule} onChange={handleModuleChange}>
              {MODULES_ARR.map((module) => (
                <Select.Option key={module.name} value={module.name}>
                  {module.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className={styles.labelContainerRow}>
            <label>Task Order</label>
            <InputNumber
              value={nodeData.taskOrder}
              onChange={(taskOrder) => handleUpdateNodeData({ taskOrder })}
            />
          </div>
          <div>
            <label>Responsible User</label>
            <Select
              mode="multiple"
              placeholder="Select responsible users"
              value={nodeData.responsibleUser}
              onChange={handleResponsibleUserChange}
              style={{width: "100%"}}
            >
              {userOptions.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <label>Responsible Group</label>
            <Select
              mode="multiple"
              placeholder="Select responsible users"
              value={nodeData.responsibleUser}
              onChange={handleResponsibleUserChange}
              style={{width: "100%"}}
            >
              {userOptions.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Button onClick={handleSaveEdit}>
              SAVE
            </Button>
            {/* <Button onClick={handleCancelEdit}>
              CANCEL
            </Button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditComponent
