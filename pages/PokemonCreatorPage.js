import { useCallback, useEffect, useRef, useState } from "react"
import { Linking, ToastAndroid, Text, View, Image, FlatList, ScrollView } from "react-native"
import { Button, Card, IconButton, TextInput } from "react-native-paper"
import { Camera, useCameraDevices } from "react-native-vision-camera"

const PokemonCreatorPage = ({navigation}) => {
    const camera = useRef(null)

    const [path, setPath] = useState()
    const [pictureMode, setPictureMode] = useState(false)
    const [name, setName] = useState("")
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
        navigation.push("CustomPokemon", {pokemon: {name, abilities}, imageUri: 'file://'+path}, [name, abilities, path])
    })

    const abilitiesRenderer = useCallback(elem => <>
        <IconButton icon="close-circle" onPress={() => {abilities.splice(elem.index, 1); setAbilities([...abilities])}} />
        <TextInput placeholder="Nom de la capacité" value={elem.item.name} 
            onChangeText={value => {abilities[elem.index].name = value; setAbilities([...abilities])}} />
        <TextInput placeholder="Description" value={elem.item.description} 
            onChangeText={value => {abilities[elem.index].description = value; setAbilities([...abilities])}} />
    </>)

    if (!device) {
        return <Text>Veuillez patientez...</Text>
    }

    return <View>
        <ScrollView>
            <Card style={{margin: 30}}>
                <Card.Content>
                    <TextInput placeholder="Nom" onChangeText={setName} value={name} />
                    
                    {pictureMode ? <>
                        <Camera device={device} isActive={pictureMode} photo={true} ref={camera} style={{width: 300, height: 300, borderWidth: 1, borderColor: 'blue'}}/>
                        <Button onPress={takePicture}>Photo</Button>
                    </> : <IconButton icon="camera" onPress={enablePictureMode} />}
                    
                    {(path && !pictureMode) && <Image source={{uri: 'file://'+path}} style={{width: 100, height: 100, borderWidth: 1, borderColor: 'red'}} />}
                    
                    <FlatList renderItem={abilitiesRenderer} data={abilities} scrollEnabled={false} />
                    <Button onPress={addAbility} >Ajouté une capacité</Button>
                    <Button onPress={submit}>Créer</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    </View>
}

export default PokemonCreatorPage