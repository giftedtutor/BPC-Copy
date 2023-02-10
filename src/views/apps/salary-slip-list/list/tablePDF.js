/* eslint-disable object-shorthand */
/* eslint-disable array-bracket-newline */

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from 'moment'

const generatePDF = sorted => {

  const doc = new jsPDF()

  const tableColumn = ["EARNINGS", ' ', "AMOUNT", '']
  const tableColumnDec = ["DEDUCTIONS", ' ', "AMOUNT", '']

  const tableRows = []
  const tableRows2 = []
  const tableRows3 = []
  const tableRows4 = []
  const tableRows5 = []

  const tableRowsDec = []
  const tableRows2Dec = []
  const tableRows3Dec = []
  const tableRows4Dec = []

  const TableData = [
    'Basic Salary',
    '',
    sorted.basicsalary?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    '',
    ''
  ]
  const TableData2 = [
    'Accommodation',
    '',
    sorted.accommodation,
    '',
    ''
  ]
  const TableData3 = [
    'Trasporation Allowance',
    '',
    sorted.trasporationallowance?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    '',
    ''
  ]
  const TableData4 = [
    'Medical Allowance',
    '',
    sorted.medicalallowance?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    '',
    ''
  ]
  const TableData5 = [
    'Gross Earnings',
    '',
    (Number(sorted.basicsalary) + Number(sorted.medicalallowance) + Number(sorted.accommodation) + Number(sorted.trasporationallowance))?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    '',
    ''
  ]
  //2nd table
  const TableDataDec = [
    'PF',
    '',
    sorted.pf?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableDataDec2 = [
    'Advance',
    '',
    sorted.advancesalary === null ? 0 : sorted.advancesalary?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableDataDec3 = [
    'Absent Days',
    '',
    sorted.absentsdays?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableDataDec4 = [
    'Absents Days Deduction',
    '',
    `${((sorted.basicsalary / 30) * sorted.absentsdays)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    ''
  ]
  const TableDataDec5 = [
    'Total Deductions (-)',
    '',
    (Number(sorted.pf) + Number(sorted.advancesalary) + Number(((sorted.basicsalary / 30) * sorted.absentsdays)))?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]

  tableRows.push(TableData, TableData2, TableData3, TableData4, TableData5)
  tableRowsDec.push(TableDataDec, TableDataDec2, TableDataDec3, TableDataDec4, TableDataDec5)

  const tableColumn2 = ["REIMBURSEMENTS", "", "AMOUNT", '']
  const TableData21 = [
    'Reimbursement 1',
    '',
    sorted.reimbursement === null ? 0 : sorted.reimbursement?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableData22 = [
    'Total Reimbursements',
    '',
    sorted.reimbursement?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]

  tableRows2.push(TableData21, TableData22)

  //  
  const tableColumn3 = ["OVER TIME", "", "AMOUNT", ""]
  const TableData31 = [
    'Total Over Time (In Hours)',
    '',
    sorted.totalhours,
    ''
  ]
  const TableData32 = [
    'Total Earnings',
    '',
    Number(((sorted.basicsalary / 30) / 8) * sorted.totalhours)?.toLocaleString(undefined, { maximumFractionDigits: 2 }),

    ''
  ]

  tableRows3.push(TableData31, TableData32)

  const tableColumn4 = ["NETPAY", ' ', "AMOUNT", '']
  const TableData41 = [
    'Gross Earnings',
    '',
    (Number(sorted.basicsalary) + Number(sorted.medicalallowance) + Number(sorted.accommodation) + Number(sorted.trasporationallowance))?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableData42 = [
    'Total Over Time',
    '',
    Number(((sorted.basicsalary / 30) / 8) * sorted.totalhours)?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableData43 = [
    'Total Reimbursements',
    '',
    sorted.reimbursement?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableData44 = [
    'Total Deductions (-)',
    '',
    (Number(sorted.pf) + Number(sorted.advancesalary) + Number(((sorted.basicsalary / 30) * sorted.absentsdays)))?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    ''
  ]
  const TableData45 = [
    '',
    'Total Net Payable',
    (((Number(sorted.basicsalary) + Number(sorted.medicalallowance) +
      Number(sorted.accommodation) + Number(sorted.trasporationallowance) +
      Number(sorted.reimbursement) + Number(((sorted.basicsalary / 30) / 8) * sorted.totalhours)) -
      (Number(sorted.pf) + Number(sorted.advancesalary) + Number(((sorted.basicsalary / 30) * sorted.absentsdays)))))?.toLocaleString(undefined, { maximumFractionDigits: 2 }), ''
  ]
  const TableData55 = [
    '',
    '',
    '',
    ''
  ]

  tableRows4.push(TableData41, TableData42, TableData43, TableData44, TableData45)

  doc.autoTable(tableColumn, tableRows, {
    startY: 72,
    headStyles: {
      halign: 'left'
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 105 },
      2: { halign: 'right' }
    }

  })
  doc.autoTable(tableColumnDec, tableRowsDec, {
    startY: 123,
    headStyles: {
      halign: 'left'
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 105 },
      2: { halign: 'right' }
    }
  })
  doc.autoTable(tableColumn2, tableRows2, {
    startY: 172,
    headStyles: {
      halign: 'left'
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 105 },
      2: { halign: 'right' }
    }
  })

  doc.autoTable(tableColumn3, tableRows3, {
    startY: 196,
    headStyles: {
      halign: 'left'
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 105 },
      2: { halign: 'right' }
    }
  })
  doc.autoTable(tableColumn4, tableRows4, {
    startY: 224,
    headStyles: {
      halign: 'left'
    },
    // alternateRowStyles: {
    //   fontStyle: 'bold' 
    // },
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 105 },
      2: { halign: 'right' }
    }
  })
  // doc.autoTable(tableColumn5, tableRows5, {
  //   startY: 262,
  //   styles: {
  //     fontStyle: 'bold'
  //   },
  //   columnStyles: {
  //     0: { halign: 'left', cellWidth: 50 },
  //     1: { halign: 'left', cellWidth: 105 },
  //     2: { halign: 'right' }
  //   }
  // })


  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.addImage(pakLogo, 'JPEG', 14, 10, 50, 25)
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("BPC uPVC Doors & Windows", 65, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, 26)

  doc.text(`Payslip for the Month of ${sorted.Month.substring(5, 7) === '1' || sorted.Month.substring(5, 7) === '01' ? 'January' : (sorted.Month.substring(5, 7) === '02' || sorted.Month.substring(5, 7) === '2') ? 'February' : (sorted.Month.substring(5, 7) === '3' || sorted.Month.substring(5, 7) === '03' ? 'March' : (sorted.Month.substring(5, 7) === '4' || sorted.Month.substring(5, 7) === '04') ? 'April' : (sorted.Month.substring(5, 7) === '5' || sorted.Month.substring(5, 7) === '05') ? 'May' : (sorted.Month.substring(5, 7) === '06' || sorted.Month.substring(5, 7) === '6') ? 'June' : (sorted.Month.substring(5, 7) === '7' || sorted.Month.substring(5, 7) === '07') ? 'July' : (sorted.Month.substring(5, 7) === '8' || sorted.Month.substring(5, 7) === '08') ? 'August' : (sorted.Month.substring(5, 7) === '9' || sorted.Month.substring(5, 7) === '09') ? 'September' : (sorted.Month.substring(5, 7) === '10' ? 'October' : (sorted.Month.substring(5, 7) === '11' ? 'November' : (sorted.Month.substring(5, 7) === '12' ? 'December' : sorted.Month))))
    }, ${sorted.Month.substring(0, 4)}`, 66, 38)
  doc.text(`_________________________________`, 66, 39)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  doc.setFontSize(12)

  doc.text(`Employee Name :`, 14, 47)
  doc.text(`${sorted.name}`, 50, 47)
  doc.text(`Employee Type :`, 14, 53)
  doc.text(`${sorted.employeeType}`, 50, 53)
  doc.text(`Pay Date :`, 14, 59)
  doc.text(`${moment(sorted.payDate).format('DD-MM-YYYY')}`, 50, 59)
  doc.text(`Payment Type :`, 14, 64)
  doc.text(`${sorted.paymentType === 'BANK' ? sorted.accountNo : sorted.paymentType}`, 50, 64)
  doc.text(`______________________`, 15, 282)
  doc.text(`Accountant`, 30, 288)

  doc.text(`______________________`, 143, 282)
  doc.text(`Employee Signature`, 150, 288)

  doc.save(`SalarySlip${dateStr}.pdf`)
}

export default generatePDF