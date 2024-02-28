import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Header';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Invoice</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.invoiceText}>Invoice Number: 123456</Text>
          <Text style={styles.invoiceText}>Customer Name: Lwin Oo</Text>
          <Text style={styles.invoiceText}>Date: 2024-02-19</Text>
          {/* Add placeholders for other data */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeaderText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  invoiceText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Home;


