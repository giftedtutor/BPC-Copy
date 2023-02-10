// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from "moment"
const generatePDF = (P_Data, C_Data) => {
  const doc = new jsPDF('l', 'pt', "a4")

  let yPos = 20
  doc.setFontSize(12)

  doc.addImage(pakLogo, 'JPEG', 45, 2, 53, 53)
  doc.setFontSize(21)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 5
  doc.text("BPC Doors & Windows", 100, yPos)
  doc.setFontSize(11)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  yPos += 12
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 100, yPos)

  doc.setFontSize(11)
  doc.setFont("arial")
  doc.setFont(undefined, 'normal')
  yPos += 12

  doc.text("Cutting Sheet", 100, yPos)
  doc.setFontSize(9)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  yPos += 30
  doc.text(`Qutation No : QT-00${P_Data[0].id}`, 45, yPos)
  doc.text(`Date : ${moment(P_Data[0].Quotation_date).format('DD/MM/YYYY')}`, 290, yPos)
  doc.text(`Profile Name : ${P_Data[0].profileName !== P_Data[0]?.profileName ? `${P_Data[0].profileName, P_Data[1]?.profileName}` : P_Data[0].profileName}`, 290, yPos - 12)
  doc.text(`Client Name : ${P_Data[0].name}`, 45, yPos - 12)

  yPos += 10

  const tableColumn = ["Window No", "Quantity", "Height", "Width", "Window Type", "Frame (W)", "Frame (H)", `${C_Data[0]?.windowType === '3PSL' ? 'Sash (W1)' : 'Sash (W)'}`, `${C_Data[0]?.windowType === '3PSL' ? 'Sash (W2)' : ''}`, "Sash (H)", `${C_Data[0]?.windowType === '3PSL' ? 'Screen (W1)' : 'Screen (W)'}`, `${C_Data[0]?.windowType === '3PSL' ? 'Screen (W2)' : ''}`, "Screen (H)"]

  const tableRows = []
  let TotalQty = 0
  let TotalWidth = 0
  let TotalHeight = 0
  let SashW = 0
  let SashH = 0
  let ScreenW = 0
  let ScreenH = 0
  let FrameW = 0
  let FrameH = 0
  let SashW2 = 0
  let ScreenW2 = 0

  C_Data.forEach((data, index) => {
    const TableData = [
      index + 1,
      Number(data.qty),
      data.width.toFixed(0),
      data.height.toFixed(0),
      data.windowType,
      (data.width + 6).toFixed(0),
      (data.height + 6).toFixed(0),
      data.windowType === '4PSL' || data.windowType === '3PSL' ? (((((data.width) / 2) / 2) - 4).toFixed(0)) : ((((data.width) / 2) - 4).toFixed(2)),
      data.windowType === '3PSL' ? ((((data.width) / 2) - 4).toFixed(0)) : '',
      ((data.height) - 80).toFixed(0),
      data.windowType === '4PSL' || data.windowType === '3PSL' ? ((((((data.width) / 2) / 2) - 4) - 25).toFixed(0)) : (((((data.width) / 2) - 4) - 25).toFixed(0)),
      data.windowType === '3PSL' ? (((((data.width) / 2) - 4) - 25).toFixed(0)) : '',
      ((data.height) - 80).toFixed(0)

    ]

    TotalQty = TotalQty + Number(data.qty)
    TotalWidth = TotalWidth + data.width
    TotalHeight = TotalHeight + data.height
    SashW = Number(SashW) + (data.windowType === '4PSL' || data.windowType === '3PSL' ? Number(((((data.width) / 2) / 2) - 4)) : Number((((data.width) / 2) - 4)))
    SashH = Number(SashH) + ((data.height) - 80)
    ScreenW = ScreenW + (data.windowType === '4PSL' || data.windowType === '3PSL' ? ((((((data.width) / 2) / 2) - 4) - 25)) : (((((data.width) / 2) - 4) - 25)))
    ScreenH = ScreenH + ((data.height) - 80)
    FrameW = FrameW + ((data.width) + 6)
    FrameH = FrameH + ((data.height) + 6)
    SashW2 = Number(SashW2) + (data.windowType === '3PSL' ? Number(((data.width) / 2) - 4) : 0)
    ScreenW2 = Number(ScreenW2) + (data.windowType === '3PSL' ? (((((data.width) / 2) - 4) - 25)) : 0)

    tableRows.push(TableData)
  })
  const TableData1 = []

  const TableData2 = ['Totals:', TotalQty.toFixed(0), TotalWidth.toFixed(0), TotalHeight.toFixed(0), '', FrameW, FrameH, Number(SashW).toFixed(0), C_Data[0]?.windowType === '3PSL' ? SashW2 : '', SashH.toFixed(0), ScreenW.toFixed(0), C_Data[0]?.windowType === '3PSL' ? ScreenW2 : '', ScreenH.toFixed(0)]

  tableRows.push(TableData1, TableData2)

  doc.autoTable(tableColumn, tableRows,
    {
      startY: yPos,
      styles: { fontSize: 8 },
      columnStyles: {
        0: { halign: 'center' },
        1: { halign: 'right' },
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'center' },
        5: { halign: 'right' },
        6: { halign: 'right' },
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
        10: { halign: 'right' }
      }
    })
  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  doc.save(`cuttingsheet${dateStr}.pdf`)
}

export default generatePDF