import { Mail, DollarSign, Users, FileMinus, Settings, MessageSquare, CheckSquare, Check, Award, Box, Calendar, FileText, ArrowUpCircle, Archive, Circle, ShoppingCart, User, AlignLeft, ArrowDownCircle, DivideCircle, Package, Flag, Grid, Truck, List, BarChart2, UserPlus, Scissors } from 'react-feather'

export default [


  // {
  //   id: 'dashBoard',
  //   title: 'Dashboard',
  //   icon: <Grid size={12} />,
  //   navLink: '/BPC/apps/dashboard/view'
  // },

  {
    id: 'suppliers',
    title: 'Suppliers',
    icon: <Package size={20} />,
    navLink: '/BPC/apps/suppliers/list'
  },
  {
    id: 'orders',
    title: 'Purchase Order',
    icon: <ShoppingCart size={20} />,
    navLink: '/BPC/apps/purchase-orders/list'
  },


  {
    id: 'head-office-inventory',
    title: 'Store Inventory',
    icon: <CheckSquare size={20} />,
    navLink: '/BPC/apps/head-office-inventory/list'
  }
]
