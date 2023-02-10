// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from "moment"

const generatePDF = (parentData, childData) => {
  const doc = new jsPDF()
  const date = Date().split(" ")
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
  doc.text("Delivery Challan", 85, 38)
  doc.setFontSize(11)
  doc.setFont("arial")
  doc.setFont(undefined, 'normal')
  doc.text(`Client Name :`, 14, 47)
  doc.text(`${parentData[0].name}`, 50, 47)
  doc.text(`Project Name:`, 14, 53)
  doc.text(`${parentData[0].projectName}`, 50, 53)

  doc.text(`Date :`, 14, 58)
  doc.text(`${moment(parentData[0].date).format('DD-MM-YYYY')}`, 50, 58)
  doc.text(`Phone No. :`, 14, 64)
  doc.text(`${parentData[0].contact_no}`, 50, 64)
  doc.text(`Address:`, 14, 70)
  doc.text(`${parentData[0].address}`, 50, 70)

  let t = 0
  const arr = childData.map((data, idx) => {

    t = t + data.quantity

  })
  const tt = 0
  const tableColumn = ["Sr. No", "Window", 'Quantity', ""]
  const tableRows = []

  childData.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.windowType,
      data.quantity
    ]
    tableRows.push(TableData)
  })


  doc.autoTable(tableColumn, tableRows, {
    startY: 73,
    columnStyles: {
      2: { halign: 'center', cellWidth: 20 }
    }
  })

  doc.save(`DeliveryChallan_${dateStr}.pdf`)
}

export default generatePDF