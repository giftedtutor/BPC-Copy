// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import moment from "moment"
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
const generatePDF = (type, solutionData, remainingSheet) => {
    console.log('Data on PDF', solutionData)

    const doc = new jsPDF()

    let yPos = 10
    doc.setFontSize(13)
    doc.setFont("arial")
    doc.setFont(undefined, 'bold')
    doc.text("BPC uPVC Doors & Windows", 14, yPos)


    //   doc.text("Name:", 14, yPos)
    //   doc.text(capitalizeFirstLetter(MasterData[0]?.address), 50, yPos)
    //   doc.text("Quotation No:", 130, yPos)
    //   doc.text(`QO-00${MasterData[0]?.id}`, 160, yPos)


    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')

    yPos += 10

    //   //  For multple table and Window Image
    //   childData.forEach((dataParent, index) => {
    //     doc.addImage(dataParent.DesignImageUrl, 'JPEG', 14, yPos, 50, 50)

    //     // Innner Second Table

    //     const tableColumnWindowData2 = ["Window Type", "Beading", "Size"]

    //     const tableRowsWindowData2 = []
    //     const TableDataWindowData2 = [
    //       (dataParent.windowType === "DDOOR" ? "Double Door" : (dataParent.windowType === "drawWindow" ? "Draw Window" : dataParent.windowType)),
    //       (dataParent.Beading === "SG" ? "Single Glaze" : "Double Glaze"),
    //       `${(dataParent.Width).toFixed(0)} mm x ${(dataParent.Height).toFixed(0)} mm`
    //     ]

    //     tableRowsWindowData2.push(TableDataWindowData2)


    //     doc.autoTable(tableColumnWindowData2, tableRowsWindowData2, {
    //       startY: yPos,
    //       headStyles: { halign: 'center' },
    //       columnStyles: {
    //         0: { halign: 'center' },
    //         1: { halign: 'center' },
    //         2: { halign: 'center' }
    //       },
    //       styles: { fontSize: 8 },
    //       margin: { left: 100 },
    //       padding: { right: 7, left: 1, top: 1, bottom: 1 }
    //     })
    //     yPos = doc.lastAutoTable.finalY + 10

    //     //Inner Second Table
    //     const tableColumnWindowData = ["Unit Price", "Sqft", "Quantity", "Total"]

    //     const tableRowsWindowData = []
    //     const TableDataWindowData = [
    //       ((MasterData[0]?.ratePerSqFt * dataParent.TotalSft) / dataParent.qty).toLocaleString(undefined, { maximumFractionDigits: 0 }),
    //       Number(dataParent.TotalSft).toFixed(2),
    //       dataParent.qty,
    //       ((MasterData[0]?.ratePerSqFt * dataParent.TotalSft)).toLocaleString(undefined, { maximumFractionDigits: 0 })
    //     ]

    //     tableRowsWindowData.push(TableDataWindowData)


    //     doc.autoTable(tableColumnWindowData, tableRowsWindowData, {
    //       startY: yPos,
    //       headStyles: { halign: 'center' },
    //       columnStyles: {
    //         0: { halign: 'right' },
    //         1: { halign: 'center' },
    //         2: { halign: 'center' },
    //         3: { halign: 'right' }
    //       },
    //       styles: { fontSize: 8 },
    //       margin: { left: 100 },
    //       padding: { right: 7, left: 1, top: 1, bottom: 1 }
    //     })

    //     yPos = doc.lastAutoTable.finalY + 22
    //   })

    // Last One Table
    const tableColumn = ["Repetition", "Stock Length", "Waste - Material remnant"]

    const tableRows = []

    solutionData.solution.layouts.forEach((data, index) => {
        const TableData = [
            `(${data.count}X)`,
            `${data.stock.length} x ${data.stock.width}`,
            remainingSheet[index]
        ]
        // push each tickcet's info into a row

        tableRows.push(TableData)
    })
   
    yPos += 10
    doc.setDrawColor(0)
    doc.setFillColor(255, 0, 0)
    doc.rect(100, 15, 10, 10, 'F')
    
    doc.autoTable(tableColumn, tableRows, {
        startY: yPos,
        columnStyles: {
            4: { halign: 'right', cellWidth: 25 },
            // 1: { halign: 'center' },
            // 2: { halign: 'center' },
            5: { halign: 'right', cellWidth: 30 }
        },

        styles: { fontSize: 8 },
        padding: { right: 7, left: 1, top: 1, bottom: 1 }
    })

    yPos = doc.lastAutoTable.finalY + 10

    doc.setFontSize(13)
    doc.setFont("arial")
    doc.setFont(undefined, 'bold')

    const date = Date().split(" ")

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]

    if (type === 1) {
        doc.save(`Quotation${dateStr}.pdf`)
    } else if (type === 2) {
        doc.output("dataurlnewwindow")
    }
}

export default generatePDF