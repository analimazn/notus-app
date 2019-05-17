
import React from "react";
import deleteBlueButton from "../assets/images/trash-blue1.png";
import checkButton from "../assets/images/check.png";
import maximizeButton from "../assets/images/maximize.png";
import checkGradientButton from "../assets/images/check-gradient1.png";
import nextButton from "../assets/images/next.png";
import backButton from "../assets/images/back.png";

import {  Alert,
          FlatList, 
          StyleSheet, 
          Text, 
          View,
          Image,
          Button,
          Modal,
          TouchableOpacity,
          RefreshControl } from "react-native";

export default class ListAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      taskAllInfo: {},
      modalVisible: false,
      refreshing: false,
    }
  }

  static navigationOptions = {
    title: 'All tasks',
    headerStyle: {
      backgroundColor: '#b1b2f0',
      height: 35
    },
    headerTintColor: '#FFF'
  };

  async _setModalVisible(visible, id) {
    this.setState({modalVisible: visible});
    if (id == 0) {
      this.setState({taskAllInfo: {}})
    } else {
      let task = this.state.tasks.filter(obj => obj._id == id);
      let objTask = task[0];      
      await this.setState({taskAllInfo: objTask});
    }
    
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this._setModalVisible(!this.state.modalVisible);
                }}>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  async _checkTask() {
    console.log('check');
    return false;
  }

  async _deleteTask() {
    console.log('delete');
    return false;
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    await this.componentDidMount();
    this.setState({refreshing: false});
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://192.168.0.10:5050/api/tasks", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let tasks = await JSON.parse(res._bodyInit);
      tasks.forEach(item => {
        item.title = item.title.toUpperCase();
        item.description = item.description.toLowerCase();
      })
      console.log(tasks)
      this.setState({tasks});

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
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.containerTask}>
            <View style={styles.modalContainer}>
              <View style={styles.containerInfoTask}>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>{this.state.taskAllInfo.title}</Text>
                  <Text style={styles.textTitle}>Description:</Text> 
                  <Text style={styles.text}>{this.state.taskAllInfo.description}</Text>
                  <Text style={styles.textTitle}>Time:</Text>
                  <Text style={styles.text}>{this.state.taskAllInfo.time}</Text>
                  <Text style={styles.textTitle}>Date:</Text>
                  <Text style={styles.text}>{this.state.taskAllInfo.date}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this._setModalVisible(!this.state.modalVisible, 0);
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
                  this._setModalVisible(true, item._id);
                }}>
                <View style={styles.containerTitle}>
                  <TouchableOpacity onPress={this._checkTask}>
                    <Image
                      style={styles.button}
                      source={checkButton}
                    />
                  </TouchableOpacity>
                  
                  <View style={styles.containerText}>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                  
                  <TouchableOpacity onPress={this._deleteTask}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10
  },
  containerTitle: {
    flexDirection: 'row',
    padding: 10,
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
    fontSize: 18,
    color: 'gray',
    padding: 10,
    textAlign: 'justify'
  },
  textTitle: {
    fontSize: 18,
    color: 'gray',
    padding: 10,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  modalContainer: {
    width: 400, 
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  containerTask: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center',
  },
  containerInfoTask: {
    alignSelf: 'auto',
    borderWidth: 1,
    borderColor: '#edf4f4'
  },
  button: {
    width: 25,
    height: 25,
    margin: 10,
    justifyContent: 'flex-end'
  }
})
