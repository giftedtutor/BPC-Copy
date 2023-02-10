import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
const generatePDF = BothArray => {

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
  doc.text("Production Order Details", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  doc.text("", 14, 15)
  const tableColumn = ["Sr. No", "Window Type", "Total Quantity", "Produced Quantity"]

  const tableRows = []

  BothArray.products.data.forEach((data, index) => {
    const TableData = [

      index + 1,
      data.windowType,
      data.qty,
      data.producedQty
    ]

    tableRows.push(TableData)
  })

  let yPos = 45
  doc.autoTable(tableColumn, tableRows, { startY: yPos, styles: { fontSize: 6 } })

  const tableColumn2 = ["Sr. No", "Item", "Quantity"]
  const tableRows2 = []
  BothArray.items.data.forEach((data, index) => {
    const TableData2 = [
      index + 1,
      data.itemName,

      data.itemQuantity

    ]

    tableRows2.push(TableData2)
  })
  yPos = doc.lastAutoTable.finalY + 5

  doc.autoTable(tableColumn2, tableRows2, { startY: yPos, styles: { fontSize: 8 } })


  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.save(`ProductionOrderDetails_${dateStr}.pdf`)
}

export default generatePDF