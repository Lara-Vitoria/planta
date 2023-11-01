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
    scroll: {
        minHeight: vertical * 1.22,
    },
    overlayText: {
        backgroundColor: '#62BA46',
        position: 'absolute',
        top: -12,
        right: horizontal * .5,
        width: horizontal * .35,
        height: 100,
        paddingLeft: 20,
    },
    overlayTextNome: {
        color: '#fff',
        right: horizontal * .3,
        paddingLeft: 50
    },
    border: {
        top: vertical * .02,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',
        height: vertical * .45,
        width: horizontal * .9,
        marginTop: 48
    },
    borderImg: {
        position: 'absolute',
        top: 24,
        left: 20,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent',

        height: vertical * .3,
        width: horizontal * .799,
    },
    borderInfo: {
        flexDirection: 'row',
    },
    borderItemInfo: {
        height: vertical * .04,
        width: horizontal * .38,
        top: vertical * .35,
        marginLeft: 20,
        marginTop: 20
    },
    borderItem: {
        height: vertical * .04,
        width: horizontal * .9,
        top: vertical * .03,
        marginTop: 30
    },
    borderGarfico: {
        height: vertical * .2,
        width: horizontal * .9,
        top: vertical * .03,
        marginTop: 30
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        height: 66
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        borderWidth: 1,
        borderColor: '#fff',
        height: vertical * .08,
        width: horizontal * .4,
        marginTop: 56
    },
    textBtn: {
        color: '#fff',
        textAlign: 'center',
        paddingTop: vertical * .025,
    },
    img: {
        width: 225,
        height: 225,
        left: 50,
        top: 14
    },
    txtInfo: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    }

});

export default styles