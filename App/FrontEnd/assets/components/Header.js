//Header.js

import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Header = () => {
    const navigation = useNavigation(); // Initialize navigation

    // Function to handle "Create" button press
    const handleCreatePress = () => {
        // Navigate to the InvoiceForm screen
        navigation.navigate('InvoiceForm');
    };

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('./../icons-and-logos/AppLogo/iOS/icons8-luigi-144(@3×).png')}
            />
            <View style={styles.buttonContainer}>
                {/* "Create" button */}
                <TouchableOpacity style={styles.button} onPress={handleCreatePress}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>

                {/* "Send" button */}
                <TouchableOpacity style={styles.button} onPress={() => console.log('Send button pressed!')}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#007bff', 
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', 
    },
    logo: {
        width: 50, 
        height: 50, 
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginLeft: 8,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default Header;