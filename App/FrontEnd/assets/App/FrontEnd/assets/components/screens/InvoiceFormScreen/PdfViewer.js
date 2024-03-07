import React from "react";
import {View, Text, StyleSheet, Pdf} from 'react-native';

const PdfViewer = ({ uri }) => {
    return (
        <View style = {styles.container}>
            <Pdf
                source = {{ uri }}
                onLoadComplete = {(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged = {(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                }}
                onError = {(error) => {
                    console.error(error);
                }}
                onPressLink = {(uri) => {
                    console.log(`Link presses: ${uri}`);
                }}
                style={styles.pdf}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    pdf: {
      flex: 1,
      width: '100%',
    },
  });
  
  export default PdfViewer;