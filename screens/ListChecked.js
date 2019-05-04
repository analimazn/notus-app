import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class ListChecked extends React.Component {
  static navigationOptions = {
    title: 'Checked',
    headerStyle: {
      backgroundColor: '#b1b2f0',
      height: 35 
    },
    headerTintColor: '#FFF'
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
