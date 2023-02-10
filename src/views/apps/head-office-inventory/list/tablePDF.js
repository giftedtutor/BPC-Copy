// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import moment from "moment"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = sorted => {

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
  doc.setFontSize(15)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Head Office Inventory Information List", 66, 32)
  doc.setFontSize(10)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  const tableColumn = ["Sr. No", "Supplier", "Category", "Sub Category", "Item", "Purchase Date", "Quantity", "Unit Price", "Total Price"]

  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.supplierName,
      data.categoryName,
      data.subcategoryName,
      data.itemName,
      moment(data.purchaseDate).format('DD/MM/YYYY'),
      data.quantity.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.unitPrice.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      Number(data.quantity * data.unitPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      6: { halign: 'right' },
      7: { halign: 'right' },
      8: { halign: 'right' }
    }
  })

  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // we define the name of our PDF file.
  doc.save(`HeadOfficeInventory_${dateStr}.pdf`)
}

export default generatePDF