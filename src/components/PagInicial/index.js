import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DatePicker from '@dietime/react-native-date-picker';

import api from '../../../service/api';

import styles from './styles.js';
import NavTab from '../NavTab';
export default function PagInicial({ route, navigation }) {

    const usuario = route.params.usuario;
    const usuarioId = usuario.usuarioLogado.id

    const [plantasHoje, setPlantasHoje] = useState([]);
    const [plantasAmanha, setPlantasAmanha] = useState([]);
    const [dataRegou, setDataRegou] = useState();
    const [quantidade, setQuantidade] = useState('');
    const [plantaId, setPlantaId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(
        () => {
            const unsubscribe = navigation.addListener('focus', () => {
                getPlanta();
            });
            return unsubscribe;
        }, []);
    async function getPlanta() {
        try {
            const response = await api.get(`/plantas/usuario/${usuarioId}`)
            const plantas = response?.data;

            const plantasComRegagem = await Promise.all(
                plantas.map(async (planta) => {
                    try {
                        const regagemResponse = await api.get(`/regas/planta/${planta.id}`);
                        if (regagemResponse.data[0]) {
                            const plantaComRegagem = {
                                ...planta,
                                regado: regagemResponse.data[0].regado,
                            };
                            return plantaComRegagem;
                        } else {
                            const plantaComRegagem = {
                                ...planta,
                                regado: false
                            };
                            return plantaComRegagem;
                        }
                    } catch (error) {
                        console.error("Erro ao buscar informações de regagem para uma planta:", error);

                    }
                })
            );
            verificaDiaRegagem(plantasComRegagem)

        } catch (error) {
            Alert.alert("Erro ao buscar dados das plantas:", error);
        }
    }

    function verificaDiaRegagem(plantasComRegagem) {
        var diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
        const hoje = new Date();
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const plantasHoje = plantasComRegagem.filter(planta => {
            return ((planta.diaDeRegar === diasDaSemana[hoje.getDay()]) && !planta.regado);
        });

        const plantasAmanha = plantasComRegagem.filter(planta => {
            return (planta.diaDeRegar === diasDaSemana[amanha.getDay()]);
        });

        setPlantasHoje(plantasHoje);
        setPlantasAmanha(plantasAmanha);
    }

    async function adicionaRega() {

        let objRega = {
            data: {
                plantaId,
                regado: true,
                dataRegou,
                quantidade: parseInt(quantidade)
            }
        };

        await api.post('/regas', objRega)
            .then(async (response) => {
                console.log(response)
                Alert.alert('Planta regada com sucesso!');
                fecharModal();
            })
            .catch(error => console.log(error));
    }

    async function abrirModal(id) {
        setPlantaId(id)
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.containerMain}>

            <View style={styles.header}>
                <View style={styles.line} />
                <Text style={styles.overlayText}>Cronograma</Text>
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalBorder}>
                    <Text style={styles.modalTitle}>Informe os dados da rega</Text>
                    <View style={styles.dataInput}>
                        <DatePicker
                            value={dataRegou}
                            onChange={(dataRegou) => setDataRegou(dataRegou)}
                            format="dd-mm-yyyy"
                            height={150}
                            fontSize={20}
                            textColor='#62BA46'
                            startYear={2023}
                            endYear={2050}
                            markHeight={80}
                            fadeColor="#FFF"
                        />
                        <Text style={[styles.overlayTextModal, styles.overlayTextData]}>Data</Text>
                    </View>

                    <TextInput
                        style={[styles.input, { width: 150 }]}
                        onChangeText={(quantidade) => setQuantidade(quantidade)}
                        value={quantidade} />
                    <Text style={styles.overlayTextModal}>Quantidade</Text>
                    <Text style={styles.quantidadeTxt}>ml</Text>

                    <View style={styles.btnGroup}>
                        <TouchableOpacity style={[styles.btn, { borderColor: 'red', }]} onPress={fecharModal}>
                            <Text style={[styles.textBtn, { color: 'red', }]}>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={() => adicionaRega()}>
                            <Text style={styles.textBtn}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.border}>
                <Text style={[styles.overlayText, styles.overlayTextHoje]}>Hoje</Text>
                <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>
                    {
                        plantasHoje.length == 0
                            ? <Text style={[styles.info, { fontSize: 16, textAlign: 'center', marginTop: 12 }]}>Nenhuma planta a ser regada hoje</Text>
                            :
                            plantasHoje.map((planta, index) => (
                                <TouchableOpacity style={[styles.border, styles.borderItem]} key={index.toString()}
                                    onPress={() => abrirModal(planta.id)}>
                                    <Text style={styles.info}>{planta.nome}</Text>
                                    <Entypo style={styles.icon} name="water" size={24} color="white" />
                                </TouchableOpacity>

                            ))
                    }
                </ScrollView>
            </View>

            <View style={[styles.border, styles.borderAmanha]}>
                <Text style={[styles.overlayText, styles.overlayTextAmanha]}>Amanhã</Text>
                <ScrollView contentContainerStyle={[styles.scroll, { marginBottom: 20 }]}>
                    {
                        plantasAmanha.length == 0
                            ? <Text style={[styles.info, { fontSize: 16, textAlign: 'center', marginTop: 12 }]}>Nenhuma planta a ser regada amanhã</Text>
                            :
                            plantasAmanha.map((planta, index) => (
                                <TouchableOpacity style={[styles.border, styles.borderItem]} key={index.toString()}
                                    onPress={() => abrirModal(planta.id)}>
                                    <Text style={styles.info}>{planta.nome}</Text>
                                    <Entypo style={styles.icon} name="water" size={24} color="white" />
                                </TouchableOpacity>
                            ))
                    }
                </ScrollView>
            </View>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={usuario} />
            </View>
        </View>
    );
}
