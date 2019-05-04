import React from 'react';
import {  StyleSheet,
          TextInput,
          AppRegistry,
          View,
          Text,
          Button,
          DatePickerAndroid,
          TimePickerAndroid,
          ScrollView,
          KeyboardAvoidingView } from 'react-native';

export default class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      description: '',
      date: '',
      time: '',
      importance: ''
    };
  }

  static navigationOptions = {
    title: 'New task',
    headerStyle: {
      backgroundColor: '#b1b2f0',
      height: 35 
    },
    headerTintColor: '#FFF'
  };

  _setImportance = async (type) => {
    try {
      if(type == 'high') {
        this.setState({
          importance: 'High'
        });
      } else if (type == 'medium') {
        this.setState({
          importance: 'Medium'
        });
      } else if (type == 'low') {
        this.setState({
          importance: 'Low'
        });
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  _setText = async (text) => {
    try {
      console.log(text)
    } catch (e) {
      console.log("error", e)
    }
  }

  _setDateAndroid = async() => {
    try {
      let date = await DatePickerAndroid.open({
        date: new Date()
      })

      if (date.action !== DatePickerAndroid.dismissedAction) {
        const finalDate = await `${date.day}` + "/" + 
          `${date.month + 1}` + "/" + `${date.year}`;
        this.setState({
          date: finalDate
        });
      }

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  _setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = (minute < 10) ? `0${minute}` : minute;
        const h = (hour < 10) ? `0${hour}` : hour;
        this.setState({ time: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <InputText _setText={this._setText} />
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._setDateAndroid}
              title="Insert Date"
              color="#c5c1ca"
            />
          </View>
          <Text style={styles.textInput}>
            {this.state.date}
          </Text>
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._setTimeAndroid}
              title="Insert Time"
              color="#c5c1ca"
            />
          </View>
          <Text style={styles.textInput}>
            {this.state.time}
          </Text>
          
          <Text style={styles.text}>
            What is the level of importance? {this.state.importance}
          </Text>
          <ButtonChoiceImportance _setImportance={this._setImportance} />
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._setTimeAndroid}
              title="Save"
              color="#b1b2f0"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const ButtonChoiceImportance = props => {
  return (
    <View style={styles.button}>
      <Button
        onPress = {() => props._setImportance('high')}
        title="High"
        color="#f27d7d"
      />
      <Button style={styles.button}
        onPress = {() => props._setImportance('medium')}
        title="Medium"
        color="#85cdff"
      />
      <Button style={styles.button}
        onPress = {() => props._setImportance('low')}
        title="Low"
        color="#DAF7A6"
      />
    </View>
  )
}

const InputText = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Title
      </Text>
      <TextInput style={styles.textInput}>
        onChangeText = {(text) => props._setText(text)}
      </TextInput>
      <Text style={styles.text}>
        Description
      </Text>
      <TextInput style={styles.textInput}>
        onChangeText = {(text) => props._setText(text)}
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  textInput: {
    height: 40,
    width: 300, 
    borderColor: 'gray', 
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10
  },
  text: {
    height: 40,
    width: 300, 
    alignSelf: 'center',
    padding: 10
  },
  button: {
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  buttonOption: {
    height: 40,
    width: 320, 
    alignSelf: 'center',
    padding: 10,
    paddingBottom: 10
  },
});
