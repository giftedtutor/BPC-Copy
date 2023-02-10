import { Mail, DollarSign, Users, FileMinus, Settings, MessageSquare, CheckSquare, Check, Award, Box, Calendar, FileText, ArrowUpCircle, Archive, Circle, ShoppingCart, User, AlignLeft, ArrowDownCircle, DivideCircle, Package, Flag, Grid, Truck, List, BarChart2, UserPlus, Scissors } from 'react-feather'

export default [


  // {
  //   id: 'dashBoard',
  //   title: 'Dashboard',
  //   icon: <Grid size={12} />,
  //   navLink: '/BPC/apps/dashboard/view'
  // },
  {
    id: 'clients',
    title: 'Clients',
    icon: <UserPlus size={20} />,
    navLink: '/BPC/apps/client/list'
  },
  {
    id: 'suppliers',
    title: 'Suppliers',
    icon: <Package size={20} />,
    navLink: '/BPC/apps/suppliers/list'
  },
  {
    id: 'employees',
    title: 'Employee',
    icon: <User size={20} />,
    navLink: '/BPC/apps/employee/list'

  },
  {
    id: 'orders',
    title: 'Purchase Order',
    icon: <ShoppingCart size={20} />,
    navLink: '/BPC/apps/purchase-orders/list'
  },

  {
    id: 'inventoryManagment',
    title: 'Inventory  ',
    icon: <Box size={20} />,
    children: [
      {
        id: 'viewItemRates',
        title: 'Items ', //inventory old name
        icon: <Box size={20} />,
        navLink: '/BPC/apps/allot-and-inventory-section/multiple-items-ratelist'
      },
      {
        id: 'head-office-inventory',
        title: 'Store Inventory',
        icon: <CheckSquare size={20} />,
        navLink: '/BPC/apps/head-office-inventory/list'
      }
    ]
  },
  {
    id: 'upvcCalculations',
    title: 'Upvc Operations',
    icon: <DivideCircle size={20} />,
    children: [

      {
        id: 'ViewProject',
        title: 'View Quotations',
        icon: <Circle size={12} />,
        navLink: '/BPC/apps/upvcCalculaions/ViewQutation'
      }
    ]
  },

  {
    id: 'DCList',
    title: 'Delivery Challan',
    icon: <Truck size={12} />,
    navLink: '/BPC/apps/delivery-challan/list'
  },
  {
    id: 'list',
    title: 'Invoices',
    icon: <FileMinus size={12} />,
    navLink: '/BPC/apps/invoice/listing'
  },
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
    title: 'Expenses List',
    icon: <DollarSign size={12} />,
    navLink: '/BPC/apps/expenses/list'
  },
  {
    id: 'list',
    title: 'Reports',
    icon: <BarChart2 size={12} />,
    navLink: '/BPC/apps/reports-page/list'
  }

]
