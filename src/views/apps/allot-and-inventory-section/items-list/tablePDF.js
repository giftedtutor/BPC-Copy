// list/tablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/KVT_LOGO_3D_copy.jpg'
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Unit", "Category", "Sub Category", "Item Name", "Local Name", "Length", "Width", "UPVC Rate", "Type", "Minimum Level"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  sorted.forEach(data => {
    const TableData = [
      data.id,
      `${data.unit1quantity} ${data.unit1code} = ${data.unit2quantity} ${data.unit2code}`,
      data.categoryName,
      data.subCategoryName,
      data.name,
      data.localName,
      data.length,
      data.width,
      data.upvcrate,
      data.Boq_Costing_Type,
      data.minimumLevel
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 45 })
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left
  doc.addImage(pakLogo, 'JPEG', 14, 8, 30, 30)
  doc.setFontSize(24)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("KVT Company Upvc Doors & Windows SC", 46, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Ground Floor Sami Plaza High Court Road Rawalpindi", 47, 26)
  doc.text("Items Information List", 47, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  // we define the name of our PDF file.
  doc.save(`Items_${dateStr}.pdf`)
}

export default generatePDF