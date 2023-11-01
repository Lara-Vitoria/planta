import { Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';

import ListagemPlantas from '../ListagemPlantas';
import PagInicial from '../PagInicial';
import Cadastro from '../Cadastro';
import api from '../../../service/api';
import styles from './styles.js';

import NavTab from '../NavTab';
export default function Planta({ route, navigation }) {

    const usuarioParam = route.params ? route.params.usuarioParam : null;
    const plantaId = route.params ? route.params.plantaId : null;

    const [planta, setPlanta] = useState({})

    useEffect(
        () => {
            getPlanta();
        }, []);

    async function getPlanta() {
        try {
            const response = await api.get(`/plantas/${plantaId}`);
            const plantaData = response.data;

            const imagemResponse = await api.get(`/imagens/${plantaData.imagemId}`);
            const plantaComImagem = {
                ...plantaData,
                imagem: imagemResponse.data.imagem,
            };

            setPlanta(plantaComImagem);
            console.log(planta)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function excluiPlanta(id) {
        await api.delete(`/plantas/${id}`)
            .then(async (response) => {
                Alert.alert('Usuario deletado com sucesso!');
                console.log(usuarioParam)
                navigation.navigate('PagInicial', { usuario: usuarioParam })
            })
            .catch(error => Alert.alert(error.response.data));
    }

    return (
        <View style={styles.containerMain}>

            <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>
                <View style={styles.border}>
                    <Text style={[styles.overlayText, styles.overlayTextNome]}>{planta.nome}</Text>

                    <View style={styles.borderImg}>
                        <Image
                            source={{ uri: planta.imagem }}
                            style={styles.img}
                        />
                    </View>

                    <View style={styles.borderInfo}>

                        <View style={[styles.border, styles.borderItemInfo]}>
                            <Text style={styles.txtInfo}>{planta.localizacao}</Text>
                        </View>

                        <View style={[styles.border, styles.borderItemInfo]}>
                            <Text style={styles.txtInfo}>{planta.especie}</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.border, styles.borderItem]}>
                </View>

                <View style={[styles.border, styles.borderItem]}>
                    {
                        planta.fertilizante
                            ? <Text style={styles.txtInfo}>Possui fertilizante</Text>
                            : <Text style={styles.txtInfo}>Não possui fertilizante</Text>
                    }

                </View>

                <View style={[styles.border, styles.borderItem]}>
                    {
                        planta.luz
                            ? <Text style={styles.txtInfo}>Na luz</Text>
                            : <Text style={styles.txtInfo}>Sem luz</Text>
                    }
                </View>

                <View style={[styles.border, styles.borderGarfico]}>
                </View>

                <View style={styles.btnGroup} >
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CadastroPlantas', { mode: 'edit', plantaId: plantaId, usuarioParam: usuarioParam })}>
                        <Text style={styles.textBtn}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => excluiPlanta(planta.id)}>
                        <Text style={styles.textBtn}>Exluir</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={usuarioParam} />
            </View>
        </View>
    );
}
