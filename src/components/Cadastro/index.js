import { useState } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';

import api from '../../../service/api';
import * as Validacao from '../../../Utils/Validacoes';

import styles from './styles';
import CadastroImg from '../../../assets/svgImages/CadastroImg';

export default function Cadastro({ route, navigation }) {

    const { mode, usuarioParam } = route.params;

    const [usuario, setUsuario] = useState(mode == 'edit' ? usuarioParam.nome : '');
    const [email, setEmail] = useState(mode == 'edit' ? usuarioParam.email : '');
    const [senha, setSenha] = useState(mode == 'edit' ? usuarioParam.senha : '');
    const [confirmSenha, setConfirmSenha] = useState('');

    async function verificaCampos(email, senha, confirmSenha) {
        if (Validacao.verificaEmail(email)) {
            Alert.alert("Digite um email valido");
            return;
        }

        else if (Validacao.verificaExistencia(senha)) {
            Alert.alert("Digite uma senha valida");
            return;
        }

        else if (Validacao.verificaSenhasIguais(senha, confirmSenha)) {
            Alert.alert("As senhas estão diferentes");
            return;
        }

        if (mode == 'edit') await edita();
        else if (mode == 'create') await cria();

        return;
    }

    async function cria() {
        let objUsuario = {
            nome: usuario,
            email,
            senha
        };

        await api.post('/usuarios', objUsuario)
            .then(async () => {
                console.log('entrou')
                Alert.alert('Usuario criado com sucesso!');
                navigation.navigate('Login');
            })
            .catch(error => console.log(error.response.data));
    }

    async function edita() {
        let objUsuario = {
            data: {
                nome: usuario,
                email,
                senha
            }
        };

        await api.put(`/usuarios/${usuarioParam.id}`, objUsuario)
            .then(async () => {
                console.log('entrou')
                Alert.alert('Usuario editado com sucesso!');
                navigation.navigate('PagInicial');
            })
            .catch(error => console.log(error.response.data));
    }

    return (
        <View style={styles.containerMain}>

            <View style={styles.border}>
                <SafeAreaView style={styles.inputGroup}>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(usuario) => setUsuario(usuario)}
                            value={usuario} />
                        <Text style={styles.overlayText}>Usuario</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(email) => setEmail(email)}
                            value={email} />
                        <Text style={styles.overlayText}>Email</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(senha) => setSenha(senha)}
                            value={senha} />
                        <Text style={styles.overlayText}>Senha</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(confirmSenha) => setConfirmSenha(confirmSenha)}
                            value={confirmSenha} />
                        <Text style={[styles.overlayText, { width: 140 }]}>Confirma Senha</Text>
                    </View>
                </SafeAreaView>


                <TouchableOpacity style={styles.btn}
                    onPress={() => verificaCampos(email, senha, confirmSenha)}>
                    {
                        mode == 'create'
                            ? <Text style={styles.textBtn}> Se cadastrar </Text>
                            : <Text style={styles.textBtn}> Salvar </Text>
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.img}>
                <CadastroImg />
            </View>


        </View>
    );
}