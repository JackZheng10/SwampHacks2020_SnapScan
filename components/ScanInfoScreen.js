import React from 'react';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import {styles} from './styles.js'

var testData= [{name:"", category:"", price:""}, ]
  class Test extends React.Component {

   render() {
    return (
        <View key="2" style={styles.slideBody}>
            <Text>something</Text>
        </View>
    );
    }
}

 export default Test;