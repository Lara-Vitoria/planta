import React from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../../service/api';
import styles from './styles.js';
export default function ListagemPlantas({ route, navigation }) {

    const usuarioParam = route.params ? route.params.usuarioParam : null;
    const executaFuncao = route.params ? route.params.executaFuncao : false;

    const [plantas, setPlantas] = useState([]);

    useEffect(
        () => {
            if (executaFuncao) getPlantas();
        }, []);


    async function getPlantas() {
        try {
            const response = await api.get(`/plantas/usuario/${usuarioParam.id}`);
            const plantasData = response?.data;

            const plantasComImagens = await Promise.all(
                plantasData.map(async (planta) => {
                    const imagemResponse = await api.get(`/imagens/${planta.imagemId}`);
                    const plantaComImagem = {
                        ...planta,
                        imagem: imagemResponse.data.imagem,
                    };
                    return plantaComImagem;
                })
            );

            setPlantas(plantasComImagens);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <View style={styles.containerMain}>

            <View style={styles.header}>
                <View style={styles.line} />
                <Text style={styles.overlayText}>Minhas plantas</Text>
            </View>

            <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>

                {
                    plantas.map((planta, index) => (
                        <TouchableOpacity key={index.toString()}
                            style={styles.border}
                            onPress={() => navigation.navigate('Planta', { usuarioParam: usuarioParam, plantaId: planta.id })}>
                            <Text style={[styles.overlayText, styles.overlayTextNome]}>{planta.nome}</Text>

                            <View style={styles.borderImg}>
                                <Image
                                    source={{ uri: planta.imagem }}
                                    style={styles.img}
                                />
                            </View>

                            <View style={[styles.border, styles.borderItem]}>
                                <Text style={styles.textoInfo}>{planta.especie}</Text>
                            </View>

                            <View style={[styles.border, styles.borderItem]}>
                                <Text style={styles.textoInfo}>{planta.localizacao}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>

        </View>
    );
}