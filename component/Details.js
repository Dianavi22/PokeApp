import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Card, IconButton, Paragraph } from 'react-native-paper';

const Details = ({ pokemon, isInFavList, showFavoriteButton, toggleFavoriteCallback, imageUri }) => {
    return (
        <ScrollView>
            <StatusBar backgroundColor={pokemon.color || 'grey'}/>
            <Card style={Styles.container}>
                <Card.Title title={pokemon.name} titleStyle={Styles.title} 
                    right={(props) => showFavoriteButton ? <IconButton {...props} icon={isInFavList ? "star" : "star-outline"}
                                        onPress={toggleFavoriteCallback} /> : null} />
                <Card.Cover source={{ uri: imageUri }} style={{resizeMode: 'cover'}} />
                <Card.Content>
                    <Paragraph>{pokemon.text}</Paragraph>
                    <View style={Styles.paddingParagraph}>
                        <Paragraph style={Styles.title}>Type</Paragraph>
                        <View style={{flexDirection: 'row'}} >
                            {pokemon.types.map((t, i) => <Text key={i} style={Styles.type}>{t}</Text>)}
                        </View>
                        <View style={Styles.paddingParagraph}>
                            <View style={Styles.margin}>
                                <Paragraph style={Styles.title}>Capacités</Paragraph>
                            </View>
                            {pokemon.abilities.map((a, i) => <View key={i}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{a.name}</Text>
                                <Text>{a.description}</Text>
                            </View>)}
                        </View>
                    </View>

                </Card.Content>

            </Card>
        </ScrollView>
    )
};

const Styles = StyleSheet.create({
    container: {
        //alignContent: 'center',
        margin: 30
    },
    pokemonTitle: {
        fontSize: 40,
        fontWeight: "bold",
        margin: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 20
    },
    margin: {
        margin: 10,
    },
    paddingParagraph: {
        paddingTop: 20,
    },
    // RectangleShapeView: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: 20,
    //     height: 30,
    //     backgroundColor: '#F3D33C',
    //     borderRadius: 10,
    // },
    type: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginHorizontal: 3,
        marginTop: 10,
    },
})

export default Details