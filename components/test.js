import React from 'react';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import {styles} from './styles.js'

  class Test extends React.Component {

   render() {
    return (
        <SafeAreaView key="1" style={styles.slideBody}>
            <TextInput style={styles.nameInput}></TextInput>
            <TextInput style={styles.categoryInput}></TextInput>
            <TextInput style={styles.priceInput}></TextInput>
        </SafeAreaView>
    );
    }
}

 export default Test;