import React, { Component } from 'react';
import { View, Text, AsyncStorage} from 'react-native';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx")
    AsyncStorage.getItem('auth_token').then((userToken) => {
      console.log(userToken)
      this.props.navigation.navigate(userToken ? 'Clientes' : 'Login');
    })
  } 

}

