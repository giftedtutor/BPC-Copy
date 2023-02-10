// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = sorted => {
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
  doc.text("Supplier Payable Report", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  doc.text("", 14, 15)

  const tableColumn = ["ID", "Supplier Name", "Contact #", "Previous Balance"]
  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,

      data.contact_no,

      data.previous_balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      2: { halign: 'center' },
      3: { halign: 'right' }
    }
  })

  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  // we define the name of our PDF file.
  doc.save(`SupplierPayableReport_${dateStr}.pdf`)
}

export default generatePDF