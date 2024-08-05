import { LineChartOutlined, FileProtectOutlined, BuildOutlined, CheckCircleOutlined, EuroCircleOutlined } from '@ant-design/icons';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface Module {
  name: string;
  permission: string;
  route: string;
  whiteIcon: JSX.Element;
  color: string;
  colorIcon: JSX.Element;
}

const MODULES_ARR: Module[] = [
  {
    name: 'SALES',
    permission: 'project-sales',
    route: '/project-list/SALES',
    whiteIcon: <LineChartOutlined color="white" />,
    color: '#1E90FF',
    colorIcon: <LineChartOutlined style={{ fontSize: 22, color: '#1E90FF' }} />,
  },
  {
    name: 'ADMINISTRATION',
    permission: 'project-administration',
    route: '/project-list/ADMINISTRATION',
    whiteIcon: <FileProtectOutlined color="white" />,
    color: '#32CD32',
    colorIcon: <FileProtectOutlined style={{ fontSize: 22, color: '#32CD32' }} />,
  },
  {
    name: 'IMPLEMENTATION',
    permission: 'project-implementation',
    route: '/project-list/IMPLEMENTATION',
    whiteIcon: <BuildOutlined color="white" />,
    color: '#FF8C00',
    colorIcon: <BuildOutlined style={{ fontSize: 22, color: '#FF8C00' }} />,
  },
  {
    name: 'QUALITYCHECK',
    permission: 'project-qualityCheck',
    route: '/project-list/QUALITYCHECK',
    whiteIcon: <CheckCircleOutlined color="white" />,
    color: '#FF4500',
    colorIcon: <CheckCircleOutlined style={{ fontSize: 22, color: '#FF4500' }} />,
  },
  {
    name: 'SUBVENTION',
    permission: 'project-subvention',
    route: '/project-list/SUBVENTION',
    whiteIcon: <EuroCircleOutlined color="white" />,
    color: '#6A5ACD',
    colorIcon: <EuroCircleOutlined style={{ fontSize: 22, color: '#6A5ACD' }} />,
  },
  {
    name: 'FINANCE',
    permission: 'project-financial',
    route: '/finance',
    whiteIcon: <FaFileInvoiceDollar color="white" />,
    color: '#FFD700',
    colorIcon: <FaFileInvoiceDollar style={{ fontSize: 22, color: '#FFD700' }} />,
  },
];

export default MODULES_ARR;
