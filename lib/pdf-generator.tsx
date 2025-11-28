import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Invoice } from './supabase';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 10,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  tableCol: {
    flex: 1,
  },
  total: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#2563eb',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 5,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontSize: 10,
    color: '#666',
  },
});

export const InvoicePDF = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>INVOICE</Text>
        <Text style={styles.invoiceNumber}>Invoice #{invoice.id.slice(0, 8).toUpperCase()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>BILL TO:</Text>
        <Text style={styles.value}>{invoice.client_name}</Text>
        {invoice.client_email && (
          <Text style={styles.value}>{invoice.client_email}</Text>
        )}
        <Text style={styles.value}>{invoice.client_whatsapp}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>INVOICE DATE:</Text>
        <Text style={styles.value}>
          {new Date(invoice.created_at).toLocaleDateString()}
        </Text>
        <Text style={styles.label}>DUE DATE:</Text>
        <Text style={styles.value}>
          {new Date(invoice.due_date).toLocaleDateString()}
        </Text>
      </View>

      {invoice.description && (
        <View style={styles.section}>
          <Text style={styles.label}>DESCRIPTION:</Text>
          <Text style={styles.value}>{invoice.description}</Text>
        </View>
      )}

      <View style={styles.total}>
        <Text style={styles.totalLabel}>TOTAL AMOUNT DUE:</Text>
        <Text style={styles.totalAmount}>
          {invoice.currency} {invoice.amount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text style={{ marginTop: 10 }}>
          Please make payment by {new Date(invoice.due_date).toLocaleDateString()}
        </Text>
      </View>
    </Page>
  </Document>
);
