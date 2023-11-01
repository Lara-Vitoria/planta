import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const horizontal = Dimensions.get('window').width;
const vertical = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: '#62BA46',
        alignItems: 'center',
    },
    border: {
        position: 'absolute',
        top: vertical * .06,
        borderWidth: .5,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .94,
        width: horizontal * .9,
    },
    btn: {
        top: vertical * .1,
        left: horizontal * 0.1,
        width: "80%",
        height: "12%",
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: .5,
        marginBottom: 56
    },
    textBtn: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'sans-serif-light'
    },
    img: {
        top: vertical * .17,
        left: horizontal * .5
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
});

export default styles