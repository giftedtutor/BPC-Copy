/* eslint-disable object-property-newline */
// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
const generatePDF = filterName => {
  // initialize jsPDF
  const doc = new jsPDF()
  const date = Date().split(" ")
  // we use a date string to generate our filename.
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
  doc.text("Users / Admins List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  doc.text("", 14, 15)
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Name", "Email", "Role"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  filterName.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.email,
      data.role
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: 45, 
    columnStyles: {
      0: { halign: 'center' },
      1: { halign: 'left' },
      2: { halign: 'left' },
      3: { halign: 'center' }
    }
  })
 
  // we define the name of our PDF file.
  doc.save(`UsersList_${dateStr}.pdf`)
}

export default generatePDF