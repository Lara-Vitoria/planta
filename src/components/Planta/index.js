import { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

import api from '../../../service/api';
import styles from './styles.js';

import NavTab from '../NavTab';
export default function Planta({ route, navigation }) {

    const usuarioParam = route.params ? route.params.usuarioParam.usuarioLogado : null;
    const plantaId = route.params ? route.params.plantaId : null;
    const user = route.params ? route.params.usuarioParam : null;

    const [planta, setPlanta] = useState({})
    const [regagem, setRegagem] = useState([]);

    const chartData = {
        labels: regagem.map((item) => {
            const dataFormatada = moment(item.dataRegou).format('DD/MMM');
            return dataFormatada
        }),
        datasets: [
            {
                data: regagem.map((item) => item.quantidade),
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(98, 186, 70, ${opacity})`,
        decimalPlaces: 0,
    };

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

            const regagemResponse = await api.get(`/regas/planta/${plantaData.id}`);
            if (regagemResponse.data[0]) {
                const data = regagemResponse.data[0].dataRegou;
                const dataFormatada = moment(data).format('DD/MMM');
                const plantaComImagemERega = {
                    ...plantaComImagem,
                    dataRegou: dataFormatada,
                    quantidade: regagemResponse.data[0].quantidade

                };
                setPlanta(plantaComImagemERega);
            } else {
                setPlanta(plantaComImagem);
            }

            setRegagem(regagemResponse.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function excluiPlanta() {
        await api.delete(`/plantas/${plantaId}`)
            .then(async (response) => {
                Alert.alert('Planta deletada com sucesso!');
                navigation.navigate('PagInicial', { usuario: user })
            })
            .catch(error => console.log(error));
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
                    {
                        planta.dataRegou
                            ? <Text style={styles.txtInfo}>{planta.dataRegou}</Text>
                            : <Text style={styles.txtInfo}>Planta ainda não regada</Text>
                    }
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
                    <BarChart
                        data={chartData}
                        width={300}
                        height={200}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        style={{
                            left: 32,
                            top: 24
                        }}
                    />
                </View>

                <View style={styles.btnGroup} >
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CadastroPlantas', { mode: 'edit', plantaId: plantaId, usuarioParam: user })}>
                        <Text style={styles.textBtn}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => excluiPlanta()}>
                        <Text style={styles.textBtn}>Exluir</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={user} />
            </View>
        </View>
    );
}
