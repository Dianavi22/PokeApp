import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import pokeapi from "../lib/pokeapi";


const CardView = ({ pokemon, callback }) => {

    return (
        <Card style={Styles.container}>
            <Card.Content>
                <Title>{pokemon.name}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: pokeapi.spriteUrl(pokemon.id) }} style={{ imageRendering: 'optimizeSpeed' }} />
            <Card.Content>
                <Paragraph>{pokemon.text}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity onPressOut={callback}><Button>Détails</Button></TouchableOpacity>
            </Card.Actions>
        </Card>
    )
};
export default CardView
const Styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        margin: 18
    }
})

