import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, AntDesign } from '@expo/vector-icons';

import ListagemPlantas from '../ListagemPlantas';
import CadastroPlantas from '../CadastroPlantas';
import Cadastro from '../Cadastro';

import styles from './styles.js';

const Tab = createBottomTabNavigator();

export default function NavTab({ navigation, usuario }) {

    const horizontal = Dimensions.get('window').width;
    const vertical = Dimensions.get('window').height;

    return (
        <Tab.Navigator
            initialRouteName="PagInicial"
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    borderWidth: .5,
                    backgroundColor: '#417A2E',
                    borderColor: '#fff',
                    top: 0,
                    left: -vertical * .246,
                    width: horizontal,
                    height: 66
                },
            }}
        >
            <Tab.Screen name="ListagemPlantas" component={ListagemPlantas}
                options={{
                    title: 'ListagemPlantas',
                    tabBarIcon: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('ListagemPlantas', { usuarioParam: usuario, executaFuncao: true })}>
                            <Feather name="list" size={32} color="#fff" />
                        </TouchableOpacity>
                    ),

                }} />

            <Tab.Screen name="CadastroPlantas" component={CadastroPlantas}
                options={{
                    title: 'CadastroPlantas',
                    tabBarButton: () => (<TouchableOpacity onPress={() => navigation.navigate('CadastroPlantas', { mode: 'create', plantaId: 0, usuarioParam: usuario })}>
                        <View style={styles.circulo} >
                            <Text style={styles.textCirculo}>+</Text>
                        </View>
                    </TouchableOpacity>)

                }} />

            <Tab.Screen name="Cadastro" component={Cadastro}
                options={{
                    title: 'Cadastro',
                    tabBarIcon: () => (
                        usuario.usuarioLogado.cargo == 'usuario'
                            ?
                            <TouchableOpacity onPress={() => navigation.navigate('Cadastro', { mode: 'edit', usuarioParam: usuario })}>
                                <AntDesign name="user" size={32} color="#fff" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => navigation.navigate('OpcoesAdmin', { usuarioParam: usuario })}>
                                <AntDesign name="user" size={32} color="#fff" />
                            </TouchableOpacity>
                    ),
                }} />
        </Tab.Navigator >
    );
}
