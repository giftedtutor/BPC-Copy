import { Mail, DollarSign, Users, FileMinus, Settings, MessageSquare, CheckSquare, Check, Award, Box, Calendar, FileText, ArrowUpCircle, Archive, Circle, ShoppingCart, User, AlignLeft, ArrowDownCircle, DivideCircle, Package, Flag, Grid, Truck, List, BarChart2, UserPlus, Scissors } from 'react-feather'

export default [


  // {
  //   id: 'dashBoard',
  //   title: 'Dashboard',
  //   icon: <Grid size={12} />,
  //   navLink: '/BPC/apps/dashboard/view'
  // },
  {
    id: 'list',
    title: 'Project',
    icon: <List size={12} />,
    navLink: '/BPC/apps/project/listing'
  },
  {
    id: 'stockAlotList',
    title: 'Allot to Project',
    icon: <ArrowDownCircle size={12} />,
    navLink: '/BPC/apps/allot-and-inventory-section/list'
  },

  {
    id: 'list',
    title: 'Production Order',
    icon: <Settings size={12} />,
    navLink: '/BPC/apps/production-orders/list'
  },
  {
    id: 'COlist',
    title: 'Cutting Optimizer',
    icon: <Scissors size={12} />,
    navLink: '/BPC/apps/cutting-optimization/cutting-optimizar'
  }

]
