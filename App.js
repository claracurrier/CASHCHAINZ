import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, Text, View } from 'react-native';


//  class PageBasics extends Component {
//   render() {
//     return (
//       <View>
//        <Text>Cash Chainz</Text>
//        </View>
//     );
//   }
// }


export default class ButtonBasics extends Component {
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
      
          <Button
            title="Cash Chainz"
            color="#141414"
          />
        </View>
  
        {/* <View style={styles.buttonContainer}>
          <Button
            title="Press Me"
            color="#841584"
          />
        </View> */}
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="SIGN UP"
            // color-
          />
          <Button
            onPress={this._onPressButton}
            title="LOGIN"
            // color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
