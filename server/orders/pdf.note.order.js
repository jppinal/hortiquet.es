var PDFDocument = require('pdfkit');

exports.create = function(billing_address, shipping_address, items) {
  doc = new PDFDocument;

  // Titular
  doc.text('', 70, 50, {continued: true});
  doc.fontSize(22).text('umvelta');
  doc.fontSize(10).text('Nombre Apellidos');
  doc.fontSize(10).text('123456789-A');

  doc.text('', 400, 80, {continued: true});
  doc.fontSize(12).text(billing_address.firstname + ' ' + billing_address.lastname, {align: 'right'});
  doc.fontSize(11).text(billing_address.line1 + ' ' + billing_address.line2, {align: 'right'});
  doc.fontSize(11).text(billing_address.city + ', ' + billing_address.postal_code, {align: 'right'});
  doc.fontSize(11).text(billing_address.province + ' (' + billing_address.country + ')', {align: 'right'}).moveDown(0.2);
  doc.fontSize(10).text('tel. ' + billing_address.phone, {align: 'right'});
  doc.fontSize(10).text('email. ' + billing_address.email, {align: 'right'});

  doc.text('', 70, 190, {continued: true});
  doc.fontSize(14).text('Pedido').moveDown(0.5);

  doc.fontSize(12).text('Dirección de envío: ').moveDown(0.3);
  doc.fontSize(12).text(shipping_address.firstname, {width: 300, align: 'left', continued: true});
  doc.fontSize(12).text( ' ' + shipping_address.lastname, {width: 300,align: 'left'}).moveDown(0.3);
  doc.fontSize(11).text(shipping_address.line1, {width: 300,align: 'left', continued: true});
  doc.fontSize(11).text(shipping_address.line2, {width: 300,align: 'left'});
  doc.fontSize(11).text(shipping_address.city, {width: 300,align: 'left', continued: true});
  doc.fontSize(11).text(', ' + shipping_address.postal_code, {width: 300,align: 'left'});
  doc.fontSize(11).text(shipping_address.province, {width: 300,align: 'left', continued: true});
  doc.fontSize(11).text(' (' + shipping_address.country + ')', {width: 300,align: 'left'}).moveDown(0.2);
  doc.fontSize(10).text('tel. ' + shipping_address.phone, {width: 300,align: 'left'});
  doc.fontSize(10).text('email. ' + shipping_address.email, {width: 300,align: 'left'});


  var top = 350;

  doc.fontSize(10).text('SKU', 70, top, {width: 100, align: 'left'});
  doc.fontSize(10).text('Producto', 170, top, {width: 100, align: 'left'});
  doc.fontSize(10).text('Uds', 270, top, {width: 100, align: 'left'});
  doc.fontSize(10).text('€*/Ud', 370, top, {width: 100, align: 'left'});
  doc.fontSize(10).text('€*', 470, top, {width: 100, align: 'left'});

  doc.moveTo(70, top + 15).lineTo(600,top + 15).stroke();

  top += 20;
  items.forEach( function(item) {
    doc.fontSize(10).text(item.name, 70, top, {width: 100, align: 'left'});
    doc.fontSize(10).text(item.name, 170, top, {width: 150, align: 'left'});
    doc.fontSize(10).text(item.name, 270, top, {width: 200, align: 'left'});
    doc.fontSize(10).text(item.name, 370, top, {width: 100, align: 'left'});
    doc.fontSize(10).text(item.name, 470, top, {width: 100, align: 'left'});
    top += 15;
  });

  doc.fontSize(8).text('* Sin IVA', 80, top, {align: 'left'});

  doc.end();

  return doc;
};
