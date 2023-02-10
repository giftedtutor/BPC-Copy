// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()
  doc.text("Concerned Persons List of Supplier", 14, 15)
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Name", "Designation", "Contact No"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.designation,
      data.contact_no
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: 20,
    columnStyles: {
      0: { halign: 'center' },
      3: { halign: 'right' }
    }
  })
  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`ConcernedPersonsOfSuppliers_${dateStr}.pdf`)
}

export default generatePDF