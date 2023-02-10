// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = mappSuppliers => {
  let Total = 0
  mappSuppliers.forEach((data) => {
    Total += data.debit
  })
  // initialize jsPDF
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
  doc.text("Monthly Income Report", 80, 35)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
 const tableColumn = ["Client", "Debit", "Description"]
  const tableRows = []

  mappSuppliers.forEach(data => {
    const TableData = [
     data.clientName,
     data.debit,
     data.description
    ]
   tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 40,
    columnStyles: {
      0: { halign: 'Left', cellWidth: 70},
      1: { halign: 'right', cellWidth: 18}
      // 2: { halign: 'center', cellWidth: 110}
     },
    headStyles: {
    //  halign: 'center'
    }
    
  })
   const date = Date().split(" ")
   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  
  doc.save(`monthlyIncomeReport_${dateStr}.pdf`)
}

export default generatePDF