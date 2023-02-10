/* eslint-disable object-shorthand */
/* eslint-disable object-property-newline */
/* eslint-disable comma-dangle */
// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import Cookies from 'js-cookie'
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from "moment"

const generatePDF = sorted => {
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
  doc.text("Supplier Information List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  const role = Cookies.get('role')
  let val
  if (role === 'PROCUREMENT') {
    val = true
  } else {
    val = false
  }
  
  const tableColumn = ["Sr. No", "ID", "Name", "DOJ", "CNIC", "Mobile", `${val === true ? '' : "Salary (PKR)"}`, "Job Position", "Address"]

  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.employeeID,
      data.name,
      moment(data.dob).format('DD-MM-YYYY'),
      data.cnic,
      data.mobile,
      val === true ? '' : data.salary.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      data.employeeType,
      data.address
     ]
    tableRows.push(TableData)
  })

  doc.setFontSize(10)
  doc.autoTable(tableColumn, tableRows, {
    startY: 45, styles: { fontSize: 7 }, columnStyles: {
      0: { halign: 'center' },
      6: { halign: 'right' },
      7: { halign: 'center' }
    },

    drawHeaderCell: function (cell, data) {
      if (cell.raw === 'Sr. No') {
        cell.styles.fontSize = 35
        cell.styles.textColor = [255, 0, 0]
      } else {
        cell.styles.textColor = 255
        cell.styles.fontSize = 10

      }
    },
  })
  doc.save(`EmployeeList${dateStr}.pdf`)
}

export default generatePDF