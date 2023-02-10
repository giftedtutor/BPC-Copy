// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import moment from "moment"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import Deceuninck from '../../../../assets/images/logo/Deceuninck.png'
import wintech from '../../../../assets/images/logo/wintech.png'
import proline from '../../../../assets/images/logo/proline.png'
import buraq from '../../../../assets/images/logo/buraq.png'
import skypin from '../../../../assets/images/logo/skypin.png'
import conch from '../../../../assets/images/logo/conch.png'
import euro from '../../../../assets/images/logo/euro.png'

import superwin_img from '../../../../assets/images/logo/superwin.jfif'
import pamo from '../../../../assets/images/logo/pamo.jfif'
const generatePDF = (type, childData, MasterData, childDataPDFQ1) => {

  const doc = new jsPDF()
  const capitalizeFirstLetter = (str) => {
    if (str === undefined) {
      str = 'Null'
    }
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1)

    return capitalized
  }

  let yPos = 10
  doc.setFontSize(13)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("BPC uPVC Doors & Windows", 14, yPos)
  yPos -= 6
  doc.addImage(pakLogo, 'JPEG', 150, yPos, 40, 21)
  yPos += 6
  doc.setFontSize(11)
  doc.setFont("arial")
  doc.setFont(undefined, 'normal')
  yPos += 6
  doc.text("Address: G. T. Road Qamber, Swat KP-Pakistan", 14, yPos)
  yPos += 5
  doc.text("Phone: +92-946-883657 ", 14, yPos)
  yPos += 5
  doc.text("Mobile: +92-332-7723737", 14, yPos)
  yPos += 5
  doc.text("Email: bpccompany2011@gmail.com", 14, yPos)
  // doc.addImage(MasterData[0]?.profileID === 1 ? buraq : (MasterData[0]?.profileID === 2 ? euro : (MasterData[0]?.profileID === 3 ? pamo : (MasterData[0]?.profileID === 4 ? proline : (MasterData[0]?.profileID === 5 ? conch : (MasterData[0]?.profileID === 6 ? wintech : (MasterData[0]?.profileID === 7 ? Deceuninck : (MasterData[0]?.profileID === 8 ? skypin : (MasterData[0]?.profileID === 9 ? superwin_img : 'image here')))))))), 'JPEG', 155, yPos - 3, 16)

  yPos += 5
  doc.text("info@bpccompany.net", 14, yPos)
  yPos += 5
  doc.text("www.facebook.com/bpccompany", 14, yPos)
  yPos += 9
  doc.setFontSize(13)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Quotation To:", 14, yPos)
  doc.setFontSize(11)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 6
  doc.text("Name:", 14, yPos)
  doc.text(capitalizeFirstLetter(MasterData[0]?.name), 50, yPos)
  doc.text("Quotation No:", 130, yPos)
  doc.text(`QO-00${MasterData[0]?.id}`, 160, yPos)

  yPos += 6
  doc.text("Address:", 14, yPos)
  doc.text(capitalizeFirstLetter(MasterData[0]?.address), 50, yPos)
  doc.text("Date:", 130, yPos)
  doc.text(moment(MasterData[0]?.Quotation_date).format('DD/MM/YYYY'), 160, yPos)

  yPos += 6
  doc.text("Contact No.", 14, yPos)
  doc.text(MasterData[0]?.contact_no, 50, yPos)
  doc.text("Profile:", 130, yPos)
  doc.text((MasterData[0]?.profileName), 160, yPos)


  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  yPos += 25

  //  For multple table and Window Image
  childData.forEach((dataParent, index) => {
    doc.addImage(dataParent.DesignImageUrl, 'JPEG', 14, (yPos - 6), 50, 50)

    // Innner Second Table

    const tableColumnWindowData2 = ["Window Type", "Beading", "Size"]

    const tableRowsWindowData2 = []
    const TableDataWindowData2 = [
      (dataParent.windowType === "DDOOR" ? "Double Door" : (dataParent.windowType === "drawWindow" ? "Draw Window" : dataParent.windowType)),
      (dataParent.Beading === "SG" ? "Single Glaze" : "Double Glaze"),
      `${(dataParent.Width).toFixed(0)} mm x ${(dataParent.Height).toFixed(0)} mm`
    ]

    tableRowsWindowData2.push(TableDataWindowData2)

    doc.autoTable(tableColumnWindowData2, tableRowsWindowData2, {
      startY: yPos,
      headStyles: { halign: 'center' },
      columnStyles: {
        0: { halign: 'center' },
        1: { halign: 'center' },
        2: { halign: 'center' }
      },
      styles: { fontSize: 8 },
      margin: { left: 100 },
      padding: { right: 7, left: 1, top: 1, bottom: 1 }
    })
    yPos = doc.lastAutoTable.finalY + 10
    
    //Inner Second Table
    const tableColumnWindowData = ["Unit Price", "Sqft", "Quantity", "Total"]

    const tableRowsWindowData = []
    const TableDataWindowData = [
      ((MasterData[0]?.ratePerSqFt * dataParent.TotalSft) / dataParent.qty).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      Number(dataParent.TotalSft).toFixed(2),
      dataParent.qty,
      ((MasterData[0]?.ratePerSqFt * dataParent.TotalSft)).toLocaleString(undefined, { maximumFractionDigits: 0 })
    ]

    tableRowsWindowData.push(TableDataWindowData)

    doc.autoTable(tableColumnWindowData, tableRowsWindowData, {
      startY: yPos,
      headStyles: { halign: 'center' },
      columnStyles: {
        0: { halign: 'right' },
        1: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'right' }
      },
      styles: { fontSize: 8 },
      margin: { left: 100 },
      padding: { right: 7, left: 1, top: 1, bottom: 1 }
    })

    yPos = doc.lastAutoTable.finalY + 22
  })

  // Last One Table
  const tableColumn = ["Sr No", "Description", "Unit", "Qty", "Rate", "Total Amount"]

  const tableRows = []

  childDataPDFQ1.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.Quotation1_discription,
      data.Quotation1_unit,
      data.Quotation1_Quantity,
      data.Quotation1_rate_unit.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      data.Quotation1_amount.toLocaleString(undefined, { maximumFractionDigits: 0 })
    ]
    // push each tickcet's info into a row

    if (data.Quotation1_rate_unit !== 0) {
      tableRows.push(TableData)
    }
  })
  yPos += 10
  doc.autoTable(tableColumn, tableRows, {
    startY: yPos,
    columnStyles: {
      4: { halign: 'right', cellWidth: 25 },
      5: { halign: 'right', cellWidth: 30 }
    },

    styles: { fontSize: 8 },
    padding: { right: 7, left: 1, top: 1, bottom: 1 }
  })

  yPos = doc.lastAutoTable.finalY + 10

  doc.setFontSize(13)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')

  doc.text("Grand Total:", 135, yPos)
  doc.text((MasterData[0]?.Quotation1_total_amount).toLocaleString(undefined, { maximumFractionDigits: 2 }), 165, yPos)
  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  if (type === 1) {
    doc.save(`Quotation${dateStr}.pdf`)
  } else if (type === 2) {
    doc.output("dataurlnewwindow")
  }
}

export default generatePDF