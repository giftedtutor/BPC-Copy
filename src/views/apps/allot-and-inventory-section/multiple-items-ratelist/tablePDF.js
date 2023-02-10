// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = itemsData => {

  const doc = new jsPDF()  
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
  doc.text("Items Price List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  const tableColumn = ["Sr. No", "Item", "Rate"]
  const tableRows = []

  itemsData.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.upvcrate.toLocaleString(undefined, { maximumFractionDigits: 2 })

    ]
    tableRows.push(TableData)
  })
  doc.autoTable(tableColumn, tableRows, { startY: 45,
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'left' },
      2: { halign: 'right', cellWidth: 30 }
    } })

  doc.save(`ItemPrices_${dateStr}.pdf`)
}

export default generatePDF