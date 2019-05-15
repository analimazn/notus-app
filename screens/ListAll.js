
import React from "react";
import {  FlatList, 
          StyleSheet, 
          Text, 
          View,
          Button,
          Modal,
          TouchableWithoutFeedback } from 'react-native';


export default class ListAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      text: "",
      modalVisible: false
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


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
      const tasks = await JSON.parse(res._bodyInit);
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
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableWithoutFeedback
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <FlatList
            data={this.state.tasks}
            showsVerticalScrollIndicator={true}
            keyExtractor={item => item._id}
            renderItem={({item}) =>
              <View style={styles.boxTask}>
                <Text style={styles.item}>{item.title}</Text>
                <Text style={styles.item}>{item.time}</Text>
                <Text style={styles.item}>{item.date}</Text>
              </View>
            }
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  textInput: {
    width: 400, 
    borderColor: 'gray', 
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  },
  boxTask: {
    width: 300, 
    borderColor: 'gray', 
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    margin: 10
  }
})
