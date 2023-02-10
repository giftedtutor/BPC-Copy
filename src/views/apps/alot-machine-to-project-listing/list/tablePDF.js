// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'

const generatePDF = mappSuppliers => {
  
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
  doc.text("Aloted Machines List", 66, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Project", "Machine"]
  // define an empty array of rows
  const tableRows = []

  mappSuppliers.forEach(data => {
    const TableData = [
      data.id,
      data.projectName, 
      data.name
    ]
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 45,
    columnStyles: {
      0: { halign: 'center' }
    }
  })
 
  doc.save(`AlotedMachines_${dateStr}.pdf`)
}

export default generatePDF