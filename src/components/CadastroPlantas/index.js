import { Text, View, TouchableOpacity, TextInput, SafeAreaView, Alert, Switch, Modal, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import * as Validacao from '../../../Utils/Validacoes';
import api from '../../../service/api';

import styles from './styles.js';
import CadastroPlantaImg from '../../../assets/svgImages/CadastroPlantaImg';

export default function CadastroPlantas({ route, navigation }) {

    const { mode, plantaId, usuarioParam } = route.params;

    const [nome, setNome] = useState();
    const [especie, setEspecie] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [diaDeRegar, setDiaDeRegar] = useState('');
    const [fertilizante, setFertilizante] = useState(false);
    const [luz, setLuz] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [imagens, setImagens] = useState([]);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    const toggleFertilizante = () => setFertilizante(estadoAnterior => !estadoAnterior);
    const toggleLuz = () => setLuz(estadoAnterior => !estadoAnterior);

    useEffect(
        () => {
            getPlantasImg();
            if (mode == 'edit') getPlanta();
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

            setNome(plantaData.nome);
            setEspecie(plantaData.especie);
            setLocalizacao(plantaData.localizacao);
            setDiaDeRegar(plantaData.diaDeRegar);
            setFertilizante(plantaData.fertilizante);
            setLuz(plantaData.luz);
            setImagemSelecionada(plantaComImagem)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getPlantasImg() {
        await api.get(`/imagens/all`)
            .then(async (response) => {
                setImagens(response.data)
            })
            .catch(error => console.log(error.response.data));
    }
    async function realizaCadastro() {
        let objPlanta = {
            data: {
                nome,
                especie,
                localizacao,
                diaDeRegar,
                fertilizante,
                luz,
                imagemId: imagemSelecionada.id,
                usuarioId: usuarioParam.id
            }
        };

        await api.post('/plantas', objPlanta)
            .then(async (response) => {
                Alert.alert('Planta cadastrada com sucesso!');
                navigation.navigate('PagInicial', { usuario: usuarioParam })
            })
            .catch(error => console.log(error));
    }

    async function realizaEdicao() {
        let objPlanta = {
            data: {
                nome,
                especie,
                localizacao,
                diaDeRegar,
                fertilizante,
                luz,
            }
        };

        await api.put(`/plantas/${plantaId}`, objPlanta)
            .then(async () => {
                Alert.alert('Planta editada com sucesso!');
                navigation.navigate('PagInicial', { usuario: usuarioParam });
            })
            .catch(error => console.log(error.response.data));
    }

    function verificaDados() {
        if (Validacao.verificaExistencia(nome)) {
            Alert.alert("Preencha o nome");
            return;
        }

        if (Validacao.verificaExistencia(especie)) {
            Alert.alert("Preencha a espécie");
            return;
        }

        if (Validacao.verificaExistencia(localizacao)) {
            Alert.alert("Preencha a localizacao");
            return;
        }

        if (Validacao.verificaDiaSemana(diaDeRegar)) {
            Alert.alert("Preencha os campos");
            return;
        }

        if (mode == 'edit') realizaEdicao();
        else if (mode == 'create') realizaCadastro();
    }

    async function abrirModal() {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    const selecionarImagem = (imagem) => {
        setImagemSelecionada(imagem);
        fecharModal();
    };

    return (
        <View style={styles.containerMain}>

            <View style={styles.border}>

                <View style={styles.iconImgBack}>
                    <View style={styles.iconImg}>
                        {
                            imagemSelecionada
                                ? <Image
                                    source={{ uri: imagemSelecionada.imagem }}
                                    style={{ width: 56, height: 56, borderRadius: 50, }}
                                />
                                :
                                <Feather name="image" size={56} color="#fff" onPress={abrirModal} />
                        }
                    </View>
                </View>

                <Modal visible={modalVisible} animationType="slide">
                    <View style={styles.modalBorder}>
                        <Text style={styles.modalTitle}>Escolha uma imagem</Text>

                        {
                            imagens.map((imagem, index) => (
                                <View style={styles.imgGroup} key={index.toString()}>
                                    <TouchableOpacity onPress={() => selecionarImagem(imagem)}>
                                        <Image
                                            source={{ uri: imagem.imagem }}
                                            style={{ width: 200, height: 200 }}
                                        />

                                    </TouchableOpacity>
                                </View>
                            ))
                        }

                        <TouchableOpacity style={styles.fecharModal} onPress={fecharModal}>
                            <Text style={styles.fecharModalTxt}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <SafeAreaView style={styles.inputGroup}>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(nome) => setNome(nome)}
                            value={nome} />
                        <Text style={styles.overlayText}>Nome</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(especie) => setEspecie(especie)}
                            value={especie} />
                        <Text style={styles.overlayText}>Espécie</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(localizacao) => setLocalizacao(localizacao)}
                            value={localizacao} />
                        <Text style={styles.overlayText}>Localização</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(diaRegar) => setDiaDeRegar(diaRegar)}
                            value={diaDeRegar} />
                        <Text style={styles.overlayText}>Dia de regar</Text>
                    </View>

                    <View>
                        <Text style={[styles.overlayText, styles.overlaySwitch]}>Fertilizante</Text>
                        <Switch style={[styles.switch]}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={fertilizante ? '#707070' : '#f4f3f4'}
                            onValueChange={toggleFertilizante}
                            value={fertilizante}
                        />
                    </View>

                    <View>
                        <Text style={[styles.overlayText, styles.overlaySwitch]}>Luz</Text>
                        <Switch style={[styles.switch]}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={luz ? '#707070' : '#f4f3f4'}
                            onValueChange={toggleLuz}
                            value={luz}
                        />
                    </View>
                </SafeAreaView>
                {
                    mode == 'edit'
                        ? <TouchableOpacity style={styles.btn} onPress={() => verificaDados()}>
                            <Text style={styles.textBtn}>
                                Editar
                            </Text>
                        </TouchableOpacity>
                        : <TouchableOpacity style={styles.btn} onPress={() => verificaDados()}>
                            <Text style={styles.textBtn}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>

                }

                <View style={styles.img}>
                    <CadastroPlantaImg />
                </View>
            </View>
        </View>
    );
}