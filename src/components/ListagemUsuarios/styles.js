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
        right: horizontal * .6,
        width: horizontal * .25,
        height: 100,
        paddingLeft: 20,
    },
    scroll: {
        minHeight: vertical,
    },
    border: {
        top: -32,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .24,
        width: horizontal * .9,
        marginTop: 48
    },
    borderItem: {
        backgroundColor: '#fff',
        height: vertical * .04,
        width: horizontal * .8,
        top: 16,
        marginLeft: 20,
        marginTop: 20
    },
    info: {
        color: '#62BA46',
        paddingLeft: 12,
        paddingTop: 4,
        fontSize: 16
    },
    icon: {
        top: 32,
        left: horizontal * .74
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
});

export default styles