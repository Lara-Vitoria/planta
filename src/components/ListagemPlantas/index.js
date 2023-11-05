import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

import api from '../../../service/api';
import styles from './styles.js';
export default function ListagemPlantas({ route, navigation }) {

    const usuarioParam = route.params ? route.params.usuarioParam.usuarioLogado : null;
    const executaFuncao = route.params ? route.params.executaFuncao : false;
    const user = route.params ? route.params.usuarioParam : null;

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
                    plantas.length == 0
                        ? <Text style={styles.info}>Você não possui nenhuma planta cadastrada</Text>
                        :
                        plantas.map((item, index) => (
                            <TouchableOpacity key={index.toString()}
                                style={styles.border}
                                onPress={() => navigation.navigate('Planta', { usuarioParam: user, plantaId: item.id })}
                            >
                                <Text style={[styles.overlayText, styles.overlayTextNome]}>{item.nome}</Text>

                                <View style={styles.borderImg}>
                                    <Image source={{ uri: item.imagem }} style={styles.img} />
                                </View>

                                <View style={[styles.border, styles.borderItem]}>
                                    <Text style={styles.textoInfo}>{item.especie}</Text>
                                </View>

                                <View style={[styles.border, styles.borderItem]}>
                                    <Text style={styles.textoInfo}>{item.localizacao}</Text>
                                </View>
                            </TouchableOpacity>

                        ))
                }
            </ScrollView>
        </View>
    );
}