import { LineChartOutlined, FileProtectOutlined, BuildOutlined, CheckCircleOutlined, EuroCircleOutlined } from '@ant-design/icons'
import { FaFileInvoiceDollar } from 'react-icons/fa'

export const getModuleIcon = (module: string) => {
  switch (module) {
    case 'SALES':
      return <LineChartOutlined style={{ fontSize: 22, color: '#1E90FF' }} />;
    case 'ADMINISTRATION':
      return <FileProtectOutlined style={{ fontSize: 22, color: '#32CD32' }} />;
    case 'IMPLEMENTATION':
      return <BuildOutlined style={{ fontSize: 22, color: '#FF8C00' }} />;
    case 'QUALITYCHECK':
      return <CheckCircleOutlined style={{ fontSize: 22, color: '#FF4500' }} />;
    case 'SUBVENTION':
      return <EuroCircleOutlined style={{ fontSize: 22, color: '#6A5ACD' }} />;
    case 'FINANCE':
      return <FaFileInvoiceDollar style={{ fontSize: 22, color: '#FFD700' }} />;
    default:
      return null
  }
}