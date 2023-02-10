import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../../assets/images/logo/BPC_logo.jpg'
import moment from 'moment'
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
  doc.setFontSize(13)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Projects Information List", 76, 38)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  const tableColumn = ["Sr. No", "Client", "Project", "Location", "Start Date", "End Date", "Progress", "Status"]

  const tableRows = []

  sorted.forEach((data, index) => {
    if (data.paid === null) {
      data.paid = 0
    } else if (data.total_amount === null) {
      data.total_amount = 1
    }
    const TableData = [
      index + 1,
      data.clientName,
      data.name,
      data.location,
      moment(data.startDate).format('DD/MM/YYYY'),
      moment(data.endDate).format('DD/MM/YYYY'),
      Number((data.producedQty * 100) / data.qty).toFixed(0).concat(' %'),
      data.status
    ]

    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, {
    startY: 45,
    columnStyles: {
      0: { halign: 'center' },
      6: { halign: 'right' }
    }
  })
  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`ProjectsDetails_${dateStr}.pdf`)
}

export default generatePDF