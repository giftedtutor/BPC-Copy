import { Mail, DollarSign, Users, FileMinus, Settings, MessageSquare, CheckSquare, Check, Award, Box, Calendar, FileText, ArrowUpCircle, Archive, Circle, ShoppingCart, User, AlignLeft, ArrowDownCircle, DivideCircle, Package, Flag, Grid, Truck, List, BarChart2, UserPlus, Scissors } from 'react-feather'

export default [


  {
    id: 'dashBoard',
    title: 'Dashboard',
    icon: <Grid size={12} />,
    navLink: '/BPC/apps/dashboard/view'
  },

  {
    id: 'admin',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/BPC/apps/admin/list'

  },

  {
    id: 'employees',
    title: 'Employee',
    icon: <User size={20} />,
    navLink: '/BPC/apps/employee/list'

  },
  // {
  //   id: 'SalarySlip2',
  //   title: 'Salary Slip',
  //   icon: <AlignLeft size={20} />,
  //   navLink: '/BPC/apps/salary-slip/add'

  // },
  // {
  //   id: 'OTSalarySlip2',
  //   title: 'Over Time Salary Slip',
  //   icon: <AlignLeft size={20} />,
  //   children: [

  //     {
  //       id: 'add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       navLink: '/BPC/apps/overtime-salary-slip/add'
  //     },
  //     {
  //       id: 'list',
  //       title: 'Get',
  //       icon: <Circle size={12} />,
  //       navLink: '/BPC/apps/advance-and-reimburst-salary/add'
  //     }
  //   ]
  // },
  // {
  //   id: 'list',
  //   title: 'Salary Slip',
  //   icon: <AlignLeft size={12} />,
  //   navLink: '/BPC/apps/salary-slip-list/list'
  // },

  {
    id: 'clients',
    title: 'Clients',
    icon: <UserPlus size={20} />,
    navLink: '/BPC/apps/client/list'
  },
  // {
  //   id: 'client-ledger',
  //   title: 'Ledger',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/BPC/apps/client-ledger/list'
  // },

  {
    id: 'suppliers',
    title: 'Suppliers',
    icon: <Package size={20} />,
    navLink: '/BPC/apps/suppliers/list'
  },

  // {
  //   id: 'supplier-ledger',
  //   title: 'Ledger',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/BPC/apps/supplier-ledger/list'
  // },

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
      // {
      //   id: 'stocks',
      //   title: 'Add Item', //inventory old name
      //   icon: <Box size={20} />,
      //   navLink: '/BPC/apps/allot-and-inventory-section/add'
      // },
      {
        id: 'viewItemRates',
        title: 'Items ', //inventory old name
        icon: <Box size={20} />,
        navLink: '/BPC/apps/allot-and-inventory-section/multiple-items-ratelist'
      },
      // {
      //   id: 'update-item-rates',
      //   title: 'Update Item Rates', //inventory old name
      //   icon: <Box size={20} />,
      //   navLink: '/BPC/apps/allot-and-inventory-section/update-item-rates'
      // },
      {
        id: 'head-office-inventory',
        title: 'Store Inventory',
        icon: <CheckSquare size={20} />,
        navLink: '/BPC/apps/head-office-inventory/list'
      }

    ]
  },

  // form made for calculations 

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
      },
      {
        id: 'Quotation',
        title: 'Input Section',
        icon: <Circle size={12} />,
        navLink: '/BPC/apps/upvcCalculaions/qutation'

      }
    ]
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
  // {
  //   id: 'proejctAlotlist',
  //   title: 'Vehicle to Project',
  //   icon: <AlignLeft size={12} />,
  //   navLink: '/BPC/apps/alot-to-project-listing/list'
  // },
  // {
  //   id: 'proejctAlotlist',
  //   title: 'Allot Machines',
  //   icon: <AlignLeft size={12} />,
  //   navLink: '/BPC/apps/alot-machine-to-project-listing/list'
  // },

  {
    id: 'list',
    title: 'Production Order',
    icon: <Settings size={12} />,
    navLink: '/BPC/apps/production-orders/list'
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
  // {
  //   id: 'Quotation',
  //   title: 'Quotations',
  //   icon: <AlignLeft size={20} />,
  //   children: [
  //     {
  //       id: 'list',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/BPC/apps/quotation/list'
  //     }
  //   ]

  // },
  // {
  //   id: 'list',
  //   title: 'Vehicles',
  //   icon: <Circle size={12} />,
  //   navLink: '/BPC/apps/vehicle/list'
  // },
  // {
  //   id: 'list',
  //   title: 'Machines',
  //   icon: <Circle size={12} />,
  //   navLink: '/BPC/apps/machine/list'
  // },

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
  },
  {
    id: 'COlist',
    title: 'Cutting Optimizer',
    icon: <Scissors size={12} />,
    navLink: '/BPC/apps/cutting-optimization/cutting-optimizar'
  }
  // {
  //   id: 'list',
  //   title: 'Supplier Payable Report',
  //   icon: <Circle size={12} />,
  //   navLink: '/BPC/apps/supplier-payable/list'
  // },
  // {
  //   id: 'add',
  //   title: 'Daily Income Report',
  //   icon: <Circle size={12} />,
  //   navLink: '/BPC/apps/daily-income-report/add'
  // },
  // {
  //   id: 'dailyPP',
  //   title: 'Daily Project Progress',
  //   icon: <Circle size={12} />,
  //   navLink: '/BPC/apps/daily-project-production-report/list'
  // }

]
