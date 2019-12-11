import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import api from './services/api';
import { StatusBar, AsyncStorage } from 'react-native';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
  } from './styles/styleLogin';

  export default class Dashboard  extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: "Source Listing",
        headerStyle: {backgroundColor: "#fff"},
        headerTitleStyle: {textAlign: "center",flex: 1}
       };
      };
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
    // static navigationOptions = {
    //   title: 'Inicio',
    // }

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
<TouchableOpacity style={styles.list}>
  <Text style={styles.lightText}>Nome: {data.item.nome}</Text>
  <Text style={styles.lightText}>Cpf: {data.item.cpf}</Text>
</TouchableOpacity>
      

//const Dashboard = () => (
  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#0c9"/>
        </View>
    )}
    return (
      <Container >
          <Text>Clientes</Text>
          <FlatList
              data= {this.state.dataSource}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem= {item=> this.renderItem(item)}
              keyExtractor= {item=>item.id.toString()}
          />
    </Container>

    //);
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
    // backgroundColor: "#fff"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff"
   },
  list:{
    paddingVertical:4,
    margin: 1,
    
    // backgroundColor: "#fff"
   }
});
// Dashboard.navigationOptions = {
//   title: 'Inicio',
// }


// export default Dashboard;