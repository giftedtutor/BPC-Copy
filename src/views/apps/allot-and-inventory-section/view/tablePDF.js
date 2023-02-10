// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()

  doc.text("Details of Aloted Items", 14, 15)
  // define the columns we want and their titles
  const tableColumn = ["Name", "Quantity", "Status"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  sorted.forEach(data => {
    const TableData = [
      data.name,
      data.quantity,
      data.status
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: 20
    // columnStyles: {
    //   1: { halign: 'center' }

    // }
  })
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  // we define the name of our PDF file.
  doc.save(`AlotToProject_${dateStr}.pdf`)
}

export default generatePDF