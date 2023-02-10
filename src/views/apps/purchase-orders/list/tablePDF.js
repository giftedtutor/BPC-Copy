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
  doc.setFontSize(18)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Purchase Order Detail", 80, 36)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  const tableColumn = ["Sr. No", "PO No", "Supplier Name", "Date", "Total Amount", "Paid", "Remaining", "Status", 'Tax']

  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      (index + 1),
      `PO-${data.id}`,
      data.name,
      moment(data.date).format('DD/MM/YYYY'),
      data.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.status,
      data.tax
    ]
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'center' },
      7: { halign: 'right' }
    }
  })

  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.save(`PurchaseOrdersDetails_${dateStr}.pdf`)
}

export default generatePDF