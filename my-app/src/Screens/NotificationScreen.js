import { StyleSheet, Text, View } from "react-native";

function NotificationScreen(){
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.headingStyle}>React Navigation</Text>
            <Text style={styles.textStyle}>This is Notification Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle:{
        display: 'flex',
        justifyContent:'center',
        alignitems: 'center',
        flex:1,
    },
    textStyle:{
        fontSize: 28,
        color: 'black',
    },
    headingStyle:{
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
    }
})


export default NotificationScreen