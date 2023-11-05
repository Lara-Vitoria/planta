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
        right: horizontal * .3,
        paddingLeft: 30
    },
    plantasGroup: {
        flexDirection: 'row',
    },
    scroll: {
        minHeight: vertical,
    },
    border: {
        top: -32,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .32,
        width: horizontal * .8,
        marginTop: 48,
    },
    borderImg: {
        position: 'absolute',
        top: 24,
        left: 22,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',

        height: vertical * .12,
        width: horizontal * .68,
    },
    borderItem: {
        height: vertical * .04,
        width: horizontal * .68,
        top: 135,
        left: 24,
        marginTop: 20
    },
    img: {
        width: 80,
        height: 80,
        left: horizontal * .25,
        top: 8
    },
    textoInfo: {
        color: '#fff',
        left: 12,
        top: 4,
        textAlign: 'center'
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
});

export default styles