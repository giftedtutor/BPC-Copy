// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"

// define a generatePDF function that accepts a tickets argument
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
  doc.text("Clients Information List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  const tableColumn = ["Sr. No", "Name", "Address", "City", "Contact #", "Previous Balance (PKR)"]

  const tableRows = []
  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.address,
      data.city,
      data.contact_no,
      data.province,
      data.previous_balance
    ]
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      4: { halign: 'right' },
      5: { halign: 'right' }
    }
  })

  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`Clients_${dateStr}.pdf`)
}

export default generatePDF