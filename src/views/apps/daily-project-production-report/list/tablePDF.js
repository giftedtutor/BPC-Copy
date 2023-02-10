// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

// define a generatePDF function that accepts a tickets argument
const generatePDF = (PProgressReportData, DateFrom) => {
  // initialize jsPDF

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

  doc.text("Daily Project Progress Report", 100, yPos)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'bold')


  yPos += 22

  doc.text(`Daily Report of ${DateFrom}`, 40, yPos)

  doc.setFontSize(9)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')

  yPos += 10
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Project", "Windows Type", "Location", "Total Windows", "Completed Windows", "Cutting Frame (Profile & Steel)", "Screwing", "Welding", "Cleaning", "Hardware Assembles", "Beading Cutting", "Fitting", "Status"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  PProgressReportData.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.projectName,
      data.windowType === 'drawWindow' ? 'Draw Window' : (data.windowType === 'DDOOR' ? 'Double Door' : data.windowType),
      data.location,
      data.totalWindows,

      data.completedWindows,
      data.cuttingFrameProfleAndSteel,
      data.screwing,

      data.welding,
      data.cleaning,
      data.hardwareAssembles,
      data.beading,
      data.fitting,
      data.QCStatus === 'COMPLETE' ? 'COMPLETED' : data.QCStatus

    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: yPos,
    columnStyles: {
      0: { halign: 'center' },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' },
      8: { halign: 'right' },
      9: { halign: 'right' },
      10: { halign: 'right' },
      11: { halign: 'right' },
      12: { halign: 'right' }
    }
  })
  const date = Date().split(" ")

  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

  // we define the name of our PDF file.
  doc.save(`dailyProjectProgressReport_${dateStr}.pdf`)
}

export default generatePDF