const frappe = require('frappejs');
const naming = require('frappejs/model/naming');
const registerServerMethods = require('./registerServerMethods');

module.exports = async function postStart() {
  // set server-side modules
  frappe.models.SalesInvoice.documentClass = require('../models/doctype/SalesInvoice/SalesInvoiceServer.js');
  frappe.models.Payment.documentClass = require('../models/doctype/Payment/PaymentServer.js');
  frappe.models.Party.documentClass = require('../models/doctype/Party/PartyServer.js');
  frappe.models.PurchaseInvoice.documentClass = require('../models/doctype/PurchaseInvoice/PurchaseInvoiceServer.js');
  frappe.models.JournalEntry.documentClass = require('../models/doctype/JournalEntry/JournalEntryServer.js');
  frappe.models.GSTR3B.documentClass = require('../models/doctype/GSTR3B/GSTR3BServer.js');

  frappe.metaCache = {};

  frappe.syncDoc(require('../fixtures/invoicePrint'));

  // init naming series if missing
  await naming.createNumberSeries('SINV-', 'SalesInvoiceSettings');
  await naming.createNumberSeries('PINV-', 'PurchaseInvoiceSettings');
  await naming.createNumberSeries('PAY-', 'PaymentSettings');
  await naming.createNumberSeries('JV-', 'JournalEntrySettings');
  await naming.createNumberSeries('QTN-', 'QuotationSettings');
  await naming.createNumberSeries('SO-', 'SalesOrderSettings');
  await naming.createNumberSeries('OF-', 'FulfillmentSettings');
  await naming.createNumberSeries('PO-', 'PurchaseOrderSettings');
  await naming.createNumberSeries('PREC-', 'PurchaseReceiptSettings');

  registerServerMethods();
};
