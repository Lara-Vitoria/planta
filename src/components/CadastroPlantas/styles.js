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
    iconImgBack: {
        top: vertical * 0.05,
        left: horizontal * 0.36,
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#62BA46'
    },
    iconImg: {
        width: 80,
        height: 80,
        top: 10,
        left: 10,
    },
    border: {
        position: 'absolute',
        top: vertical * .06,
        borderWidth: 1,
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
    dataInput: {
        width: 320,
        left: 24,
        top: 8
    },
    overlayText: {
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 28,
        paddingLeft: 16,
        width: 120,
        backgroundColor: '#62BA46',
    },
    overlaySwitch: {
        left: 8,
        top: 24
    },
    switch: {
        right: horizontal * .25,
        top: 18
    },
    small: {
        position: 'absolute',
        color: '#fff',
        fontSize: 12,
        right: horizontal * .06,
        top: vertical * .4,
    },
    btn: {
        position: 'absolute',
        top: vertical * .75,
        left: 24,
        width: 320,
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
        fontWeight: 'bold'
    },
    img: {
        top: vertical * .725,
        left: -8,
    },
    modalBorder: {
        position: 'absolute',
        top: vertical * .04,
        left: horizontal * .05,
        borderWidth: 1,
        borderColor: '#62BA46',
        height: vertical * .94,
        width: horizontal * .9,
    },
    modalTitle: {
        position: 'absolute',
        color: '#62BA46',
        fontSize: 24,
        top: vertical * .02,
        left: horizontal * .2,
        width: 300,
        backgroundColor: '#fff',
    },
    imgGroup: {
        borderWidth: 1,
        borderColor: '#62BA46',
        backgroundColor: 'transparent',
        padding: 12,
        width: 230,
        top: 32,
        left: horizontal * .17
    },
    fecharModal: {
        position: 'absolute',
        width: horizontal * .9,
        left: horizontal * .05,
        top: vertical * .92,
        height: 50,
        backgroundColor: '#62BA46',
    },
    fecharModalTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24
    }
});



export default styles 