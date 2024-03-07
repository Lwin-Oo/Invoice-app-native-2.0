import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Header from './Header';
import { Linking } from 'react-native';
import generatePdf from '../constants/generatePdf';

const Home = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error.message);
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      // Filter out the deleted invoice from the state
      setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice._id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error.message);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Invoice',
      'Are you sure you want to delete this invoice?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
        },
      ],
      { cancelable: false }
    );
  };

  
  const handleSend = (pdfFilePath, customerEmail) => {
    console.log(`Sending invoice to email ${customerEmail}`);
    
    const subject = "Invoice";
    const body = "Please find the invoice attached.";
    
    return new Promise((resolve, reject) => {
      try {
        const mailtoUrl = `mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${pdfFilePath}`;
    
        Linking.openURL(mailtoUrl).then(() => {
          console.log('Email app launched');
          resolve();
        }).catch((err) => {
          console.error('Failed to open email app:', err);
          reject(err);
        });
      } catch (error) {
        console.error('Error handling send:', error.message);
        reject(error);
      }
    });
  };

  

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <Text style={styles.title}>Invoice Cards</Text>
        {invoices.map((invoice) => (
          <View key={invoice._id} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.invoiceNumber}>Invoice Number: {invoice.invoiceNumber}</Text>
              <Text style={styles.customerName}>Customer Name: {invoice.customerName}</Text>
              <Text style={styles.totalAmount}>Total Amount: ${invoice.totalAmount}</Text>
              <Text style={styles.totalQuantities}>Total Quantities: {invoice.totalQuantities}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              {/* Delete button */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(invoice._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              {/* Send button */}
              <TouchableOpacity style={styles.sendButton} onPress={async () => await handleSend(invoice._id, invoice.customerEmail)}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerName: {
    fontSize: 14,
  },
  totalAmount: {
    fontSize: 14,
  },
  totalQuantities: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;






