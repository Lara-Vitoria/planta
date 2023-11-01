import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';

import api from '../../../service/api';
import OpcoesAdminImg from '../../../assets/svgImages/OpcoesAdminImg';
import NavTab from '../NavTab';
export default function OpcoesAdmin({ route, navigation }) {

    const { usuarioParam } = route.params;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            maxHeight: 200,
            maxWidth: 200,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            enviarImagemParaAPI(uri)
        }
    };
    const enviarImagemParaAPI = async (imageUri) => {
        const formData = new FormData();

        formData.append('imagem', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'imagem.jpg',
        });

        await api.post('/imagens', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(async (response) => {
                Alert.alert('Imagem Cadastrada com sucesso!');
            })
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.containerMain}>

            <View style={styles.border}>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cadastro', { mode: 'edit', usuarioParam: usuarioParam })}>
                    <Text style={styles.textBtn}>
                        Meus dados
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ListagemUsuarios', { usuarioParam: usuarioParam })}>
                    <Text style={styles.textBtn}>
                        Listar Usuarios
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={pickImage} >
                    <Text style={styles.textBtn}>
                        Cadastrar imagens
                    </Text>
                </TouchableOpacity>

                <View style={styles.img}>
                    <OpcoesAdminImg />
                </View>
            </View>

            <View style={styles.navBar}>
                <NavTab navigation={navigation} usuario={usuarioParam} />
            </View>
        </View>
    );
}