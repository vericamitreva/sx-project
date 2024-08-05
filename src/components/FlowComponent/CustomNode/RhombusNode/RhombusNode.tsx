import { Position } from '@xyflow/react'
import { Handle } from 'react-flow-renderer'

interface RhombusNodeProps {
  data: {
    label: string
  }
}

const RhombusNode: React.FC<RhombusNodeProps> = ({ data }) => {
  return (
    <div style={{
      width: '100px',
      height: '100px',
      background: 'lightblue',
      transform: 'rotate(45deg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      <div style={{
        transform: 'rotate(-45deg)',
        textAlign: 'center'
      }}>
        {data.label}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.top}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.rightSource}`}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.rightTarget}`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.bottom}`}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.leftSource}`}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        isConnectable={true}
        //className={`${handleClass} ${handleClasses.leftTarget}`}
      />
    </div>
  )
}

export default RhombusNode