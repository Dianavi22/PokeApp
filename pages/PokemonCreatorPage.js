import { useCallback, useEffect, useRef, useState } from "react"
import { Linking, ToastAndroid, Text, View, Image, FlatList, ScrollView, StyleSheet } from "react-native"
import { Button, Card, IconButton, TextInput } from "react-native-paper"
import { Camera, useCameraDevices } from "react-native-vision-camera"

const PokemonCreatorPage = ({navigation}) => {
    const camera = useRef(null)

    const [path, setPath] = useState()
    const [pictureMode, setPictureMode] = useState(false)
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [abilities, setAbilities] = useState([{}])
    const device = useCameraDevices().back

    useEffect(() => {
        (async () => {
            if (await Camera.getCameraPermissionStatus() !== 'authorized') {
                if (await Camera.requestCameraPermission() !== 'authorized') {
                    ToastAndroid.show("Merci d’autoriser l'access à la caméra", ToastAndroid.LONG)
                    Linking.openSettings()
                    navigation.goBack()
                }
            }
        })().catch(console.error)
    })

    const enablePictureMode = useCallback(() => setPictureMode(true))
    const takePicture = useCallback(async () => {
        const photo = await camera.current.takePhoto()
        setPath(photo.path)
        setPictureMode(false)
    })
    const addAbility = useCallback(() => setAbilities([...abilities, {}]), [abilities])

    const submit = useCallback(() => {
        navigation.push("CustomPokemon", {pokemon: {name, abilities, types: [type]}, imageUri: 'file://'+path}
            ,[name, abilities, type])
    })

    const abilitiesRenderer = useCallback(elem => <View style={styles.abilityForm}>
        <IconButton icon="close-circle" onPress={() => {abilities.splice(elem.index, 1); setAbilities([...abilities])}} style={styles.removeButton} />
        <TextInput placeholder="Nom de la capacité" value={elem.item.name} 
            onChangeText={value => {abilities[elem.index].name = value; setAbilities([...abilities])}} style={styles.input} />
        <TextInput placeholder="Description" value={elem.item.description} 
            onChangeText={value => {abilities[elem.index].description = value; setAbilities([...abilities])}} style={styles.input} />
    </View>)

    if (!device) {
        return <Text>Veuillez patientez...</Text>
    }

    return <View>
        <ScrollView>
            <Card style={styles.container}>
                <Card.Content>
                    <TextInput placeholder="Nom" onChangeText={setName} value={name} style={styles.input} />
                    
                    {pictureMode ? <>
                        <Camera device={device} isActive={pictureMode} photo={true} ref={camera} style={{width: 300, height: 300}}/>
                        <IconButton onPress={takePicture} icon="camera-iris" style={styles.center} size={40}/>
                    </> : <IconButton icon="camera" style={styles.center} mode="outlined" size={30} onPress={enablePictureMode} />}
                    
                    {(path && !pictureMode) && <Image source={{uri: 'file://'+path}} style={styles.picture} />}
                    
                    <TextInput placeholder="Type" onChangeText={setType} value={type} style={styles.input} />
                    <Text style={styles.h2}>Capacités</Text>
                    <FlatList renderItem={abilitiesRenderer} data={abilities} scrollEnabled={false} />
                    <Button onPress={addAbility}>Ajouter une capacité</Button>
                    <Button onPress={submit}>Créer</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    center: {
        alignSelf: 'center'
    },
    h2: {
        marginTop: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 6,
        paddingLeft: 16,
        overflow: 'hidden',
        backgroundColor: '#f4f6f7'
    },
    abilityForm: {
        borderColor: "lightgrey",
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 15,
        position: 'relative',
        padding: 17,
    },
    removeButton: {
        position: "absolute",
        top: -10,
        right: -10,
        zIndex: 100,
    },
    picture: {
        alignSelf: 'center',
        width: 150,
        height: 150,
    }
})

export default PokemonCreatorPage