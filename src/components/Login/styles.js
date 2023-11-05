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
    inputGroup: {
        position: 'absolute',
        top: vertical * .2,
    },
    input: {
        backgroundColor: '#62BA46',
        borderWidth: .5,
        borderColor: '#fff',
        color: '#fff',
        height: 60,
        width: 320,
        left: 12,
        margin: 12,
        padding: 16,
    },
    overlayText: {
        position: 'absolute',
        top: 0,
        left: 28,
        paddingLeft: 16,
        width: 80,
        backgroundColor: '#62BA46',
        color: '#fff'
    },
    img: {
        top: 340,
        left: 40
    },
    btn: {
        position: 'absolute',
        top: vertical * .7,
        left: horizontal * 0.1,
        width: "80%",
        height: "6%",
        justifyContent: 'center',
        borderColor: '#fff',
        borderWidth: .5,
    },
    textBtn: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'sans-serif-light'
    },
    textGoup: {
        position: 'absolute',
        top: vertical * .8,
        right: horizontal * .2,
        alignItems: 'center',
    },
    textGoupAlign: {
        flexDirection: 'row',
    },
    text: {
        color: '#fff',
        fontFamily: 'sans-serif-light'
    },
    textDestaque: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default styles