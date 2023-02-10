// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

import moment from 'moment'

// define a generatePDF function that accepts a tickets argument
const generatePDF = filterName => {
 
  // initialize jsPDF
  const doc = new jsPDF()
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left
  doc.addImage(pakLogo, 'JPEG', 14, 10, 50, 25) 
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("BPC uPVC Doors & Windows", 65, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, 26)
  doc.text("Expenses Report", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Category", "Sub Category", "Date", "Description", "Amount"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  filterName.forEach(data => {
    
    const TableData = [
      data.id,
     data.catName,
       data.subcatName,
       moment(data.date).format('DD/MM/YYYY'),
       data.description,
       data.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
       
      // called date-fns to format the date on the ticket
    //   format(new Date(data.updated_at), "yyyy-MM-dd")
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { 
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      3: { halign: 'center' },
      5: { halign: 'right' }
    }
  
  })
  
  // we define the name of our PDF file.
  doc.save(`ExpenseReport_${dateStr}.pdf`)
}

export default generatePDF