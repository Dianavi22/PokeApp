import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

export default function Login({ navigation }) {

    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('')

    const gotoLogin = useCallback(() => {
        navigation.navigate('Login');
    }, [navigation])

    const checkPassConfirm = useMemo(() => {
        return pass === passConfirm && passConfirm.length > 0 || passConfirm == 0
    }, [passConfirm, pass]);

    const checkPass = useMemo(() => {
        return pass.length >= 3 || pass.length == 0
    }, [pass]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('userid')
                .then(async userid => {
                    if (userid != null) {
                        navigation.navigate('Profil', { userid });
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async () => {
        if (username.length == 0) {
            alert('Warning!' + ' Please fill username.')
        } else if (pass.length == 0) {
            alert('Warning!' + ' Please fill password.')
        } else if (pass.length < 2) {
            alert('Warning!' + ' Password must be more than 3 character')
        } else if (pass != passConfirm) {
            alert('Warning!' + " Your Password confirm and password aren't de same")
        } else {
            try {
                var user = {
                    UserName: username,
                    Pass: pass
                }
                //
                let users;
                var usersjson = await AsyncStorage.getItem("users")
                if (usersjson != null) {
                    users = JSON.parse(usersjson);

                } else {
                    users = [];
                }
                users.push(user);
                let userid = users.indexOf(user)
                await AsyncStorage.setItem('users', JSON.stringify(users));
                await AsyncStorage.setItem('userid', userid.toString());
                navigation.navigate('Profil', { userid });
            } catch (error) {
                console.log(error);
            }
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
                    onChangeText={(value) => setUserName(value)}
                />
                <TextInput
                    style={checkPass ? styles.input : styles.inputError}
                    secureTextEntry={true}
                    placeholder='Enter your pass'
                    onChangeText={(value) => setPass(value)}
                />
                <TextInput
                    value={passConfirm}
                    onChangeText={setPassConfirm}
                    placeholder={'Confirm Password'}
                    style={checkPassConfirm ? styles.input : styles.inputError}
                    secureTextEntry={true}>
                </TextInput>
                <TouchableOpacity
                    style={styles.buttonCreation}
                    title='Register'
                    color='white'
                    onPressOut={setData}
                ><Text style={styles.textCentre}>Créer mon compte</Text></TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    title='Login'
                    color='white'
                    onPressOut={gotoLogin}
                ><Text style={styles.textCentre}>Déjà un compte?</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        alignItems: 'center',
        margin: 20,
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
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 15,

        borderColor: 'transparent',
    },
    textCentre: {
        textAlign: "center",
        fontSize: 20,
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
    margin: {
        margin: 22,
    },
    buttonCreation: {
        backgroundColor: '#FFCC03',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 15
    },
})