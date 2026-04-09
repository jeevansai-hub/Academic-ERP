import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateReceiptPDF = (feeData: any, studentData: any, parentData: any) => {
  const doc = new jsPDF();
  const primaryColor = [12, 36, 97]; // ECAP Theme Color
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ECAP-VIIT', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Academic ERP - Parent Portal', 20, 32);
  
  doc.setFontSize(20);
  doc.text('FEE RECEIPT', 150, 25, { align: 'right' });

  // Receipt Details
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt No: ${feeData.receiptNumber || 'N/A'}`, 20, 55);
  
  const today = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date());
  doc.text(`Date: ${today}`, 150, 55);

  // Student Info
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 60, 190, 60);
  
  doc.setFontSize(12);
  doc.text('Student Information', 20, 70);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Name: ${studentData.name}`, 20, 80);
  doc.text(`Roll No: ${studentData.rollNo}`, 20, 87);
  doc.text(`Branch: ${studentData.branch || 'N/A'}`, 20, 94);
  doc.text(`Parent: ${parentData.name}`, 120, 80);
  doc.text(`Phone: ${parentData.phone || 'N/A'}`, 120, 87);

  // Fee Details Table
  autoTable(doc, {
    startY: 110,
    head: [['Description', 'Semester', 'Status', 'Amount (INR)']],
    body: [
      [feeData.feeType, feeData.semester, 'PAID', `INR ${feeData.amount}`]
    ],
    headStyles: { fillColor: primaryColor as any, textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 20, right: 20 }
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Total Paid:', 140, finalY);
  doc.text(`INR ${feeData.amount}.00`, 170, finalY, { align: 'right' });

  // Watermark
  doc.setTextColor(230, 230, 230);
  doc.setFontSize(60);
  (doc as any).text('PAID', 105, 100, { align: 'center', angle: 45, opacity: 0.1 });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated receipt and does not require a physical signature.', 105, 280, { align: 'center' });

  doc.save(`Receipt_${feeData.receiptNumber || 'Fee'}.pdf`);
};
