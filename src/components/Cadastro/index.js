import { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import api from '../../../service/api';

import styles from './styles';
import CadastroImg from '../../../assets/svgImages/CadastroImg';

export default function Cadastro({ route, navigation }) {

    const { mode } = route.params;
    const usuarioParam = route.params.usuarioParam ? route.params.usuarioParam.usuarioLogado : null;
    const user = route.params.usuarioParam;

    const [usuario, setUsuario] = useState(mode == 'edit' ? usuarioParam.nome : '');
    const [email, setEmail] = useState(mode == 'edit' ? usuarioParam.email : '');
    const [senha, setSenha] = useState(mode == 'edit' ? usuarioParam.senha : '');
    const [confirmSenha, setConfirmSenha] = useState('');

    async function verificaCampos() {
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
                Alert.alert('Usuario criado com sucesso!');
                navigation.navigate('Login');
            })
            .catch(error => Alert.alert(error.response.data.errors.toString()));
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
                Alert.alert('Usuario editado com sucesso!');
                navigation.navigate('PagInicial', { usuario: user });
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
                    onPress={() => verificaCampos()}>
                    {
                        mode == 'create'
                            ? <Text style={styles.textBtn}> Se cadastrar </Text>
                            : <Text style={styles.textBtn}> Salvar </Text>
                    }
                </TouchableOpacity>

                {
                    mode == 'edit'
                        ? <TouchableOpacity style={[styles.btn, styles.btnSair]}
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textBtn}> Sair </Text>
                        </TouchableOpacity>
                        : null
                }

            </View>

            <View style={styles.img}>
                <CadastroImg />
            </View>


        </View>
    );
}