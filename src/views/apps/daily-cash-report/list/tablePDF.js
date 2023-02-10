// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = (incomeData, expenseData) => {
  let totalIncome = 0
  incomeData.forEach((data) => {
    totalIncome += data.debit
  })

  let totalExpense = 0
  expenseData.forEach((data) => {
    totalExpense += data.amount
  })
  let yPos = 10
  const doc = new jsPDF()
  doc.addImage(pakLogo, 'JPEG', 14, yPos, 50, 25)
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 10
  doc.text("BPC uPVC Doors & Windows", 65, yPos)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 6
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, yPos)

  yPos += 7
  doc.setFontSize(13)
  doc.setFont("normal")
  doc.setFont(undefined, 'bold')
  doc.text("Daily Cash Report", 80, 35)

  yPos += 6
  yPos += 6
  doc.text(`Daily Income`, 14, yPos)

  const tableColumn = ["Sr No", "Client", "Debit"]

  const tableRows = []

  incomeData.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.clientName,
      data.debit.toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows.push(TableData)
  })
  const TotalIncomeRow = ["", "TOTAL:", totalIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })]
  tableRows.push(TotalIncomeRow)

  doc.autoTable(tableColumn, tableRows, {
    startY: yPos + 3,
    margin: { right: 110 },
    columnStyles: {
      0: { halign: 'center', cellWidth: 13 },
      2: { halign: 'right', cellWidth: 18 }
    }
  })

  doc.setFontSize(13)
  doc.setFont("normal")
  doc.setFont(undefined, 'bold')
  doc.text(`Daily Expenses`, 101, yPos)
  const tableColumn2 = ["Sr No", "Detail", "Credit", "Description"]

  const tableRows2 = []

  expenseData.forEach((data, index) => {
    const TableData2 = [
      index + 1,
      data.details,
      data.amount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.description
    ]
    tableRows2.push(TableData2)
  })
  const TotalExpenseRow = ["", "TOTAL:", totalExpense.toLocaleString(undefined, { maximumFractionDigits: 2 }), ""]
  tableRows2.push(TotalExpenseRow)

  doc.autoTable(tableColumn2, tableRows2, {
    startY: yPos + 3,
    headStyles: {
      halign: 'center'
    },
    margin: { left: 101 },
    columnStyles: {
      0: { halign: 'center', cellWidth: 13 },
      2: { halign: 'right', cellWidth: 23 },
      3: { halign: 'center', cellWidth: 30 }
    }
  })

  yPos = doc.lastAutoTable.finalY + 5
 
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
   doc.save(`dailyCashReport${dateStr}.pdf`)

}

export default generatePDF