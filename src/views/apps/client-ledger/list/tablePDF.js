// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import moment from "moment"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = (sorted, DateFrom, DateTo) => {
  // initialize jsPDF
  const doc = new jsPDF()
  const date = Date().split(" ")
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left
  doc.addImage(pakLogo, 'JPEG', 14, 10, 50, 25)
  doc.setFontSize(20)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("BPC uPVC Doors & Windows", 65, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, 26)
  doc.setFontSize(11)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  doc.text(`Client Name: ${sorted[0]?.name}`, 14, 41)
  doc.text(`Contact No : ${sorted[0]?.contact_no}`, 14, 46)
  doc.text(`Address    : ${sorted[0]?.address}`, 14, 51)
 { DateFrom === '' ? doc.text(`Date: ${moment(sorted.date).format('DD/MM/YYYY')}`, 14, 56) : doc.text(`From  ${DateFrom === '' ? '' :  moment(DateFrom).format('DD/MM/YYYY')} To ${DateTo === '' ? '' : moment(DateTo).format('DD/MM/YYYY')}`, 14, 56) }
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "RV No.", "Date", "Description", "Payment Type", "Previous Balance", "Total Bill", "Receive", "Balance"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  sorted.forEach((data, index) => {
    const TableData1 = [
      index + 1,
      data.ledg_no,
      moment(data.paymentDate).format('DD/MM/YYYY'),
      data.description,
      data.paymentType,
      data.previousBalance.toLocaleString("en-US"),
      data.totalBill.toLocaleString("en-US"),
      data.paid.toLocaleString("en-US"),
      data.remaining.toLocaleString("en-US")

      // called date-fns to format the date on the ticket
      //   format(new Date(data.updated_at), "yyyy-MM-dd")
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData1)
  })

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: 63,
    styles: { fontSize: 8 },
    columnStyles: {
      0: { halign: 'center' },
      1: { halign: 'center' },
      // 4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' }
    }
  })
 
  // we define the name of our PDF file.
  doc.save(`CleintLedgerReport_${dateStr}.pdf`)
}

export default generatePDF