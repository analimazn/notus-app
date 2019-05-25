
import React from "react"
import deleteBlueButton from "../assets/images/delete/trash-blue1.png"
import uncheckedButton from "../assets/images/uncheck/unchecked-gradient-purple.png"
import backButton from "../assets/images/back/back.png"
import ip from "../services/ipAddress.json"

import {  Alert,
          FlatList, 
          StyleSheet, 
          Text, 
          View,
          Image,
          Modal,
          TouchableOpacity,
          RefreshControl } from "react-native"

export default class ListChecked extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      taskAllInfo: {},
      modalVisible: false,
      refreshing: false,
      ip: ip.ip
    }
  }

  static navigationOptions = {
    title: 'Checked tasks',
    headerStyle: {
      backgroundColor: '#b1b2f0',
      height: 35
    },
    headerTintColor: '#FFF',
  }

  async _setModalVisible(visible, id) {
    this.setState({modalVisible: visible})
    if (id == 0) {
      this.setState({taskAllInfo: {}})
    } else {
      let task = this.state.tasks.filter(obj => obj._id == id)
      let objTask = task[0]      
      await this.setState({taskAllInfo: objTask})
    }
    
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this._setModalVisible(!this.state.modalVisible)
                }}>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  async _uncheckedTask(item) {
    try {
      let res = await fetch(`http://${this.state.ip}:5050/api/tasks/` + item._id, {
        method: 'POST',
        body: JSON.stringify({
          check: false
        })
      })
      if(res.status !== 200) {
        throw res.status
      } else {
        Alert.alert('Your task has been unchecked')
      }
    } catch(err) {
      console.log("err", err)
      Alert.alert('A problem ocurred, please, try again later.')
    }
  }

  async _deleteTask(id) {
    try {
      let res = await fetch(`http://${this.state.ip}:5050/api/tasks/` + id, {
        method: 'DELETE'
      })
      if(res.status !== 200) {
        throw res.status
      } else {
        Alert.alert('Your task has been deleted')
      }
    } catch(err) {
      console.log("err", err)
      Alert.alert('A problem ocurred, please, try again later.')
    }
  }

  _onRefresh = async () => {
    this.setState({refreshing: true})
    await this.componentDidMount()
    this.setState({refreshing: false})
  }

  _logout = () => {
    return (
      <Logout/>
    )
  }
  
  async componentDidMount() {
    try {
      const res = await fetch(`http://${this.state.ip}:5050/api/tasks`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let tasks = await JSON.parse(res._bodyInit)
      tasks.forEach(item => {
        let date = new Date(item.date).toUTCString()
        date = date.replace("GMT","")
        var importance = ""
        if (item.importance == 3) {
          importance = "Low"
        } else if (item.importance == 2) {
          importance = "Medium"
        } else if (item.importance == 1) {
          importance = "High"
        }
        let description = item.description.toLowerCase()
        let uppercaseFirstLetter = description.charAt(0).toUpperCase()
        let stringWithoutFirstLetter = description.slice(1)
        let upDescription =  uppercaseFirstLetter + stringWithoutFirstLetter
        
        item.importance = importance
        item.date = date
        item.title = item.title.toUpperCase()
        item.description = upDescription
      })
      let validTasks = await tasks.filter(item => item.check == true)
      this.setState({tasks: validTasks})
    } catch(err) { 
      console.log("err", err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          presentationStyle="pageSheet"
          position="bottom"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this._setModalVisible(!this.state.modalVisible, 0)
          }}>
          <View style={styles.containerTask}>
            <View style={styles.containerInfoTask}>
              <View style={styles.text}>
                <Text style={styles.textTitle}>{this.state.taskAllInfo.title}</Text>
                <Text style={styles.textTitle}>Description:</Text> 
                <Text style={styles.text}>{this.state.taskAllInfo.description}</Text>
                <Text style={styles.textTitle}>When:</Text>
                <Text style={styles.text}>{this.state.taskAllInfo.date}</Text>
                <Text style={styles.textTitle}>Importance:</Text> 
                <Text style={styles.text}>{this.state.taskAllInfo.importance}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this._setModalVisible(!this.state.modalVisible, 0)
              }}>
              <Image
                style={styles.button}
                source={backButton}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={this.state.tasks}
          showsVerticalScrollIndicator={true}
          keyExtractor={item => item._id}
          renderItem={ ({ item }) =>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  this._setModalVisible(true, item._id)
                }}>
                <View style={styles.containerTitle}>
                  <TouchableOpacity  
                    onPress={() => {
                      this._uncheckedTask(item)
                    }}>
                    <Image
                      style={styles.button}
                      source={uncheckedButton}
                    />
                  </TouchableOpacity>
                  
                  <View style={styles.containerText}>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                  
                   <TouchableOpacity onPress={()=>
                      Alert.alert(
                        'Delete',
                        'Do you want to delete the task?',
                        [
                          {text: 'Cancel', onPress: () => {return null}},
                          {text: 'Yes', onPress: () => {
                            this._deleteTask(item._id)
                          }},
                        ],
                        {cancelable: false}
                      )  
                      }>
                      <Image
                        style={styles.button}
                        source={deleteBlueButton}
                      />
                  </TouchableOpacity>

                </View>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  containerTitle: {
    flexDirection: 'row',
    margin: 10,
    alignSelf: 'auto',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#edf4f4'
  },
  containerText: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: 300
  },
  text: {
    fontSize: 14,
    color: 'gray',
    padding: 10,
    textAlign: 'justify'
  },
  textTitle: {
    fontSize: 16,
    color: 'gray',
    padding: 10,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  modalContainer: {
    width: 400, 
    alignSelf: 'center',
    padding: 10,
  },
  containerTask: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center',
  },
  containerInfoTask: {
    alignSelf: 'auto',
    borderWidth: 1,
    borderColor: '#edf4f4',
    margin: 10,
  },
  button: {
    width: 20,
    height: 20,
    margin: 10,
    justifyContent: 'flex-end'
  }
})
