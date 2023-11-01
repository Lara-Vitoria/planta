import React, { useState } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import LoginImg from '../../../assets/svgImages/LoginImg';

import api from '../../../service/api';
import * as Validacao from '../../../Utils/Validacoes'
export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function realizaLogin() {
        let objUsuario = {
            usuario: {
                email,
                senha: password
            }
        };

        await api.post('/usuarios/login', objUsuario)
            .then(async (response) => {
                usuarioResponse = response.data
                navigation.navigate('PagInicial', { usuario: usuarioResponse })
            })
            .catch(error => Alert.alert(error.response.data));
    }

    function verificaDados() {
        if (Validacao.verificaDadosLogin(email, password)) {
            Alert.alert("Preencha os campos");
            return;
        }

        realizaLogin();
    }

    return (
        <View style={styles.containerMain}>

            <View style={styles.border}>
                <SafeAreaView style={styles.inputGroup}>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(email) => setEmail(email)} />
                        <Text style={styles.overlayText}>Email</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(senha) => setPassword(senha)} />
                        <Text style={styles.overlayText}>Senha</Text>
                    </View>
                </SafeAreaView>

                <Text style={styles.img}>
                    <LoginImg />
                </Text>


                <Text style={styles.small}>
                    Esqueceu a senha?
                </Text>
                <TouchableOpacity style={styles.btn} onPress={() => verificaDados()}>
                    <Text style={styles.textBtn}>
                        Entrar
                    </Text>
                </TouchableOpacity>

                <View style={styles.textGoup}>
                    <Text style={styles.text}>
                        Não possui cadastro?
                    </Text>

                    <View style={styles.textGoupAlign}>
                        <Text style={styles.textDestaque} onPress={() => navigation.navigate('Cadastro', { mode: 'create' })}>
                            Clique aqui
                        </Text>
                        <Text style={styles.text}>
                            para se cadastrar
                        </Text>
                    </View>

                </View>
            </View>
        </View>
    );
}