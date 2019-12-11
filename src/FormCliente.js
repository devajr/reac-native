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

export default class FormCliente  extends Component {

  static navigationOptions = {
    title: 'Novo Cliente',
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    nome: 'dwdwdw',
    cpf: '1111111',
    telefone: '999999998',
    endereco: '1cscsacascascascca23',
    error: '',
    success: '',
    loading: false
  };
  handleNomeChange = (nome) => {
    this.setState({ nome });
  };

  handleCpfChange = (cpf) => {
    this.setState({ cpf });
  };

  handleTelefoneChange = (telefone) => {
    this.setState({ telefone });
  };
  handleEnderecoChange = (endereco) => {
    this.setState({ endereco });

  };
  goToClientes = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Clientes' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  handleSalvarCliente = async () => {
    if (this.state.nome.length === 0 || this.state.cpf.length === 0 || this.state.telefone.length === 0|| this.state.endereco.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        this.setState({ 
        loading:true
        });
        console.log({
          nome: this.state.nome,
          cpf: this.state.cpf,
          telefone: this.state.telefone,
          endereco: this.state.endereco,
        })
        await api.post('/cliente/create', {
          nome: this.state.nome,
          cpf: this.state.cpf,
          telefone: this.state.telefone,
          endereco: this.state.endereco,
        }).then(res => {
          console.log(res)
          this.setState({ success: 'Cliente criado com sucesso! ',
          error: '',
          });
        }).catch(err =>{
          console.log(err)
        });
        setTimeout(this.goToClientes, 500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };
    goToLogin = () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  render() {
    // if(this.state.loading){
    //   return( 
    //     <View style={styles.loader}> 
    //       <ActivityIndicator size="large" color="#0c9"/>
    //     </View>
    // )}
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
        value={this.state.nome}
        onChangeText={this.handleNomeChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="CPF"
        value={this.state.cpf}
        onChangeText={this.handleCpfChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Telefone"
        value={this.state.telefone}
        onChangeText={this.handleTelefoneChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
        <Input
        placeholder="Endereco"
        value={this.state.endereco}
        onChangeText={this.handleEnderecoChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
    {/* <Button style={{backgroundColor:'#82E0B0'}} onPress={() => navigation.navigate('home') }> */}
    <Button style={{backgroundColor:'#82E0B0'}} onPress={this.handleSalvarCliente}>
      <ButtonText>
          Salvar
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