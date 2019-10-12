import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text
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
      textName: this.props.navigation.getParam('name'),
      textPhone: this.props.navigation.getParam('phone'),
    };
  }
  _handleExit = () => {
    Actions.pop();
  };
  _handleOk = async () => {
    var use_1 = user;
    use_1.id = this.props.navigation.getParam('id');
    use_1.name = this.state.textName;
    use_1.phone = this.state.textPhone;
    let key = use_1.id;
    if (use_1.name === '' || use_1.phone === '') {
      // eslint-disable-next-line no-undef
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
  _handleName = text => {
    this.setState({ textName: text });
  };
  _handlePhone = text => {
    this.setState({ textPhone: text });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.exitTickContainer}>
          <TouchableOpacity style={{ padding: 5 }} onPress={this._handleExit}>
            <Image
              source={require('../image/exit.png')}
              style={styles.exitTickButton}
            />
          </TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
          <TouchableOpacity style={{ padding: 5 }} onPress={this._handleOk}>
            <Image
              source={require('../image/tick.png')}
              style={styles.exitTickButton}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', flex: 45 }}>
          <Image source={require('../image/user.png')} style={styles.user} />
        </View>
        <View style={{ flex: 45, alignItems: 'center' }}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              defaultValue={this.state.textName}
              onChangeText={this._handleName}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              autoCompleteType="tel"
              defaultValue={this.state.textPhone}
              onChangeText={this._handlePhone}
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
  exitTickContainer: {
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
    marginTop: 50,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  editText : {
    fontSize : 30,
    color:'gray',
  }
});
