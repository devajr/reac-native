import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Clientes from './Clientes';
import FormCliente from './FormCliente';
import EditCliente from './EditCliente';
import Auth from './Auth';
import { createAppContainer, createSwitchNavigator,  } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
// import { Button } from './styles/styleLogin';
import { View,Button, Text, FlatList, ActivityIndicator, StyleSheet,TouchableHighlight, TouchableOpacity,StatusBar, AsyncStorage } from 'react-native';




const StackNavigator = createStackNavigator({
  //Login: Login,
 // Register: Register,
  Clientes: Clientes,
  "Novo Cliente": FormCliente,
  "Cliente": EditCliente,


},{
  // navigationOptions:()=>({
  //   headerLeft:<Text>abc</Text>
  // })

});

const DrawerNavigator = createDrawerNavigator({
    //"inicio": StackNavigator,
    Clientes: Clientes,
    "Novo Cliente": FormCliente,
    "Cliente": EditCliente,
},
  // {initialRouteName: 'Dashboard'
);




const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Register: Register,
  // Clientes: Clientes,
  // "Novo Cliente": FormCliente,
  // "Cliente": EditCliente,
  StackNavigator: StackNavigator,
  DrawerNavigator: DrawerNavigator,
  
}


);

const Routes = createAppContainer(SwitchNavigator);


export default Routes;