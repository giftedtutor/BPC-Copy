/* eslint-disable comma-dangle */
/* eslint-disable semi */
// list/TablePDF.js

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import pakLogo from "../../../../assets/images/logo/BPC_logo.jpg";

const generatePDF = (dataUrl, TOTAL_Q_W_L, stockPiecesValues) => {
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
  doc.text("Cutted Sheet Details", 86, yPos);

  doc.setFontSize(12);
  doc.setFont("normal");
  doc.setFont(undefined, "normal");
  yPos += 5;

  doc.addImage(dataUrl, "JPEG", 14, yPos, 180, 180);

  yPos += 5;

  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`CuttedSheets${dateStr}.pdf`);
};

export default generatePDF;
