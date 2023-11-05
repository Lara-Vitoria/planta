import { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Alert,
    Switch,
    Modal,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import api from '../../../service/api';

import styles from './styles.js';
import CadastroPlantaImg from '../../../assets/svgImages/CadastroPlantaImg';

export default function CadastroPlantas({ route, navigation }) {

    const { mode, plantaId } = route.params;
    const usuarioParam = route.params.usuarioParam.usuarioLogado
    const user = route.params.usuarioParam;

    const [nome, setNome] = useState();
    const [especie, setEspecie] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [diaDeRegar, setDiaDeRegar] = useState(null);
    const [fertilizante, setFertilizante] = useState(false);
    const [luz, setLuz] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [imagens, setImagens] = useState([]);
    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Segunda', value: 'segunda' },
        { label: 'Terça', value: 'terça' },
        { label: 'Quarta', value: 'quarta' },
        { label: 'Quinta', value: 'quinta' },
        { label: 'Sexta', value: 'sexta' },
        { label: 'Sábado', value: 'sabado' },
        { label: 'Domingo', value: 'domingo' },
    ]);

    const toggleFertilizante = () => setFertilizante(estadoAnterior => !estadoAnterior);
    const toggleLuz = () => setLuz(estadoAnterior => !estadoAnterior);

    const vertical = Dimensions.get('window').height;

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

        const imagemId = imagemSelecionada ? imagemSelecionada.id : null;

        let objPlanta = {
            data: {
                nome,
                especie,
                localizacao,
                diaDeRegar,
                fertilizante,
                luz,
                imagemId: imagemId,
                usuarioId: usuarioParam.id
            }
        };
        await api.post('/plantas', objPlanta)
            .then(async (response) => {
                Alert.alert('Planta cadastrada com sucesso!');
                navigation.navigate('PagInicial', { usuario: user })
            })
            .catch(error => {
                if (error.response.data.errors) Alert.alert(error.response.data.errors?.toString())
                else Alert.alert(error.response.data.error)

            });
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
                navigation.navigate('PagInicial', { usuario: user });
            })
            .catch(error => {
                if (error.response.data.errors) Alert.alert(error.response.data.errors?.toString())
                else Alert.alert(error.response.data.error)

            });
    }

    function verificaDados() {
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
                    <Text style={styles.modalTitle}>Escolha uma imagem</Text>
                    <ScrollView contentContainerStyle={{ minHeight: vertical * 1.3, marginBottom: 20 }} style={styles.modalBorder}>
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

                    </ScrollView>
                    <TouchableOpacity style={styles.fecharModal} onPress={fecharModal}>
                        <Text style={styles.fecharModalTxt}>Fechar</Text>
                    </TouchableOpacity>
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

                    <View style={styles.dataInput}>
                        <DropDownPicker
                            placeholder="Dia de regar"
                            open={open}
                            value={diaDeRegar}
                            items={items}
                            setOpen={setOpen}
                            setValue={setDiaDeRegar}
                            setItems={setItems}
                            maxHeight={400}
                            style={{
                                backgroundColor: '#fff',
                                borderWidth: .5,
                                borderColor: '#62BA46',
                            }}
                            textStyle={{
                                backgroundColor: '#fff',
                                color: '#62BA46',
                            }}
                        />
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