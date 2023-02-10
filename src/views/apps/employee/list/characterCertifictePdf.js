/* eslint-disable object-shorthand */
/* eslint-disable object-property-newline */
/* eslint-disable comma-dangle */
// list/TablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
import Cookies from 'js-cookie'
import pakLogo from '../../../../assets/images/logo/BPC_logo.jpg'
import moment from "moment"

const generateCSPDF = data => {
    let todayDate = new Date()
    const dd = String(todayDate.getDate()).padStart(2, '0')
    const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = todayDate.getFullYear()

    todayDate = `${yyyy}-${mm}-${dd}`
    const doc = new jsPDF()
    // const splitTitle = doc.splitTextToSize(reportTitle, 180)
    console.log(data)
    doc.addImage(pakLogo, 'JPEG', 14, 10, 50, 25)
    doc.setFontSize(20)
    doc.setFont("arial")
    doc.setFont(undefined, 'bold')
    doc.text("BPC uPVC Doors & Windows", 65, 20)
    doc.setFontSize(12)
    doc.setFont("arial")
    doc.setFont(undefined, 'bold')
    doc.text("G. T. Road Qamber, Swat KP-Pakistan", 66, 26)

    let yPos = 47
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text(`Dated: ${moment(todayDate).format('LL')}`, 14, yPos)

    yPos += 8
    doc.setFontSize(14)
    doc.setFont("normal")
    doc.setFont(undefined, 'bold')
    doc.text("CHARACTER CERTIFICATE", 69, yPos)

    yPos += 9
    doc.setFont("normal")
    doc.setFont(undefined, 'bold')
    doc.text("TO WHOM IT MAY CONCERN", 67, yPos)

    yPos += 11
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text(`This is to certify that Mr. / Miss. ${data.name} S/o. / D/o. of ${data.fatherName} has served in the BPC uPVC Doors & Windows since ${moment(data.dob).format('LL')} to ${moment(todayDate).format('LL')}. To the best of  my knowledge and belief he / she has a good moral character. He / she does not have any cases orpenalties pending on him / her, which may render him / her unsuitable for employment in your prestigious organization.`, 14, yPos, { lineHeightFactor: 1.3, maxWidth: 180, maxWidth: 180 })

    yPos += 24
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text(`Our Management has not received a single complaint against him / her anyhow. We always appreciate his / her dedicatedwork for the company.`, 14, yPos, { lineHeightFactor: 1.3, maxWidth: 180 })

    yPos += 14
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text(`We wish him / her every success in life.`, 14, yPos, { lineHeightFactor: 1.3, maxWidth: 180 })

    yPos += 10
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text("Name:       ___________________", 14, yPos)

    yPos += 8
    doc.setFontSize(12)
    doc.setFont("normal")
    doc.setFont(undefined, 'normal')
    doc.text("Signature: ___________________", 14, yPos)

    const date = Date().split(" ")

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
    doc.save(`${data.name}CharacterCertificate${dateStr}.pdf`)
}

export default generateCSPDF