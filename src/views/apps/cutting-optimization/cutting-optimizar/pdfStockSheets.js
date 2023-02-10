/* eslint-disable comma-dangle */
/* eslint-disable semi */
// list/TablePDF.js

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import pakLogo from "../../../../assets/images/logo/BPC_logo.jpg";

const generatePDF = PiecesInput => {
  let yPos = 10;
  const doc = new jsPDF();
  doc.addImage(pakLogo, "JPEG", 14, yPos, 50, 25);
  doc.setFontSize(20);
  doc.setFont("arial");
  doc.setFont(undefined, "bold");
  yPos += 10;
  doc.text("BPC uPVC Doors & Windows", 65, yPos);
  doc.setFontSize(12);
  doc.setFont("arial");
  doc.setFont(undefined, "bold");
  yPos += 6;
  doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, yPos);

  yPos += 6;
  doc.text("Stock Sheet Details", 86, yPos);

  doc.setFontSize(12);
  doc.setFont("normal");
  doc.setFont(undefined, "normal");
  yPos += 5;
  const tableColumn = [
    "Sr No",
    "Length",
    "Width",
    "Quantity"
  ];

  const tableRows = [];

  PiecesInput.forEach((data, index) => {
    const TableData = [
      index + 1,
      data.length,
      data.width,
      data.count
    ];
    tableRows.push(TableData);
  });

  yPos += 5; //56
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    startY: yPos,

    columnStyles: {
      //   0: { halign: 'center', cellWidth: 13 },
    },
  });

  yPos = doc.lastAutoTable.finalY + 5;

  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`StockSheets${dateStr}.pdf`);
};

export default generatePDF;
