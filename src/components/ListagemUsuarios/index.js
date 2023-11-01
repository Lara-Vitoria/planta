import { Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles.js';
import api from '../../../service/api';
import NavTab from '../NavTab';
export default function ListagemUsuarios({ route, navigation }) {
    const { usuarioParam } = route.params;

    const [usuarios, setUsuarios] = useState([]);

    useEffect(
        () => {
            console.log('Usuario:executando useffect da listagem');
            getUsuarios();
        }, []);

    async function getUsuarios() {
        await api.get(`/usuarios/${usuarioParam.cargo}/all`)
            .then(async (response) => {
                setUsuarios(response.data)
            })
            .catch(error => Alert.alert(error.response.data));
    }

    async function deletaUsuario(id) {
        await api.delete(`/usuarios/${id}`)
            .then(async (response) => {
                Alert.alert('Usuario deletado com sucesso!');
                getUsuarios();
            })
            .catch(error => Alert.alert(error.response.data));
    }

    return (
        <View style={styles.containerMain}>

            <View style={styles.header}>
                <View style={styles.line} />
                <Text style={styles.overlayText}>Usuarios</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>

                {
                    usuarios.map((usuario, index) => (
                        <View style={styles.border} key={index.toString()}>
                            <View style={[styles.border, styles.borderItem]}>
                                <Text style={styles.info}>{usuario.nome}</Text>
                            </View>

                            <View style={[styles.border, styles.borderItem]}>
                                <Text style={styles.info}>{usuario.email}</Text>
                            </View>

                            <AntDesign onPress={() => deletaUsuario(usuario.id)}
                                style={styles.icon} name="delete" size={48} color="white" />
                        </View>
                    ))
                }

            </ScrollView>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={usuarioParam} />
            </View>
        </View>
    );
}