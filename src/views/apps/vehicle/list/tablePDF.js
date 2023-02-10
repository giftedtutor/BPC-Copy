// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = sorted => {
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
  doc.text("Vehicles Information List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  const tableColumn = ["Sr. No", "Name", "Color", "Vehicle No"]
  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.color,
      data.vehicleNO
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' }
    }
  })
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // we define the name of our PDF file.
  doc.save(`Vehicles_${dateStr}.pdf`)
}

export default generatePDF