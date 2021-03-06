import frappe from 'frappejs';
import { _ } from 'frappejs/utils';
const path = require('path');

const config = {
  getTitle: async () => {
    const { companyName, country } = await frappe.getSingle(
      'AccountingSettings'
    );
    if (country === 'India') {
      config.groups[2].items.push(
        {
          label: _('GSTR 1'),
          route: '/report/gstr-1?transferType=B2B'
        },
        {
          label: _('GSTR 2'),
          route: '/report/gstr-2?transferType=B2B'
        },
        {
          label: _('GSTR 3B'),
          route: '/list/GSTR3B'
        }
      );
    }
    return companyName;
  },
  getDbName() {
    if (localStorage.dbPath) {
      const parts = localStorage.dbPath.split(path.sep);
      return parts[parts.length - 1];
    }
  },
  getGroups() {
    return this.groups.map(g => g.title);
  },
  getItems(groupTitle) {
    if (groupTitle)
      return this.groups.filter(g => g.title === groupTitle)[0].items;
    else return [];
  },
  groups: [
    {
      title: _('Masters'),
      items: [
        {
          label: _('Chart Of Accounts'),
          route: '/chartOfAccounts'
        },
        {
          label: _('Accounts'),
          route: '/list/Account'
        },
        {
          label: _('Item'),
          route: '/list/Item'
        },
        {
          label: _('Customer'),
          route: '/list/Customer'
        },
        {
          label: _('Supplier'),
          route: '/list/Supplier'
        },
        {
          label: _('Tax'),
          route: '/list/Tax'
        }
      ]
    },
    {
      title: _('Transactions'),
      items: [
        {
          label: _('Sales Invoice'),
          route: '/list/SalesInvoice'
        },
        {
          label: _('Purchase Invoice'),
          route: '/list/PurchaseInvoice'
        },
        {
          label: _('Journal Entry'),
          route: '/list/JournalEntry'
        },
        {
          label: _('Payment'),
          route: '/list/Payment'
        }
      ]
    },
    {
      title: _('Reports'),
      items: [
        {
          label: _('General Ledger'),
          route: '/report/general-ledger'
        },
        {
          label: _('Profit And Loss'),
          route: '/report/profit-and-loss'
        },
        {
          label: _('Balance Sheet'),
          route: '/report/balance-sheet'
        },
        {
          label: _('Trial Balance'),
          route: '/report/trial-balance'
        },
        {
          label: _('Sales Register'),
          route: '/report/sales-register'
        },
        {
          label: _('Purchase Register'),
          route: '/report/purchase-register'
        },
        {
          label: _('Bank Reconciliation'),
          route: '/report/bank-reconciliation'
        }
      ]
    },
    {
      title: _('Tools'),
      items: [
        {
          label: _('Data Import'),
          route: '/data-import'
        },
        {
          label: _('Settings'),
          route: '/settings'
        }
      ]
    }
  ]
};

export default config;
