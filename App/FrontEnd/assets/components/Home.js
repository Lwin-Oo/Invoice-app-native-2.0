import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

import Header from './Header';

const Home = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices: ', error.message);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
        <Text style={styles.title}>Invoice Cards</Text>
        {invoices.map((invoice) => (
          <View key={invoice._id} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.invoiceNumber}>Invoice Number: {invoice.invoiceNumber}</Text>
              <Text style={styles.totalAmount}>Total Amount: ${invoice.totalAmount}</Text>
              <Text style={styles.totalQuantities}>Total Quantities: {invoice.totalQuantities}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    padding: 16,
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  totalAmount: {
    fontSize: 16,
    color: '#666666',
  },
  totalQuantities: {
    fontSize: 16,
    color: '#666666',
  },
});

export default Home;



