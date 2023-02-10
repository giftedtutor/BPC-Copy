// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = mappSuppliers => {

  let Total = 0
  mappSuppliers.forEach((data) => {
    Total += data.credit
  })
  const doc = new jsPDF()
  doc.addImage(pakLogo, 'JPEG', 14, 10, 50, 25)
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("BPC uPVC Doors & Windows", 65, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, 26)
  doc.setFontSize(15)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Daily Expense Report", 80, 35)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  const tableColumn = ["Category", "Sub Category", "Amount (PKR)", "", "Description"]
  const tableRows = []

  mappSuppliers.forEach(data => {
    const TableData = [
      data.category_name === null || (data.category_name === "" && data.managePersonName === null) ? 'SUPPLIER PAYMENT' : (data.role === 'FACTORY_FINANCE' ? 'FACTORY FINANCE' : (data.role === 'ACCOUNTANT' ? 'ACCOUNTANT' : (data.role === 'PROCUREMENT' ? 'PROCUREMENT' : data.category_name))),
      data.sub_category_name === null || (data.sub_category_name === "" && data.managePersonName === null) ? data.supplierName : (data.role === 'FACTORY_FINANCE' || data.role === 'ACCOUNTANT' ? data.managePersonName : ((data.sub_category_name === "" && data.managePersonName !== null) ? data.managePersonName : data.sub_category_name)),
      data.credit.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      '',
      data.description
    ]
    tableRows.push(TableData)
  })
  const Space = []
  const TotalRows = [{ content: `Total (PKR): ${Total}`, colSpan: 4, rowSpan: 1, styles: { halign: 'right', fontStyle: 'bold', fontSize:12 }}]
  tableRows.push(Space, TotalRows)

  doc.autoTable(tableColumn, tableRows, {
    startY: 40,
    columnStyles: {
      0: { halign: 'left', cellWidth: 50 },
      1: { halign: 'left', cellWidth: 50 },
      2: { halign: 'right', cellWidth: 30 },
      3: { halign: 'right', cellWidth: 10 },
      4: { halign: 'left', cellWidth: 50 }
    }
  })
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  
  doc.save(`dailyExpenseReport_${dateStr}.pdf`)
}

export default generatePDF