import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/BPC/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/BPC/apps/daily-income-report/add',
    component: lazy(() => import('../../views/apps/daily-income-report/add/index.js'))
  },
  {
    path: '/BPC/apps/daily-project-production-report/list',
    component: lazy(() => import('../../views/apps/daily-project-production-report/list/index.js'))
  },
  {
    path: '/BPC/apps/daily-cash-report/list',
    component: lazy(() => import('../../views/apps/daily-cash-report/list/index.js'))
  },
  {
    path: '/BPC/apps/daily-expense-report/list',
    component: lazy(() => import('../../views/apps/daily-expense-report/list/index.js'))
  },
  {
    path: '/BPC/apps/monthly-income-report/list',
    component: lazy(() => import('../../views/apps/monthly-income-report/list/index.js'))
  },
  {
    path: '/BPC/apps/monthly-expenses-report/list',
    component: lazy(() => import('../../views/apps/monthly-expenses-report/list/index.js'))
  },
  {
    path: '/BPC/apps/project-deadline-report/list',
    component: lazy(() => import('../../views/apps/project-deadline-report/list/index.js'))
  },
  {
    path: '/BPC/apps/expenses/add',
    component: lazy(() => import('../../views/apps/expenses/add/index.js'))
  },

  {
    path: '/BPC/apps/cuttingsheet/list',
    component: lazy(() => import('../../views/apps/upvc-section/cuttingsheet'))
  },
  {
    path: '/BPC/apps/supplier-ledger/ExcelImportPage',
    component: lazy(() => import('../../views/apps/supplier-ledger/list/ExcelMutiTables.js'))
  },
  {
    path: '/BPC/apps/client-ledger/ExcelTableForCLient',
    component: lazy(() => import('../../views/apps/client-ledger/list/ExcelTableForCLient.js'))
  },
  {
    path: '/BPC/apps/getPDFForQ1',
    component: lazy(() => import('../../views/apps/upvc-section/list/tablePFQutation2.js'))
  },
  {
    path: '/BPC/apps/admin/list',
    component: lazy(() => import('../../views/apps/admin/list'))
  },
  {
    path: '/BPC/apps/admin/add',
    component: lazy(() => import('../../views/apps/admin/add/index.js'))
  },
  {
    path: '/BPC/apps/expenses/list',
    component: lazy(() => import('../../views/apps/expenses/list'))
  },
  {
    path: '/BPC/apps/expense-account/add',
    component: lazy(() => import('../../views/apps/expense-account/add/index.js'))
  },
  {
    path: '/BPC/apps/expense-account/list',
    component: lazy(() => import('../../views/apps/expense-account/list'))
  },
  {
    path: '/BPC/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/BPC/apps/email'
    }
  },
  {
    path: '/BPC/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/BPC/apps/email'
    }
  },
  {
    path: '/BPC/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/BPC/apps/email'
    }
  },
  {
    path: '/BPC/apps/client-ledger/list',
    component: lazy(() => import('../../views/apps/client-ledger/list/index.js'))
  },
  {
    path: '/BPC/apps/client-ledger/payment',
    component: lazy(() => import('../../views/apps/client-ledger/payment'))
  },
  {
    path: '/BPC/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/BPC/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/BPC/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/BPC/apps/todo'
    }
  },
  {
    path: '/BPC/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/BPC/apps/todo'
    }
  },
  {
    path: '/BPC/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar'))
  },
  {
    path: '/BPC/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/BPC/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/BPC/apps/invoice/preview'
    }
  },
  {
    path: '/BPC/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to='/BPC/apps/invoice/preview/4987' />
  },
  {
    path: '/BPC/apps/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/BPC/apps/invoice/edit'
    }
  },
  {
    path: '/BPC/apps/invoice/edit',
    exact: true,
    component: () => <Redirect to='/BPC/apps/invoice/edit/4987' />
  },
  {
    path: '/BPC/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/BPC/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/BPC/apps/cutting-optimization/cutting-optimizar',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/cutting-optimization/cutting-optimizar/index.js'))
  },
  {
    path: '/BPC/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/BPC/apps/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/BPC/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/BPC/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/BPC/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/BPC/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/BPC/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  },
  {
    path: '/BPC/apps/suppliers/list',
    component: lazy(() => import('../../views/apps/suppliers/list'))
  },
  {
    path: '/BPC/apps/suppliers/edit',
    component: lazy(() => import('../../views/apps/suppliers/edit'))
  },
  {
    path: '/BPC/apps/suppliers/view',
    component: lazy(() => import('../../views/apps/suppliers/view'))
  },
  {
    path: '/BPC/apps/suppliers/viewDetail',
    component: lazy(() => import('../../views/apps/suppliers/viewDetail'))
  },
  {
    path: '/BPC/apps/head-office-inventory/list',
    component: lazy(() => import('../../views/apps/head-office-inventory/list'))
  },
  {
    path: '/BPC/apps/items/add',
    component: lazy(() => import('../../views/apps/items/add/index.js'))
  },
  {
    path: '/BPC/apps/salary-slip/add',
    component: lazy(() => import('../../views/apps/salary-slip/add/index.js'))
  },
  {
    path: '/BPC/apps/overtime-salary-slip/add',
    component: lazy(() => import('../../views/apps/overtime-salary-slip/add/index.js'))
  },
  {
    path: '/BPC/apps/supplier-payable/list',
    component: lazy(() => import('../../views/apps/supplier-payable/list'))
  },
  {
    path: '/BPC/apps/reports-page/list',
    component: lazy(() => import('../../views/apps/reports-page/list'))
  },
  {
    path: '/BPC/apps/cuttingsheet/list',
    component: lazy(() => import('../../views/apps/upvc-section/cuttingsheet'))
  },
  {
    path: '/BPC/apps/supplier-payable/payment',
    component: lazy(() => import('../../views/apps/supplier-payable/payment'))
  },
  {
    path: '/BPC/apps/supplier-ledger/list',
    component: lazy(() => import('../../views/apps/supplier-ledger/list/index.js'))
  },
  {
    path: '/BPC/apps/salary-slip-list/list',
    component: lazy(() => import('../../views/apps/salary-slip-list/list/index.js'))
  },
  {
    path: '/BPC/apps/advance-and-reimburst-salary/add',
    component: lazy(() => import('../../views/apps/advance-and-reimburst-salary/add/index.js'))
  },
  {
    path: '/BPC/apps/supplier-ledger/payment',
    component: lazy(() => import('../../views/apps/supplier-ledger/payment'))
  },

  // Dev Haris
  {
    path: '/BPC/apps/client/list',
    component: lazy(() => import('../../views/apps/client/list'))
  },
  {
    path: '/BPC/apps/client/add',
    component: lazy(() => import('../../views/apps/client/add/index.js'))
  },
  {
    path: '/BPC/apps/client/edit',
    component: lazy(() => import('../../views/apps/client/edit'))
  },
  {
    path: '/BPC/apps/client/view',
    component: lazy(() => import('../../views/apps/client/view'))
  },
  {
    path: '/BPC/apps/client/viewDetail',
    component: lazy(() => import('../../views/apps/client/viewDetail'))
  },
  {
    path: '/BPC/apps/alloted-vehicles-record/list',
    component: lazy(() => import('../../views/apps/alloted-vehicles-record/list/index.js'))
  },
  {
    path: '/BPC/apps/alot-to-project-listing/list',
    component: lazy(() => import('../../views/apps/alot-to-project-listing/list'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/alot-vehcile-to-project',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/alot-vehcile-to-project'))
  }, // alot-vehcile-to-project
  {
    path: '/BPC/apps/allot-and-inventory-section/alot-machine-to-project',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/alot-machine-to-project'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/itemsList',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/items-list'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/update-item-rates',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/update-item-rates'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/edit',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/edit'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/multiple-items-ratelist',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/multiple-items-ratelist'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/add-items-rates',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/add-items-rates'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/add',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/add'))
  },
  {
    path: '/BPC/apps/daily-project-production',
    component: lazy(() => import('../../views/apps/daily-project-production'))
  },
  {
    path: '/BPC/apps/qc-for-project/addQC',
    component: lazy(() => import('../../views/apps/qc-for-project/addQC'))
  },
  {
    path: '/BPC/apps/alloted-machines-record/list',
    component: lazy(() => import('../../views/apps/alloted-machines-record/list/index.js'))
  },
  {
    path: '/BPC/apps/alot-machine-to-project-listing/list',
    component: lazy(() => import('../../views/apps/alot-machine-to-project-listing/list/index'))
  },
  {
    path: '/BPC/apps/machine/add',
    component: lazy(() => import('../../views/apps/machine/add/index.js'))
  },
  {
    path: '/BPC/apps/machine/list',
    component: lazy(() => import('../../views/apps/machine/list'))
  },
  {
    path: '/BPC/apps/vehicle/list',
    component: lazy(() => import('../../views/apps/vehicle/list'))
  },
  {
    path: '/BPC/apps/vehicle/add',
    component: lazy(() => import('../../views/apps/vehicle/add/index.js'))
  },
  {
    path: '/BPC/apps/vehicle/edit',
    component: lazy(() => import('../../views/apps/vehicle/edit'))
  },
  {
    path: '/BPC/apps/purchase-orders/list',
    component: lazy(() => import('../../views/apps/purchase-orders/list'))
  },
  {
    path: '/BPC/apps/purchase-orders/view',
    component: lazy(() => import('../../views/apps/purchase-orders/view'))
  },
  {
    path: '/BPC/apps/production-orders/list',
    component: lazy(() => import('../../views/apps/production-orders/list'))
  },
  {
    path: '/BPC/apps/production-orders/view',
    component: lazy(() => import('../../views/apps/production-orders/view'))
  }, 
  {
    path: '/BPC/apps/return/add',
    component: lazy(() => import('../../views/apps/return/add/index.js'))
  },
  {
    path: '/BPC/apps/vehicle-maintenance/list',
    component: lazy(() => import('../../views/apps/vehicle-maintenance/list'))
  },
  {
    path: '/BPC/apps/vehicle-maintenance/add',
    component: lazy(() => import('../../views/apps/vehicle-maintenance/add/index.js'))
  },
  {
    path: '/BPC/apps/invoice/listing',
    component: lazy(() => import('../../views/apps/upvc-section/invoices/list/index'))
  },
  {
    path: '/BPC/apps/quotation/payment',
    component: lazy(() => import('../../views/apps/upvc-section/payment/index'))
  },
  {
    path: '/BPC/apps/project/listing',
    component: lazy(() => import('../../views/apps/upvc-section/project/list/index'))
  },
  {
    path: '/BPC/apps/productions/add',
    component: lazy(() => import('../../views/apps/productions/add/index.js'))
  },
  // for calculations
  {
    path: '/BPC/apps/upvcCalculaions/ViewQutation',
    component: lazy(() => import('../../views/apps/upvc-section/list'))
  },
  // {
  //   path: '/BPC/apps/upvcCalculaions/CreateProject',
  //   component: lazy(() => import('../../views/apps/upvc-section/design-section/designs/Forms/CreateProject'))
  // },
  {
    path: '/BPC/apps/upvcCalculaions/qutation',
    component: lazy(() => import('../../views/apps/upvc-section/quotation-input/add/index'))
  },
  {
    path: '/BPC/apps/upvcCalculaions/qutationI',
    component: lazy(() => import('../../views/apps/upvc-section/quotation-input/coasting-and-quotation-section/QutationI'))
  },
  {
    path: '/BPC/apps/upvcCalculaions/coasting',
    component: lazy(() => import('../../views/apps/upvc-section/quotation-input/coasting-and-quotation-section/Coasting'))
  },
  {
    path: '/BPC/apps/upvcCalculaions/eachCoasting',
    component: lazy(() => import('../../views/apps/upvc-section/quotation-input/coasting-and-quotation-section/ECoastingOfEachWindow'))
  },
  
  {
    path: '/BPC/apps/suppliers/add',
    component: lazy(() => import('../../views/apps/suppliers/add/index.js'))
  },
  {
    path: '/BPC/apps/delivery-challan/add',
    component: lazy(() => import('../../views/apps/delivery-challan/add'))
  },
  {
    path: '/BPC/apps/delivery-challan/list',
    component: lazy(() => import('../../views/apps/delivery-challan/list/Table.js'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/alot',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/alot'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/list',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/list'))
  },
  {
    path: '/BPC/apps/allot-and-inventory-section/view',
    component: lazy(() => import('../../views/apps/allot-and-inventory-section/view'))
  },
  {
    path: '/BPC/apps/purchase-orders/add',
    component: lazy(() => import('../../views/apps/purchase-orders/add'))
  },
  {
    path: '/BPC/apps/purchase-orders/edit',
    component: lazy(() => import('../../views/apps/purchase-orders/edit'))
  },
  {
    path: '/BPC/apps/production-orders/add',
    component: lazy(() => import('../../views/apps/production-orders/add/index.js'))
  },

  {
    path: '/BPC/apps/employee/add',
    component: lazy(() => import('../../views/apps/employee/add/index.js'))
  },
  {
    path: '/BPC/apps/employee/list',
    component: lazy(() => import('../../views/apps/employee/list'))
  },
  {
    path: '/BPC/apps/employee/viewDetail',
    component: lazy(() => import('../../views/apps/employee/viewDetail'))
  },
  {
    path: '/BPC/apps/employee/edit',
    component: lazy(() => import('../../views/apps/employee/edit'))
  },
  {
    path: '/BPC/apps/product/addUnit',
    component: lazy(() => import('../../views/apps/product/addUnit'))
  },
  {
    path: '/BPC/apps/product/unitList',
    component: lazy(() => import('../../views/apps/product/unitList'))
  },
  {
    path: '/BPC/apps/product/edit',
    component: lazy(() => import('../../views/apps/product/editUnit'))
  },
  {
    path: '/BPC/apps/user/edit',
    exact: true,
    component: () => <Redirect to='/BPC/apps/user/edit/1' />
  },
  {
    path: '/BPC/apps/user/edit/:id',
    component: lazy(() => import('../../views/apps/suppliers/edit')),
    meta: {
      navLink: '/BPC/apps/user/edit'
    }
  },
  {
    path: '/BPC/apps/user/view',
    exact: true,
    component: () => <Redirect to='/BPC/apps/user/view/1' />
  },
  {
    path: '/BPC/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/suppliers/view')),
    meta: {
      navLink: '/BPC/apps/user/view'
    }
  },
  {
    path: '/BPC',
    component: lazy(() => import('../../views/apps/dashboard'))
  }
]

export default AppRoutes
