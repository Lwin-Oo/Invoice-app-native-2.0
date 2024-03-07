import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Header from './Header';
import { Linking } from 'react-native';
import generatePdf from '../constants/generatePdf';
<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [invoiceToDelete, setInvoiceToDelete] = useState(null); 
  const navigation = useNavigation();
=======

const Home = () => {
  const [invoices, setInvoices] = useState([]);
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb

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
<<<<<<< HEAD
=======
      // Filter out the deleted invoice from the state
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
      setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice._id !== id));
    } catch (error) {
      console.error('Error deleting invoice:', error.message);
    }
<<<<<<< HEAD
    setShowDeleteConfirmation(false); 
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirmation(true); 
    setInvoiceToDelete(id); 
  };

  const updateInvoiceStatus = async (id, newStatus) => {
    try {
      console.log('Updating invoice status:', id, newStatus);
      const response = await axios.put(`http://localhost:5000/api/invoices/${id}`, { status: newStatus });
      console.log('Invoice status updated:', response.data);
    } catch (error) {
      console.error('Error updating invoice status:', error.response.data);
      throw error;
    }
  };
  
  const handleSend = async (pdfFilePath, customerEmail, id) => {
    console.log(`Sending invoice to email ${customerEmail}, Invoice ID: ${id}`);
      
    const subject = "Invoice";
    const body = "Please find the invoice attached.";
      
    try {
      const mailtoUrl = `mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${pdfFilePath}`;

      await Linking.openURL(mailtoUrl);

      await updateInvoiceStatus(id, 'Sent');
      console.log('Invoice status updated to "Sent"');

      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to send invoice:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Invoices: {invoices.length}</Text>
        {/* Add more summary statistics here */}
      </View>
=======
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
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
      <ScrollView>
        <Text style={styles.title}>Invoice Cards</Text>
        {invoices.map((invoice) => (
          <View key={invoice._id} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.invoiceNumber}>Invoice Number: {invoice.invoiceNumber}</Text>
              <Text style={styles.customerName}>Customer Name: {invoice.customerName}</Text>
              <Text style={styles.totalAmount}>Total Amount: ${invoice.totalAmount}</Text>
              <Text style={styles.totalQuantities}>Total Quantities: {invoice.totalQuantities}</Text>
<<<<<<< HEAD
              <Text style={styles.status}> Status: {invoice.status}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(invoice._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={() => handleSend(invoice._id, invoice.customerEmail, invoice._id)}>
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />
          </View>
        ))}
      </ScrollView>
      {showDeleteConfirmation && (
        <View style={styles.deleteConfirmation}>
          <Text style={styles.confirmationText}>Are you sure you want to delete this invoice?</Text>
          <View style={styles.confirmationButtons}>
            <TouchableOpacity style={styles.confirmButton} onPress={() => handleDelete(invoiceToDelete)}>
              <Text style={styles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDeleteConfirmation(false)}>
              <Text style={styles.cancelButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
=======
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
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
=======
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
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
  },
  customerName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  totalQuantities: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00C851',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#00C851',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteConfirmation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  confirmButton: {
    backgroundColor: '#00C851',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;






<<<<<<< HEAD















=======
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
