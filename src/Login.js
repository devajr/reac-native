import PropTypes from 'prop-types';
import React, { Component } from 'react';
import api from './services/api';
import { Button, ButtonText, Container, ErrorMessage, Input, SignUpLink, SignUpLinkText } from './styles/styleLogin';
import { StatusBar, AsyncStorage, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { StackActions, NavigationActions } from 'react-navigation';
// const Login = ({ navigation }) => (
  export default class Login extends Component {
    constructor(props) {
      super(props);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx")
      AsyncStorage.getItem('auth_token').then((userToken) => {
        console.log(userToken)
        this.props.navigation.navigate(userToken ? 'Clientes' : '');
      })
    } 

  
    static navigationOptions = {
      title: 'Login',
      header: null,
    }
    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
        dispatch: PropTypes.func,
      }).isRequired,
    };
  
    state = {
      email: 'deva@gmail.com',
      password: '123',
      error: '',
      spinner:false,
    };
  
    handleEmailChange = (email) => {
      this.setState({ email });
    };
  
    handlePasswordChange = (password) => {
      this.setState({ password });
    };
  
    handleCreateAccountPress = () => {
      this.props.navigation.navigate('Register');
    };
  
    handleSignInPress = async () => {
      console.log("sfcdsdsv");
      var auth=""
      if (this.state.email.length === 0 || this.state.password.length === 0) {
        //console.log("sfcdsdsv");
        this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        
      } else {
        try {
          this.setState({
            spinner: true
          });
          const response = await api.post('/login', {
            email: this.state.email,
            password: this.state.password
          }
          ).then(res => {
            auth = res.data.token_type + " " + res.data.access_token
            console.log(auth)
             AsyncStorage.setItem('auth_token', auth);
            console.log(res)
          }).catch(error => {

            console.log(error)
          });
          console.log(response);
          console.log({
            email: this.state.email,
            password: this.state.password,
          });
        
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Clientes', params: { auth } }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        } catch (_err) {
           console.log(_err)
          this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        }
      }
    };
    render() {
        return (
          <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <StatusBar hidden /> */}
                <Spinner
                  visible={this.state.spinner}
                  //textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                />
                <Input
                  placeholder="Endereço de e-mail"
                  value={this.state.email}
                  onChangeText={this.handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Input
                  placeholder="Senha"
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                />
                {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

                {/* <Button onPress={() => navigation.navigate('Register') }> */}
                
                <Button onPress={this.handleSignInPress}>
                    <ButtonText>
                        Entrar
                    </ButtonText>
                </Button>
                <Button style={{backgroundColor:'#FFC300'}}  onPress={this.handleCreateAccountPress}>
                    <ButtonText>
                        Cadastre-se
                    </ButtonText>
                </Button>
                {/* <SignUpLink style={{backgroundColor:'#FFC300'}} onPress={() => navigation.navigate('Register') }> */}
                {/* <SignUpLink onPress={this.handleCreateAccountPress }>
                    <SignUpLinkText>
                        Cadastra-se
                    </SignUpLinkText>
                </SignUpLink> */}
          </Container>

      );
    }

// Login.navigationOptions = {
//   title: 'Login',
 }
 const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF'
  // },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5
  // }
});