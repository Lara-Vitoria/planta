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
    overlayText: {
        backgroundColor: '#62BA46',
        color: '#fff',
        position: 'absolute',
        top: -12,
        right: horizontal * .5,
        width: horizontal * .35,
        height: 100,
        paddingLeft: 20,
    },
    overlayTextNome: {
        width: horizontal * .25,
        right: horizontal * .07,
        paddingLeft: 30
    },
    scroll: {
        minHeight: vertical,
        flexDirection: 'row',
        width: horizontal * 1
    },
    border: {
        top: -32,
        left: 32,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .32,
        width: horizontal * .4,
        marginTop: 48,
        marginRight: 32
    },
    borderImg: {
        position: 'absolute',
        top: 24,
        left: 22,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',

        height: vertical * .12,
        width: horizontal * .3,
    },
    borderItem: {
        height: vertical * .04,
        width: horizontal * .3,
        top: 135,
        left: 24,
        marginTop: 20
    },
    img: {
        width: 80,
        height: 80,
        left: 16,
        top: 8
    },
    textoInfo: {
        color: '#fff',
        left: 12,
        top: 4
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
});

export default styles