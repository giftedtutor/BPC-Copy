// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import moment from "moment"
import pakLogo from '../../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = (QuotData, ProjectData, paymentsDetail, Grand) => {

  let yPos = 10
  const doc = new jsPDF()
  doc.addImage(pakLogo, 'JPEG', 14, yPos, 50, 25)
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 10
  doc.text("BPC uPVC Doors & Windows", 65, yPos)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 6
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, yPos)

  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  doc.setFontSize(12)
  yPos += 20 //46
  doc.text(`Date :`, 130, yPos)
  doc.text(`${moment(ProjectData[0].date).format('DD/MM/YYYY')}`, 160, yPos)
  doc.text(`Invoice No:`, 14, yPos)
  doc.text(`INV-0${ProjectData[0].id}`, 45, yPos)
  yPos += 6 //51
  doc.text(`Profile Name :`, 130, yPos)
  doc.text(`${ProjectData[0].profileName}`, 160, yPos)
  doc.text(`Client Name :`, 14, yPos)
  doc.text(`${ProjectData[0].clientName}`, 45, yPos)
  const tableColumn = ["Sr No", "Description", "Unit", "Quantity", "Rate (PKR)", "Amount (PKR)"]

  const tableRows = []

  QuotData.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.Quotation1_discription,
      data.Quotation1_unit,
      data.Quotation1_Quantity,
      data.Quotation1_rate_unit.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.Quotation1_amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows.push(TableData)
  })

  yPos += 5 //56
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: yPos,

    columnStyles: {
      0: { halign: 'center', cellWidth: 13 },
      3: { halign: 'center', cellWidth: 18 },
      4: { halign: 'right', cellWidth: 23 },
      5: { halign: 'right', cellWidth: 30 }
    }
  })

  const tableColumn2 = ["Sr No", "Pay Date", "Paid (PKR)"]

  const tableRows2 = []

  paymentsDetail.forEach((data, index) => {
    const TableData2 = [
      index + 1,
      data.paymentDate,
      data.paid.toLocaleString(undefined, { maximumFractionDigits: 2 })
    ]
    tableRows2.push(TableData2)
  })

  yPos = doc.lastAutoTable.finalY + 6

  doc.autoTable(tableColumn2, tableRows2, {
    startY: yPos,
    headStyles: {
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 13 },
      1: { halign: 'center', cellWidth: 30 },
      2: { halign: 'right', cellWidth: 23 },
      3: { halign: 'right', cellWidth: 33 },
      4: { halign: 'right', cellWidth: 33 }
    }
  })


  yPos = doc.lastAutoTable.finalY + 5
  doc.setFontSize(12)
  doc.setFont("bold")
  doc.setFont(undefined, 'bold')
  doc.text(`Total (PKR):`, 140, yPos)
  doc.text(`${Grand.totalBill.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 176, yPos)
  yPos += 6
  doc.text(`Paid (PKR):`, 140, yPos)
  doc.text(`${Grand.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 176, yPos)
  yPos += 6
  doc.text(`Remaining (PKR):`, 140, yPos)
  doc.text(`${Grand.remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 176, yPos)

  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.save(`Invoice${dateStr}.pdf`)
}

export default generatePDF