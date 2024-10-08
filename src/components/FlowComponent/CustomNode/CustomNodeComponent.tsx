import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import styles from './customNodeComponent.module.css'
import { getModuleIcon } from '../GetModuleIcon/getModuleIcon'

const CustomNodeComponent: React.FC<NodeProps> = ({ data }) => {
  const shapeClass = styles[data.shape] || styles.rectangle
  const borderColor = styles[data.borderColor] || styles.black
  const handleClass = data.shape === 'rhombus' ? styles.handleRhombus : styles.defaultHandle

  const handleClasses = {
    top: data.shape === 'rhombus' ? styles.handleRhombusTop : '',
    rightSource: data.shape === 'rhombus' ? styles.handleRhombusRightSource : styles.handleDefaultRightSource,
    rightTarget: data.shape === 'rhombus' ? styles.handleRhombusRightTarget : styles.handleDefaultRightTarget,
    bottom: data.shape === 'rhombus' ? styles.handleRhombusBottom : '',
    leftSource: data.shape === 'rhombus' ? styles.handleRhombusLeftSource : styles.handleDefaultLeftSource,
    leftTarget: data.shape === 'rhombus' ? styles.handleRhombusLeftTarget : styles.handleDefaultLeftTarget,
  }

  return (
    <div className={`${styles.customNode} ${shapeClass} ${borderColor}`} style={{backgroundColor: data.backgroundColor}}>
      <div
        className={`${styles.labelContainer} ${data.shape === 'rhombus' ? styles.labelRhombus : ''}`}
      >
        <div className={styles.icon}>
          {getModuleIcon(data.icon)}
        </div>
        <div className={styles.label}>
          {data.id}<br/>
          {data.label}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        // style={{display: "none"}}
        isConnectable={true}
        className={`${handleClass} ${handleClasses.top}`}
        style={{borderColor: "transparent", backgroundColor: "transparent"}}
      />
      {/* <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.rightSource}`}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.rightTarget}`}
      /> */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={true}
        // style={{display: "none"}}
        className={`${handleClass} ${handleClasses.bottom}`}
        style={{borderColor: "transparent", backgroundColor: "transparent"}}
      />
      {/* <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.leftSource}`}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.leftTarget}`}
      /> */}
    </div>
  )
}

export default CustomNodeComponent
