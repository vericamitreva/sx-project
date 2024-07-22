import React from "react"
import styles from "./editComponent.module.css"
import { Button } from "antd"
import { CgShapeRhombus } from "react-icons/cg"
import { TbOvalVertical } from "react-icons/tb"
import { LuRectangleHorizontal } from "react-icons/lu"

interface EditComponentProps {
  nodeName: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setNodeColor: (color: string) => void;
  setNodeShape: (shape: string) => void;
}

const EditComponent: React.FC<EditComponentProps> = ({ nodeName, onChange, setNodeColor, setNodeShape }) => {

  const handleColorButtonClick = (color: string) => {
    setNodeColor(color)
  }

  const handleShapeButtonClick = (shape: string) => {
    setNodeShape(shape)
  }

  return (
    <>
      <div className={styles.editContainer}>
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
              <Button style={{ color: "red", border: "1px solid red" }} onClick={() => handleColorButtonClick("red")}> RED </Button>
              <Button style={{ color: "#E1C16E", border: "1px solid #E1C16E" }} onClick={() => handleColorButtonClick("#E1C16E")}> YELLOW </ Button>
              <Button style={{ color: "green", border: "1px solid green" }} onClick={() => handleColorButtonClick("green")}> GREEN </Button>
            </div>
          </div>
          <div className={styles.labelContainer}>
            <label>Choose a node shape:</label>
            <div className={styles.shapeButtons}>
              <Button onClick={() => handleShapeButtonClick("10px")}><LuRectangleHorizontal style={{ strokeWidth: "3" }} /></Button>
              <Button onClick={() => handleShapeButtonClick("50%")}><TbOvalVertical style={{ strokeWidth: "3" }} /></Button>
              <Button onClick={() => handleShapeButtonClick("rhombusShape")}><CgShapeRhombus /></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditComponent
