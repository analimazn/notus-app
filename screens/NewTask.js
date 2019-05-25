import React from 'react'
import Config from '../settings.json'
import moment from 'moment'
import ip from "../services/ipAddress.json"

import {  Google,
          Constants } from 'expo'

import {  Alert,
          StyleSheet,
          TextInput,
          AppRegistry,
          View,
          Text,
          Button,
          Image,
          TouchableOpacity,
          DatePickerAndroid,
          TimePickerAndroid,
          ScrollView,
          KeyboardAvoidingView,
          TouchableHighlight } from 'react-native'

export default class NewTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      importance: '',
      ip: ip.ip
    }
  }

  static navigationOptions = {
    title: 'New task',
    headerStyle: {
      backgroundColor: '#b1b2f0',
      height: 35 
    },
    headerTintColor: '#FFF',
  }

  _setImportance = async (type) => {
    try {
      if(type == 'high') {
        this.setState({
          importance: 'High'
        })
      } else if (type == 'medium') {
        this.setState({
          importance: 'Medium'
        })
      } else if (type == 'low') {
        this.setState({
          importance: 'Low'
        })
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  _saveTask = async (text) => {
    try {
      let res = await fetch(`http://${this.state.ip}:5050/api/tasks`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          date: this.state.date,
          time: this.state.time,
          importance: this.state.importance,
          check: this.state.check
        }),
      })
        
      const copyTask = new Object(this.state)

      if(res.status !== 200) {
        Alert.alert('Task',
          'Please, insert valid values')
      } else {
        Alert.alert(
          'Task',
          'Do you want to insert the task into your Google calendar?',
          [
            {text: 'No', onPress: () => {
              Alert.alert('Task',
                'Your task has been saved.')
                return null
              }
            },
            {
              text: 'Yes', onPress: async () => {
              this._insertIntoCalendarGoogle(copyTask)
              }
            }
          ],
          {cancelable: false}
        )  
      }
    } catch(err) { 
      console.log("err", err)
      Alert.alert('Task', 
        'A problem ocurred, please, try again later.')
    } finally {
      this.setState({
        title: '',
        description: '',
        date: '',
        time: '',
        importance: '',
        check: false
      })
    }
  }

  _insertIntoCalendarGoogle = async (copyTask) => {
    try {
      const clientId = Config.credential_key
      const calendarId = Config.calendar_id
      const apiKey = Config.api_key
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      const date = moment(copyTask.date + ' ' + copyTask.time, "DD-MM-YYYY HH:mm").format()

     const { type, accessToken } = await Google.logInAsync({
        behavior: "web",
        scopes: [ 'https://www.googleapis.com/auth/calendar',
                  'https://www.googleapis.com/auth/calendar.events'],
        clientId: clientId
      })

      if (type == 'success') {
        let calendarResponse = await fetch(url, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'summary': copyTask.title,
            'description': copyTask.description,
            'start': {
              'dateTime': date,
            },
            'end': {
              'dateTime': date,
            },
            'reminders': {
              'useDefault': true
            },
          })
        })
        if(calendarResponse.status !== 200) {
          Alert.alert('Google Calendar', 
            'Did not possible to save, please try again later.')
        } else {
          Alert.alert('Your task has been saved into your google calendar.')  
        }
      }
    } catch(err) {
      console.log("err", err)
      Alert.alert('Google Calendar', 
        'A problem ocurred, please, try again later.')
    }
  }

  _setDateAndroid = async() => {
    try {
      let date = await DatePickerAndroid.open({
        date: new Date()
      })
      if (date.action !== DatePickerAndroid.dismissedAction) {
        const finalDate = await `${date.day}` + "/" + 
          `${date.month + 1}` + "/" + `${date.year}`
        this.setState({
          date: finalDate
        })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  _setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true,
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        const m = (minute < 10) ? `0${minute}` : minute
        const h = (hour < 10) ? `0${hour}` : hour
        this.setState({ time: `${h}:${m}` })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message)
    }
  }

  _logout = () => {
    return (
      <Logout/>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <TextInput  style={styles.textInput}
                        placeholder="Title"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({title: title})}>
            </TextInput>
            <TextInput  style={styles.textInput}
                        placeholder="Description"
                        value={this.state.description}
                        onChangeText={(description) => this.setState({description: description})}>
            </TextInput>
          </View>
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._setDateAndroid}
              title="Insert Date"
              color="#c5c1ca"
            />
          </View>
          <Text style={styles.text}>
            {this.state.date}
          </Text>
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._setTimeAndroid}
              title="Insert Time"
              color="#c5c1ca"
            />
          </View>
          <Text style={styles.text}>
            {this.state.time}
          </Text>
          <Text style={styles.text}>
            What is the level of importance? {this.state.importance}
          </Text>
          <ButtonChoiceImportance _setImportance={this._setImportance} />
          <View style={styles.buttonOption}>
            <Button 
              onPress={this._saveTask}
              title="Save"
              color="#b1b2f0"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
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
        onChangeText = {(title) => props._saveTask(title)}
      </TextInput>
      <Text style={styles.text}>
        Description
      </Text>
      <TextInput style={styles.textInput}>
        onChangeText = {(text) => props._saveTask(text)}
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
    borderColor: '#edf4f4', 
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  text: {
    height: 40,
    width: 300, 
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10
  },
  button: {
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 10
  },
  buttonOption: {
    height: 40,
    width: 300, 
    alignSelf: 'center',
    paddingBottom: 10
  },
})
