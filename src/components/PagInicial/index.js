import { Text, View, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import api from '../../../service/api';

import styles from './styles.js';
import NavTab from '../NavTab';
export default function PagInicial({ route, navigation }) {

    const { usuario } = route.params;
    console.log(usuario)
    const usuarioId = usuario.id
    const [plantasHoje, setPlantasHoje] = useState([]);
    const [plantasAmanha, setPlantasAmanha] = useState([]);

    useEffect(
        () => {
            getPlanta();
        }, []);
    async function getPlanta() {
        try {
            const response = await api.get(`plantas/usuario/${usuarioId}`)
            const plantas = response?.data;

            var diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
            const hoje = new Date();
            const amanha = new Date();
            amanha.setDate(amanha.getDate() + 1);

            const plantasHoje = plantas.filter(planta => {
                return (planta.diaDeRegar === diasDaSemana[hoje.getDay()]);
            });

            const plantasAmanha = plantas.filter(planta => {
                return (planta.diaDeRegar === diasDaSemana[amanha.getDay()]);
            });

            console.log(plantasHoje)
            console.log(plantasAmanha)

            setPlantasHoje(plantasHoje);
            setPlantasAmanha(plantasAmanha);

        } catch (error) {
            Alert.alert("Erro ao buscar dados das plantas:", error);
        }
    }

    return (
        <View style={styles.containerMain}>

            <View style={styles.header}>
                <View style={styles.line} />
                <Text style={styles.overlayText}>Cronograma</Text>
            </View>

            <View style={styles.border}>
                <Text style={[styles.overlayText, styles.overlayTextHoje]}>Hoje</Text>

                <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>
                    {plantasHoje}
                    {
                        plantasHoje.map((planta, index) => (
                            <View style={[styles.border, styles.borderItem]} key={index.toString()}>
                                <Text style={styles.info}>{planta.nome}</Text>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>

            <View style={[styles.border, styles.borderAmanha]}>
                <Text style={[styles.overlayText, styles.overlayTextAmanha]}>Amanhã</Text>

                {
                    plantasAmanha.map((planta, index) => (
                        <View style={[styles.border, styles.borderItem]} key={index.toString()}>
                            <Text style={styles.info}>{planta.nome}</Text>
                        </View>
                    ))
                }
            </View>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={usuario} />
            </View>
        </View>
    );
}
