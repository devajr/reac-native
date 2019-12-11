import React, { Component } from 'react';
import { View, Text, ActivityIndicator,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  SuccessMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles/styleLogin';
import api from './services/api';

export default class Register  extends Component {

  static navigationOptions = {
    title: 'Cadastra -se',
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: 'teste',
    email: 'teste@teste',
    password: '123',
    c_password: '123',
    error: '',
    success: '',
    loading: false
  };
  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  handleCPasswordChange = (c_password) => {
    this.setState({ c_password });

  };
  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0 || this.state.c_password.length === 0|| this.state.name.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    }else if( this.state.password != this.state.c_password){
      this.state.password="";
      this.state.c_password="";
      this.setState({ error: 'Confirmação de senha incorreta!' });

    } else {
      try {
        this.setState({ 
          loading:true
          });
        console.log({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          c_password: this.state.c_password,
        })
        await api.post('/register', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          c_password: this.state.c_password,
        }).then(res => {
          console.log(res)
        
        }).catch(err =>{
          console.log(err)
        });
        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login',
        error: '',
        });
        setTimeout(this.goToLogin, 500);
        this.setState({ 
          loading:false
        });
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };
    goToLogin = () => {
      this.props.navigation.navigate('Login');
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'Login' }),
      //   ],
      // });
      // this.props.navigation.dispatch(resetAction);
    }
  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <Spinner
          visible={this.state.loading}
          //textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Input
        placeholder="Nome"
        value={this.state.name}
        onChangeText={this.handleNameChange}
        autoCapitalize="none"
        autoCorrect={false}
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
        <Input
        placeholder="Confirmação de senha"
        value={this.state.c_password}
        onChangeText={this.handleCPasswordChange}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
    {/* <Button style={{backgroundColor:'#82E0B0'}} onPress={() => navigation.navigate('home') }> */}
    <Button style={{backgroundColor:'#82E0B0'}} onPress={this.handleSignUpPress}>
      <ButtonText>
          Salvar
      </ButtonText>
    </Button>
    <Button  onPress={this.goToLogin}>
      <ButtonText>
          Voltar
      </ButtonText>
    </Button>
    </Container>
    );
  };
// Register.navigationOptions = {
//   title: 'Cadastre -se',
// }

}
const styles = StyleSheet.create({

  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },

});
//export default Register;