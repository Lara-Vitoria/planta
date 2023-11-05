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
    header: {
        height: 40,
        width: horizontal,
        alignItems: 'center',
        marginTop: vertical * .1,
        backgroundColor: '#62BA46',
    },
    line: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: horizontal * .9,
        position: 'absolute',
    },
    scroll: {
        minHeight: vertical * .6,
    },
    overlayText: {
        backgroundColor: '#62BA46',
        color: '#fff',
        position: 'absolute',
        top: -12,
        right: horizontal * .55,
        width: horizontal * .3,
        height: 100,
        paddingLeft: 20,
    },
    overlayTextHoje: {
        right: horizontal * .5,
        paddingLeft: 50
    },
    overlayTextAmanha: {
        right: horizontal * .5,
        paddingLeft: 32
    },
    border: {
        top: vertical * .02,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .32,
        width: horizontal * .9,
    },
    borderAmanha: {
        top: vertical * .1,
        marginBottom: 100
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
    borderItem: {
        height: vertical * .08,
        width: horizontal * .8,
        marginLeft: 20,
        marginTop: 20
    },
    circulo: {
        height: 64,
        width: 64,
        bottom: 32,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#DCE54D',
    },
    textCirculo: {
        color: '#fff',
        fontSize: 48,
        bottom: 8,
        left: 15
    },
    info: {
        color: '#fff',
        fontSize: 24,
        paddingLeft: 12,
        paddingTop: 12
    },
    icon: {
        left: horizontal * .7,
        bottom: 25
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
        color: '#62BA46',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: '#fff',
        top: -18,
        left: 32,
        width: 300,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#62BA46',
        height: 60,
        width: 320,
        left: 12,
        top: 24,
        margin: 12,
        padding: 16,
    },
    overlayTextModal: {
        backgroundColor: '#fff',
        color: '#62BA46',
        bottom: 62,
        left: 38,
        paddingLeft: 16,
        width: 120,
    },
    dataInput: {
        top: vertical * .04,
        left: horizontal * .05,
        borderWidth: .5,
        borderColor: '#62BA46',
        height: vertical * .2,
        width: horizontal * .8,
        marginBottom: 32
    },
    overlayTextData: {
        bottom: 162
    },
    quantidadeTxt: {
        color: '#62BA46',
        bottom: 50,
        left: 188,
        fontSize: 28
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: vertical * .2,
    },
    btn: {
        borderWidth: 1,
        borderColor: '#62BA46',
        height: vertical * .08,
        width: horizontal * .3,
    },
    textBtn: {
        color: '#62BA46',
        textAlign: 'center',
        paddingTop: vertical * .025,
    }
});

export default styles