import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

var user = {
  id: '',
  name: '',
  phone: '',
};
export default class EditContact extends Component {
  constructor (props) {
    super(props);
    this.state = {
      textName: '',
      textPhone: '',
    };
  }
  _setDataList = async () => {
    var use_1 = user;
    use_1.id = Date.now().toString();
    use_1.name = this.state.textName;
    use_1.phone = this.state.textPhone;
    let key = use_1.id;
    if (use_1.name === '' || use_1.phone === '') {
      Alert.alert('Nhap day du thong tin');
    } else {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(use_1));
        Actions.mainAppScreen();
      } catch (e) {
        console.log(e);
      }
    }
  };
  _handleChangeTextName = text => {
    this.setState({ textName: text });
  };
  _handleChangeTextPhone = text => {
    this.setState({ textPhone: text });
  };
  _handleExit = () => {
    Actions.pop();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.exitTickContaine}>
          <TouchableOpacity style={{ padding: 5 }} onPress={this._handleExit}>
            <Image
              source={require('../image/exit.png')}
              style={styles.exitTickButton}
            />
          </TouchableOpacity>
          <Text style={styles.addText}>New Contact</Text>
          <TouchableOpacity style={{ padding: 5 }} onPress={this._setDataList}>
            <Image
              source={require('../image/tick.png')}
              style={styles.exitTickButton}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', flex: 45 }}>
          <Image source={require('../image/user.png')} style={styles.user} />
        </View>
        <View style={styles.textInputContainer}>
          <View style={{ flexDirection: 'row', marginLeft: 5 }}>
            <Text style={styles.label}>Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this._handleChangeTextName}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 5 }}>
            <Text style={styles.label}>Phone: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              autoCompleteType="tel"
              onChangeText={this._handleChangeTextPhone}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 270,
    marginBottom: 30,
    padding: 3,
  },
  exitTickContaine: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exitTickButton: {
    width: 35,
    height: 35,
  },
  user: {
    width: 200,
    height: 200,
  },
  textInputContainer: {
    flex: 45,
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 20,
  },
  addText : {
    fontSize : 30,
    color:'gray'
  }
});
