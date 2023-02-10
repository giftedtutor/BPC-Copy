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
  }
]
