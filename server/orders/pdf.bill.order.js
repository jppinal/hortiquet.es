var PDFDocument = require('pdfkit');

exports.create = function(data) {
  doc = new PDFDocument;

  // Titular
  doc.fontSize(12).text('Nombre Apellidos', {align: 'right'});
  doc.fontSize(12).text('123456789-A', {align: 'right'});
  doc.fontSize(12).text('Calle');
  doc.fontSize(12).text('CP - Localidad');
  doc.fontSize(12).text('Provincia');

  doc.fontSize(12).text('Nombre2 Apellidos2', 100 , 100, {align: 'left'});
  doc.fontSize(12).text('123456789-B');


  doc.end();

  return doc;
};
