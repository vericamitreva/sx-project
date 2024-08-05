import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import styles from './customNodeComponent.module.css'

const CustomNodeComponent: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const shapeClass = styles[data.shape] || styles.rectangle
  const shapeColor = styles[data.color] || styles.black
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
    <div className={`${styles.customNode} ${shapeClass} ${shapeColor}`} style={{backgroundColor: data.backgroundColor}}>
      <div
        className={`${styles.labelContainer} ${data.shape === 'rhombus' ? styles.labelRhombus : ''}`}
      >
        <div className={styles.icon}>
          {data.icon}
        </div>
        <div className={styles.label}>
          {data.label}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.top}`}
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
        isConnectable={isConnectable}
        className={`${handleClass} ${handleClasses.bottom}`}
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
