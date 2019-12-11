import React, { Component } from 'react';
import { View,Button, Text, FlatList, ActivityIndicator, StyleSheet,TouchableHighlight, TouchableOpacity,StatusBar, AsyncStorage } from 'react-native';
import api from './services/api';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { FloatingAction } from "react-native-floating-action";
import Spinner from 'react-native-loading-spinner-overlay';

import {
  //  Container,
    Logo,
    Input,
    ErrorMessage,
    // Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
  } from './styles/styleLogin';

  export default class Clientes  extends Component {
  
    constructor(props){
      super(props);
      this.state = {
        loading: true,
        dataSource:[]
       };

      api.get('/cliente').then(resp => {
        console.log("dasdasd")
        console.log(resp.data)
        this.setState({
          loading: false,
          dataSource: resp.data
         })
      }).catch(err =>{
        console.log(err)
      });
    }
    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
        dispatch: PropTypes.func,
        goBack: PropTypes.func,
      }).isRequired,
    };
    handleCreateCliente = () => {
      console.log("dsdasdsa")
      this.props.navigation.navigate('Novo Cliente');
    };
    handleEditCliente(id) {
      console.log("dsdasdsa")
      this.props.navigation.navigate('Cliente');


      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'Cliente', params:{id} }),
      //   ],
      // });
      // this.props.navigation.dispatch(resetAction);
    };
    logout = () => {
      this.props.navigation.navigate('Login');
    };
    FlatListItemSeparator = () => {
      return (
        <View style={{
           height: .5,
           width:"100%",
           backgroundColor:"rgba(0,0,0,0.5)",
          }}
        />
      );
    }
  
    renderItem=(data)=>
    <TouchableOpacity style={styles.list} onPress={()=>{
      this.props.navigation.navigate('Cliente',{id: data.item.id});}}>
      <Text style={styles.lightText}>Nome: {data.item.nome}</Text>
      <Text style={styles.lightText}>Cpf: {data.item.cpf}</Text>
    </TouchableOpacity>
      

//const Dashboard = () => (
  render() {
    // if(this.state.loading){
    //   return( 
    //     <View style={styles.loader}> 
    //       <ActivityIndicator size="large" color="#0c9"/>
    //     </View>
    // )}
    return (

      <View style={styles.container}>
          {/* <Text>Clientes</Text> */}
          <StatusBar backgroundColor="#000" barStyle="light-content" />
          <Spinner
              visible={this.state.loading}
              //textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
          />
          <FlatList
              data= {this.state.dataSource}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem= {item=> this.renderItem(item)}
              keyExtractor= {item=>item.id.toString()}
          />
            <FloatingAction
              actions={actions}
             // onPressItem={this.props.navigation.navigate('Novo Cliente')}
              onPressItem={name => {
                if(name=="Login"){
                  AsyncStorage.setItem('auth_token',"")
                }
                this.props.navigation.navigate(`${name}`)
              }}
              
            />
    </View>

    //);
    );
  }
}
 Clientes.navigationOptions = ({ navigation }) => {
  return {
    title: "Clientes",
    headerStyle: {backgroundColor: "#fff"},
    headerTitleStyle: {textAlign: "center",flex: 1},  
    // headerRight: () => (
    //   <TouchableHighlight style={styles.bt} onPress={this.handleCreateCliente}>
    //     <Text style={{color:"#fff"}}>+ Novo</Text>
    //   </TouchableHighlight>
    // ),
    // headerLeft: () => (
    //   // <Button style={styles.btv} title="Sair" onPress={this.logout}/>
      
    //   <Button
    //   title="Sair"
    //   color="#f0f0f0"
    //   backgroundColor='#DDDDDD'
    //   onPress={() => this.props.navigation.navigate('Login')}
    // />
    // ),
    //   headerRight: () => (
    //   <Button style={{marginLeft: "10",}}
    //   title="+ Novo"
    //   onPress={() => this.props.navigation.navigate('Novo Cliente')}
    //   />
    // ),
   };
  };
const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical:4,
    margin: 5,
    backgroundColor: "#fff"
   },
   bt:{
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FC6663",
    margin: 15,
    // marginHorizontal: 20,
   },
   btv:{
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    margin: 15,
    // marginHorizontal: 20,
   }
});
// Dashboard.navigationOptions = {
//   title: 'Inicio',
// }


// export default Dashboard;
const actions = [

  {
    text: "Novo Cliente",
    //icon: require("./images/ic_language_white.png"),
    name: "Novo Cliente",
    position: 1
  },
  {
    text: "Sair",
    //icon: require("./images/ic_language_white.png"),
    name: "Login",
    position: 2
  },

];