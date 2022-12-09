import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

export default function Profil({ navigation, route }) {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [input, setInput] = useState('');

    const goPageList = useCallback(() => {
        navigation.navigate('ListPage');
    }, [navigation])

    const goPageInf = useCallback(() => {
        navigation.navigate('Info');
    }, [navigation])

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        try {
            AsyncStorage.getItem('users')
                .then(value => {
                    if (value != null) {
                        let users = JSON.parse(value);
                        let user = users[route.params.userid]
                        setUsername(user.UserName);
                        setPass(user.Pass);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        if (input.length == 0) {
            Alert.alert('Warning!', 'Username must be at list 1 character.')
        } else {
            try {
                var usersjson = await AsyncStorage.getItem("users");
                let users = JSON.parse(usersjson);
                users[route.params.userid].UserName = input

                setUsername(input)

                await AsyncStorage.setItem('users', JSON.stringify(users));
                Alert.alert('Success!', 'Your data has been updated.');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const removeData = async () => {
        try {
            var usersjson = await AsyncStorage.getItem("users");
            let users = JSON.parse(usersjson);
            users.splice(route.params.userid, 1)
            await AsyncStorage.setItem('users', JSON.stringify(users));
            await AsyncStorage.removeItem("userid");
            navigation.navigate('Register');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <Text style={[
                styles.text
            ]}>
                Bonjour {username} !
            </Text>
            <Text style={[
                styles.pass
            ]}>
                Your pass is {pass}
            </Text>
            <Image
                source={require('./assets/logopokeapp.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.button}
                onPressOut={goPageList}
            ><Text style={styles.textAccess}>Accéder à l'application</Text></TouchableOpacity>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder='Change ton username'
                    value={input}
                    onChangeText={setInput}
                />
                <View style={styles.padding}>

                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonModify}
                title='Update'
                color='yellow'
                onPressOut={updateData}
            ><Text style={styles.textColor}>Modifier</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonInf}
                onPressOut={goPageInf}
            ><Text style={styles.textAccess}>Informations</Text></TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonRemove2}
                title='Remove'
                color='yellow'
                onPressOut={removeData}
            ><Text style={styles.textColor}>Supprimer le compte</Text></TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logo: {
        alignItems: 'center',
        marginTop: 30,
    },
    divButtons: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        fontSize: 40,
        margin: 10,
        fontWeight: 'bold'
    },
    buttonInf: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 10,
        marginTop: 10,
        backgroundColor: '#FFCC03',
    },
    button: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginVertical: 10,
        marginTop: 10,
        backgroundColor: '#FFCC03',
    },
    textAccess: {
        fontWeight: 'bold',
        color: "white",
    },
    row: {
        flexDirection: "row",
    },
    buttonRemove2: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 10,
        marginTop: 10,
        backgroundColor: '#EA3323'
    },
    buttonRemove: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#EA3323'
    },
    padding: {
        paddingTop: 80,
        paddingLeft: 5
    },
    buttonModify: {
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 10,
        marginTop: 10,
        backgroundColor: '#4772AD',
        marginBottom: 50
    },
    textColor: {
        color: "white",
    },
    input: {
        flexDirection: "row",
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 75,
    }
})