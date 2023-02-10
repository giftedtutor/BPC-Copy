import jsPDF from "jspdf"
import autoTable from 'jspdf-autotable'

const generatePDF = (sorted, MasterDetails) => {
    const doc = new jsPDF()
    autoTable(doc, { html: '#coastingI' })
    autoTable(doc, { html: '#coastingII' })
    autoTable(doc, { html: '#coastingIII' })
    autoTable(doc, { html: '#coastingIIII' })
    doc.save('table.pdf')
}

export default generatePDF