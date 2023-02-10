// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import Cookies from 'js-cookie'
const generatePDF = filterName => {
  // initialize jsPDF
  const doc = new jsPDF()
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  doc.setFontSize(13)
  doc.text("Suppliers Information List", 14, 15)
  const role = Cookies.get('role')
  let valB
  if (role === 'SALES' || role === 'ACCOUNTANT' || role === 'PROCUREMENT' || role === 'PRODUCTION' || role === 'FACTORY_FINANCE' || role === 'OPERATIONS_FINANCE') {
    valB = true
  } else {
    valB = false
  }

  const tableColumn = ["Sr. No", "Name", "Contact No", `${valB === true ? '' : "Previous Balance (PKR)"}`]

  const tableRows = []

  filterName.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.contact_no,
      data.previous_balance.toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, {
    startY: 20,
    columnStyles: {
      0: { halign: 'center' },
      3: { halign: 'center' },
      4: { halign: 'right' },
      7: { halign: 'right' }
    }
  })

  doc.save(`Suppliers_${dateStr}.pdf`)
}

export default generatePDF