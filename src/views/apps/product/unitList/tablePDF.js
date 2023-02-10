import jsPDF from "jspdf"
import "jspdf-autotable"
const generatePDF = sorted => {
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ["Unit ID", "Unit 1 Name (Code)", "Unit 2 Name (Code)"]
  // define an empty array of rows
  const tableRows = []

  sorted.forEach(data => {
    const TableData = [
      data.unit1name + data.unit1code,
      data.unit2name + data.unit2code,
      data.unit1quantity + data.unit2quantity
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left
  doc.text("Units Information List", 14, 15)
  // we define the name of our PDF file.
  doc.save(`Units_${dateStr}.pdf`)
}

export default generatePDF