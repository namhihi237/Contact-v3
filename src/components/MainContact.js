import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Linking
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import SearchInput from 'react-native-search-filter';
export default class MainContact extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataList: [],
    };
  }
  
  async componentDidMount() {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async inkey => {
        console.log(inkey);
        let user = JSON.parse(await AsyncStorage.getItem(inkey));
        let data = this.state.dataList.concat(user);
        this.setState({ dataList: data });
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    var {height, width} = Dimensions.get('window');
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.search}>
          <Image
            source={require('../image/search.png')}
            style={styles.searchButton}
          />
          <SearchInput
            style={styles.searchInput}
            placeholder="Type a message to search"
          />
        </View>
        <View style={{ flex: 84 ,marginBottom:1}}>
          <FlatList
            data={this.state.dataList}
            extraData={this.state.dataList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View style={{ height: height*0.84/6 , backgroundColor :"#4567",borderColor:'black',borderWidth:1}}>
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        Actions.editContactScreen({
                          name: item.name,
                          phone: item.phone,
                          id: item.id,
                        });
                      }}>
                      <Image
                        source={require('../image/user.png')}
                        style={styles.userButton}
                      />
                    </TouchableOpacity>
                    <Text style={styles.textName}>{item.name}</Text>
                    <TouchableOpacity onPress={_dialNumber = () => {
                        let numberPhone = 'tel:${' + item.phone + '}';
                        Linking.openURL(numberPhone);
                      }}>
                      <Image
                        source={require('../image/phone.png')}
                        style={styles.phoneButton}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
          <FloatingAction
          onPressMain ={()=>{Actions.addContactScreen();}}
          showBackground = {false}
          ></FloatingAction>
      </View>
    );
  }

   _toAddContact = () => {
    Actions.addContactScreen();
  };
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    marginTop : 25,

  },
  search: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 1,
    flexDirection: 'row',
    flex: 6,
    alignItems: 'center',
    borderRadius: 3,
  },
  searchButton: {
    width: 25,
    height: 25,
    marginTop: 3,
    marginLeft: 2,
  },
  searchInput: {
    width: 300,
    height:45
  },
  addButton: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  userButton: {
    width: 35,
    height: 35,
    marginBottom: 5
  },
  textName: {
    textAlign: 'center',
    marginLeft: 25,
    fontSize: 23
  },
  phoneButton: {
    height: 35,
    width: 35,
    marginRight: 3
  },
});
