// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"

const generatePDF = sorted => {

  const doc = new jsPDF()
  const tableColumn = ["ID", "Name", "Designation", "Contact No"]
  const tableRows = []

  sorted.forEach(data => {
    const TableData = [
     data.id,
       data.name,
       data.designation,
       data.contact_no
    ]
   tableRows.push(TableData)
  })

 doc.autoTable(tableColumn, tableRows, { startY: 20 })
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.text("Concerned Persons List of Clients", 14, 15)
  doc.save(`ConcernedPersonsOfClients_${dateStr}.pdf`)
}

export default generatePDF