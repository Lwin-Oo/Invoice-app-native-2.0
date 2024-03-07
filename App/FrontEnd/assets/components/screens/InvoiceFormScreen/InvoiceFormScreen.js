import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import generatePdf from '../../../constants/generatePdf';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';

const InvoiceForm = () => {
  const navigation = useNavigation();
  
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', unitPrice: '' }]);
  
  const [customerEmail, setCustomerEmail] = useState('');
  const [billingStreetInfo, setBillingStreetInfo] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZIP, setBillingZIP] = useState('');

  const [shippingStreetInfo, setShippingStreetInfo] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZIP, setShippingZIP] = useState('');

  // Displaying Calendar Element
  const toggleCalendar = () => {
    setCalendarVisibility(!isCalendarVisible);
  };

  // Check if user selects the date and handle Calendar element properly
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    toggleCalendar();
  };

  // Handle Invoice Form submit functionalities
  const handleSubmit = async () => {
    // Calculate total quantities
    const totalQuantities = calculateTotalQuantities();
    
    // Calculate total amount
    const totalAmount = calculateTotalAmount().toFixed(2);
  
    // Define the status (assuming it should be 'Created' for new invoices)
    const status = 'Created';
  
    const formData = {
      invoiceNumber: invoiceNumber,
      customerName: customerName,
      date: selectedDate,
      billingStreetInfo: billingStreetInfo,
      billingCity: billingCity,
      billingState: billingState,
      billingZIP: billingZIP,
      shippingStreetInfo: shippingStreetInfo,
      shippingCity: shippingCity,
      shippingState: shippingState,
      shippingZIP: shippingZIP,
      items: items,
      totalQuantities: totalQuantities,
      totalAmount: totalAmount,
      customerEmail: customerEmail,
      status: status, // Add the status field
    };
  
    console.log(formData); // Log the form data to the terminal
  
   try {
      // Generate PDF and get the file path
      const pdfFilePath = await generatePdf(formData);
      console.log('PDF generated:', pdfFilePath);
  
      // Send form data to backend server
      const backendUrl = 'http://localhost:5000/api/invoices';
      const response = await axios.post(backendUrl, formData);
      console.log('Form data submitted successfully:', response.data);
  
      // Reload the window and navigate to the home screen
      window.location.reload();
      navigation.navigate('Home');
<<<<<<< HEAD
       //Handle success, if needed
=======
      // Handle success, if needed
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
    } catch (error) {
      if (error.response) {
        //The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error submitting form data:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        //The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }
      // Handle error, if needed
    }
  };
  

  // Add items
  const addItem = () => {
    setItems([...items, { name: '', quantity: '', unitPrice: '' }]);
  };

  // Delete items
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Handle changes in each item properly
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Calculate total quantities
  const calculateTotalQuantities = () => {
    return items.reduce((total, item) => total + parseFloat(item.quantity ||0), 0);
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + (parseFloat(item.quantity || 0) * parseFloat(item.unitPrice || 0)), 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Invoice Form</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Invoice Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter invoice number"
          value={invoiceNumber}
          onChangeText={setInvoiceNumber}
        />
      </View>

      <View style={styles.dateInputContainer}>
        <Text style={styles.inputLabel}>Date</Text>
        <TouchableOpacity onPress={toggleCalendar} style={styles.dateInput}>
          <Text style={styles.selectedDate}>{selectedDate || 'Select date'}</Text>
          <AntDesign name="calendar" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: '#007bff' } }}
        theme={{ /* Calendar theme */ }}
        hideExtraDays={true}
        style={isCalendarVisible ? styles.calendar : { display: 'none' }}
        hideArrows={false}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Customer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter customer name"
          value={customerName}
          onChangeText={setCustomerName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Customer Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter customer email"
          value={customerEmail}
          onChangeText={setCustomerEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Billing Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Info"
          value={billingStreetInfo}
          onChangeText={setBillingStreetInfo}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={billingCity}
          onChangeText={setBillingCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={billingState}
          onChangeText={setBillingState}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={billingZIP}
          onChangeText={setBillingZIP}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Info"
          value={shippingStreetInfo}
          onChangeText={setShippingStreetInfo}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingCity}
          onChangeText={setShippingCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={shippingState}
          onChangeText={setShippingState}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={shippingZIP}
          onChangeText={setShippingZIP}
          keyboardType="numeric"
        />
      </View>

      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <TextInput
            style={[styles.input, styles.itemInput]}
            placeholder="Item Name"
            value={item.name}
            onChangeText={(value) => handleItemChange(index, 'name', value)}
          />
          <TextInput
            style={[styles.input, styles.itemInput]}
            placeholder="Quantity"
            value={item.quantity}
            onChangeText={(value) => handleItemChange(index, 'quantity', value)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.itemInput]}
            placeholder="Unit Price"
            value={item.unitPrice}
            onChangeText={(value) => handleItemChange(index, 'unitPrice', value)}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.deleteItemButton} onPress={() => deleteItem(index)}>
            <AntDesign name="delete" size={20} color="#FF0000" />
          </TouchableOpacity>
        </View>
      ))}
      
      <View style={styles.totalContainer}>
        <Text>Total Quantities: {calculateTotalQuantities()}</Text>
        <Text>Total Amount: ${calculateTotalAmount().toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
        <AntDesign name="plus" size={24} color="#ffffff" />
        <Text style={styles.addItemButtonText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#333333',
    borderRadius: 8,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1, // Add border bottom
    borderBottomColor: '#cccccc', // Border color
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDate: {
    flex: 1,
    color: '#333333',
  },
  calendar: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemInput: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
  },
  deleteItemButton: {
    padding: 5,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  addItemButtonText: {
    color: '#ffffff',
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default InvoiceForm;

<<<<<<< HEAD



=======
>>>>>>> de62fc386aec93effd79397f881a369252fc03eb
