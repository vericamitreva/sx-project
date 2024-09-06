import React, { useEffect, useState } from "react"
import styles from "./editComponent.module.css"
import { Button, Input, InputNumber, Select } from "antd"
import { CgShapeRhombus } from "react-icons/cg"
import { TbOvalVertical } from "react-icons/tb"
import { LuRectangleHorizontal } from "react-icons/lu"
import type { EditComponentProps, NodeData } from "../../../assets/types"
import MODULES_ARR from "../../../assets/modules"
import { fetchResponsibleUsers } from "../FetchResponsibleUsers/FetchResponsibleUsers"
import { fetchDocumentGroups } from "../FetchDocumentGroups/FetchDocumentGroups"

const EditComponent: React.FC<EditComponentProps> = ({ nodeName, nodes, nodeData, setNodeData, handleSaveEdit}) => {
  const [userOptions, setUserOptions] = useState<{ id: number; name: string }[]>([])
  const [documentGroupsOptions, setDocumentGroupsOptions] = useState<string[]>([])

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

  const handleAttachmentTypeChange = (attachmentType: string) => {
    handleUpdateNodeData({ attachmentType })
  }

const handleStartTasksChange = (startTasks: number[]) => {
  handleUpdateNodeData({ startTasks })
}

  const handleModuleChange = (taskModule: string) => {
    const module = MODULES_ARR.find((module) => (module.name === taskModule))
    handleUpdateNodeData({ 
      taskModule, 
      backgroundColor: module?.color, 
      icon: taskModule
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchResponsibleUsers()
      setUserOptions(users)

      const documentGroups = await fetchDocumentGroups()
      setDocumentGroupsOptions(documentGroups)
    }

    fetchData()
  }, [])

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
          {/* <div>
            <label>Set a node ID</label>
            <Input
            value={nodeData.id}
            onChange={(e) => handleUpdateNodeData({ id: e.target.value })}
            />
          </div> */}
          <div>
            <label>Attachment Type</label>
            <Select
              value={nodeData.attachmentType}
              onChange={handleAttachmentTypeChange}
              style={{width: "100%"}}
            >
              {documentGroupsOptions.map((group) => (
                <Select.Option key={group} value={group}>
                  {group}
                </Select.Option>
              ))}
              
            </Select>
          </div>
          <div className={styles.labelContainerRow}>
            <label>Has Attachment</label>
            <Input
              type="checkbox"
              checked={!!nodeData.attachmentType}
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
            <label>Start Tasks</label>
            <Select
            mode="multiple"
            placeholder="Select start tasks"
            value={nodeData.startTasks}
            onChange={handleStartTasksChange}
            style={{width: "100%"}}
            >
            {nodes.map((node) => (
              <Select.Option key={node.id} value={node.id}>
                {node.id}
              </Select.Option>
            ))}
            </Select>
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
              placeholder="Select responsible group"
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
