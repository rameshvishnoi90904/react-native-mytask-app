import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import React from "react"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationScreenPropsType } from "../utils/types";

type Props = NativeStackScreenProps<NavigationScreenPropsType, 'LandingScreen'>;

const LaunchScreen = ({navigation, route}: Props) => {
    const startApp = () => {
        navigation.replace("Home")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}></View>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Your Fav Todo App 📝</Text>
                <Text style={styles.subTitleText}>build by Ramesh</Text>
            </View>
            <View style={styles.actionContainer}>
                <Pressable testID="start-button" style={styles.startButton} onPress={startApp}>
                    <Text style={styles.startText}>START</Text>
                </Pressable>
            </View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFEBE0'
    },
    titleText: {
        fontSize: 26,
        marginBottom: 16
    },
    subTitleText: {
        fontSize: 18
    },
    actionContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    startText: {
        fontSize: 22,
        color: '#EFEBE0',
        fontWeight: "bold"
    },
    startButton: {
        backgroundColor: '#FB4570',
        width: 200,
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 12
    }
})
export default LaunchScreen