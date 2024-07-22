import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import styles from './customNodeComponent.module.css'

const CustomNodeComponent: React.FC<NodeProps> = ({ data, isConnectable }) => {
  const nodeShape = data?.nodeShape || '10px'; 

  return (
    <>
      <div className={`${styles.customNode} ${nodeShape === 'rhombusShape' ? styles.rhombusShape : ''}`}>
        <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
        <Handle type="source" position={Position.Right} id="right-source" style={{ top: '50%', transform: 'translateY(-50%)' }} isConnectable={isConnectable} />
        <Handle type="target" position={Position.Right} id="right-target" style={{ top: '50%', transform: 'translateY(-50%)', visibility: 'hidden' }} isConnectable={isConnectable} />
        <div className={styles.labelContainer}>{data.label}</div>
        <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
        <Handle type="source" position={Position.Left} id="left-source" style={{ top: '50%', transform: 'translateY(-50%)' }} isConnectable={isConnectable} />
        <Handle type="target" position={Position.Left} id="left-target" style={{ top: '50%', transform: 'translateY(-50%)', visibility: 'hidden' }} isConnectable={isConnectable} />
      </div>
    </>
  )
}

export default CustomNodeComponent
