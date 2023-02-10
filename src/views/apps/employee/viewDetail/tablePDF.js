/* eslint-disable object-property-newline */
/* eslint-disable comma-dangle */
// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import Cookies from 'js-cookie'
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from "moment"

const generatePDF = sorted => {

  const doc = new jsPDF('l', 'pt', "a4")
  let yPos = 30
doc.setFontSize(12)

doc.addImage(pakLogo, 'JPEG', 45, 14, 70, 50) 
doc.setFontSize(21)
doc.setFont("arial")
doc.setFont(undefined, 'bold')
yPos += 5
doc.text("BPC Doors & Windows", 125, yPos)
doc.setFontSize(11)
doc.setFont("arial")
doc.setFont(undefined, 'bold')
yPos += 12
doc.text("G. T. Road Qamber, Swat KP-Pakistan", 125, yPos)

doc.setFontSize(11)
doc.setFont("arial")
doc.setFont(undefined, 'normal')
yPos += 12

doc.text("Employees List", 125, yPos)
doc.setFontSize(9)
doc.setFont("normal")
doc.setFont(undefined, 'normal')

yPos += 30

  const role = Cookies.get('role')
  let val
  if (role === 'PROCUREMENT') {
    val = true
  } else {
    val = false
  }
  
  const tableColumn = ["Sr. No", "Employee", "Father Name", "Email", "Date of Joining", "CNIC", "Mobile", `${val === true ? '' : "Salary (PKR)"}`, "Job Position", "Gender", "Address"]
  
  const tableRows = []

  sorted.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.name,
      data.fatherName,
      data.email,
      moment(data.dob).format('DD-MM-YYYY'),
      data.cnic,
      data.mobile,
      val === true ? '' : data.salary,
      data.employeeType,
      data.gender,
      data.address
     ]
    tableRows.push(TableData)
  })


  doc.setFontSize(10)
  doc.autoTable(tableColumn, tableRows, {
    startY: yPos, styles: { fontSize: 7 }, columnStyles: {
      0: { halign: 'center' },
      1: { halign: 'left' },
      2: { halign: 'left' },
      3: { halign: 'left' },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' },
      8: { halign: 'center' },
      9: { halign: 'center' },
      10: { halign: 'left' },
    },
  })
  const date = Date().split(" ")

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
 doc.save(`Employees_${dateStr}.pdf`)
}

export default generatePDF