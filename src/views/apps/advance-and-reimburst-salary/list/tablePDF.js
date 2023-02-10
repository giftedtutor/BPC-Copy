// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  
  doc.text("Clients Information List", 14, 15)
  
  const tableColumn = ["Client ID", "Name", "Address", "City", "Contact #", "Province", "Previous Balance"]
 
  const tableRows = []
  sorted.forEach(data => {
    const TableData = [
      data.id,
      data.name,
      data.address,
      data.city,
      data.contact_no,
      data.province,
      data.previous_balance
    ]
     tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  
  doc.save(`Clients_${dateStr}.pdf`)
}

export default generatePDF