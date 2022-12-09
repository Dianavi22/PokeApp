import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default function Info({ navigation }) {


    return (
        <View style={styles.body} >
            <View style={styles.margin}>
                <View style={styles.logo}>
                    <Image
                        source={require('../assets/logopokeapp.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.div}>
                    <Text style={styles.title}>
                        Developpeurs:
                    </Text>
                    <Text>
                        Toinon EMILE (Developpeur back)
                    </Text>
                    <Text>
                        Maxime LUCHINI (Developpeur back)
                    </Text>
                    <Text>
                        Jade BOUIGES (Developpeuse front)
                    </Text>
                </View>
                <View style={styles.div}>
                    <Text style={styles.title}>
                        API utilisée
                    </Text>
                    <Text>
                        Nous avons utilisé une API répertoriant tous les pokémons
                    </Text>
                    <Text>
                        Lien vers l'API : https://pokeapi.co/
                    </Text>
                </View>
                <View style={styles.div}>
                    <Text style={styles.title}>
                        Modules utilisés
                    </Text>
                    <Text>
                        @react-navigation/native
                    </Text>
                    <Text>
                        @react-native-async-storage/async-storage
                    </Text>
                    <Text>
                        react-native-paper
                    </Text>
                    <Text>
                        react-native-vision-camera
                    </Text>
                    <Text>
                        react-native-vector-icons
                    </Text>

                </View>
                <View style={styles.divVersion}>
                    <Text >
                        Version 2.0.8
                    </Text>
                </View>
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
        marginBottom: 20,
    },
    margin: {
        margin: 22,
    },
    title: {
        fontSize: 20,
        color: 'black',
        marginBottom: 13,
        fontWeight: 'bold'
    },
    div: {
        marginBottom: 30,
    },
    divVersion: {
        marginTop: 30
    }
})