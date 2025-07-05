import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'

class CertificateService {
  constructor() {
    this.templates = {
      webinar: {
        title: 'Certificate of Attendance',
        subtitle: 'This is to certify that',
        footer: 'has successfully attended the webinar'
      },
      course: {
        title: 'Certificate of Completion',
        subtitle: 'This is to certify that',
        footer: 'has successfully completed the course'
      }
    }
  }

  async generateCertificate(data) {
    const {
      type = 'webinar',
      userName,
      eventTitle,
      completionDate,
      instructorName,
      duration,
      attendancePercentage = 100
    } = data

    const certificateId = uuidv4()
    const template = this.templates[type]

    // Create PDF
    const pdf = new jsPDF('landscape', 'pt', 'a4')
    const pageWidth = pdf.internal.pageSize.width
    const pageHeight = pdf.internal.pageSize.height

    // Background
    pdf.setFillColor(15, 15, 15) // Netflix dark
    pdf.rect(0, 0, pageWidth, pageHeight, 'F')

    // Border
    pdf.setDrawColor(229, 9, 20) // Netflix red
    pdf.setLineWidth(8)
    pdf.rect(40, 40, pageWidth - 80, pageHeight - 80, 'S')

    // Inner border
    pdf.setDrawColor(255, 255, 255)
    pdf.setLineWidth(2)
    pdf.rect(60, 60, pageWidth - 120, pageHeight - 120, 'S')

    // Logo/Title
    pdf.setTextColor(229, 9, 20)
    pdf.setFontSize(48)
    pdf.setFont('helvetica', 'bold')
    const logoText = 'WebinarFlix'
    const logoWidth = pdf.getTextWidth(logoText)
    pdf.text(logoText, (pageWidth - logoWidth) / 2, 140)

    // Certificate type
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(36)
    pdf.setFont('helvetica', 'bold')
    const titleWidth = pdf.getTextWidth(template.title)
    pdf.text(template.title, (pageWidth - titleWidth) / 2, 200)

    // Subtitle
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'normal')
    const subtitleWidth = pdf.getTextWidth(template.subtitle)
    pdf.text(template.subtitle, (pageWidth - subtitleWidth) / 2, 250)

    // User name
    pdf.setFontSize(32)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(229, 9, 20)
    const nameWidth = pdf.getTextWidth(userName)
    pdf.text(userName, (pageWidth - nameWidth) / 2, 300)

    // Event title
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'normal')
    const footerText = `${template.footer}: "${eventTitle}"`
    const footerWidth = pdf.getTextWidth(footerText)
    pdf.text(footerText, (pageWidth - footerWidth) / 2, 350)

    // Details
    pdf.setFontSize(14)
    const detailsY = 400
    const leftX = 150
    const rightX = pageWidth - 150

    // Completion date
    pdf.text(`Completion Date: ${completionDate}`, leftX, detailsY)
    
    // Duration
    pdf.text(`Duration: ${duration}`, leftX, detailsY + 25)
    
    // Instructor
    pdf.text(`Instructor: ${instructorName}`, leftX, detailsY + 50)
    
    // Attendance percentage (for webinars)
    if (type === 'webinar') {
      pdf.text(`Attendance: ${attendancePercentage}%`, leftX, detailsY + 75)
    }

    // Certificate ID
    pdf.setFontSize(10)
    pdf.setTextColor(179, 179, 179)
    pdf.text(`Certificate ID: ${certificateId}`, leftX, pageHeight - 100)

    // Generate QR code for verification
    const qrCodeData = await QRCode.toDataURL(
      `https://webinarflix.com/verify/${certificateId}`,
      { width: 100, margin: 1 }
    )
    
    pdf.addImage(qrCodeData, 'PNG', rightX - 100, pageHeight - 150, 80, 80)
    pdf.text('Scan to verify', rightX - 80, pageHeight - 60)

    // Signature line
    pdf.setDrawColor(255, 255, 255)
    pdf.setLineWidth(1)
    pdf.line(rightX - 150, detailsY + 50, rightX - 50, detailsY + 50)
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.text('Authorized Signature', rightX - 120, detailsY + 70)

    return {
      pdf,
      certificateId,
      blob: pdf.output('blob'),
      base64: pdf.output('datauristring')
    }
  }

  async saveCertificate(certificateData, userId) {
    // In a real implementation, this would save to Supabase
    const certificate = {
      id: certificateData.certificateId,
      userId,
      type: certificateData.type,
      eventTitle: certificateData.eventTitle,
      completionDate: certificateData.completionDate,
      createdAt: new Date().toISOString(),
      verified: true
    }

    // Mock save to localStorage for demo
    const existingCerts = JSON.parse(localStorage.getItem('certificates') || '[]')
    existingCerts.push(certificate)
    localStorage.setItem('certificates', JSON.stringify(existingCerts))

    return certificate
  }

  async verifyCertificate(certificateId) {
    // Mock verification from localStorage
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]')
    const certificate = certificates.find(cert => cert.id === certificateId)
    
    return {
      valid: !!certificate,
      certificate: certificate || null
    }
  }

  getUserCertificates(userId) {
    // Mock get from localStorage
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]')
    return certificates.filter(cert => cert.userId === userId)
  }
}

export default new CertificateService()