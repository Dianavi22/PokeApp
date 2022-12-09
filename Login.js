import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SafeAreaView } from '@react-native-safe-area-context';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {

    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');

    const gotoRegister = useCallback(() => {
        navigation.navigate('Register');
    }, [navigation])


    const checkPass = useMemo(() => {
        return pass.length >= 3 || pass.length == 0
    }, [pass]);

    const getData = async () => {
        try {
            const usersjson = await AsyncStorage.getItem('users')
            if (usersjson != null) {
                let users = JSON.parse(usersjson);
                let usersfind = users.find(user => user.UserName == username && user.Pass == pass);
                if (usersfind != null) {
                    let userid = users.indexOf(usersfind)
                    await AsyncStorage.setItem('userid', userid.toString());
                    navigation.navigate('Profil', { userid });
                } else {
                    alert("Incorrect password or username ")
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body} >
            <View style={styles.margin}>
                <View style={styles.logo}>
                    <Image
                        source={require('./assets/logopokeapp.png')}
                        style={styles.logo}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder='Enter your username'
                    onChangeText={setUserName}
                />
                <TextInput
                    style={checkPass ? styles.input : styles.inputError}
                    secureTextEntry={true}
                    placeholder='Enter your pass'
                    onChangeText={setPass}
                />
                <TouchableOpacity
                    style={styles.buttonConnexion}
                    title='Login'
                    color='white'
                    onPressOut={getData}
                ><Text style={styles.textCentre}>Se connecter</Text></TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title='Login'
                    color='white'
                    onPressOut={gotoRegister}
                ><Text style={styles.textCentre}>Pas de compte?</Text></TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    textCentre: {
        textAlign: "center",
        fontSize: 20,
    },
    logo: {
        alignItems: 'center',
        margin: 20,
    },
    margin: {
        margin: 22,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
    },
    title: {
        fontSize: 30,
        color: 'black',
        marginBottom: 130,
    },
    button: {

        marginBottom: 130,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderColor: 'transparent',
    },
    buttonConnexion: {
        backgroundColor: '#FFCC03',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 15
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
})