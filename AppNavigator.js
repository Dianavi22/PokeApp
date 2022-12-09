import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Register from './Register';
import Login from './Login';
import Profil from './Profil';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import PokemonCreatorPage from './pages/PokemonCreatorPage';
import CustomPokemonPage from './pages/CustomPokemonPage';

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register" component={Register} options={{headerShown: false,}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
            <Stack.Screen name="Profil" component={Profil}/>
            <Stack.Screen name="ListPage" component={ListPage} options={{headerTitle: "Liste des Pokémon"}}/>
            <Stack.Screen name="DetailsPage" component={DetailsPage} options={{headerTitle: "Détails"}}/>
            <Stack.Screen name="PokemonCreator" component={PokemonCreatorPage} options={{headerTitle: "Créer votre Pokémon"}}/>
            <Stack.Screen name="CustomPokemon" component={CustomPokemonPage} options={{headerTitle: "Votre Pokémon"}}/>
        </Stack.Navigator>
    )
}

export default AppNavigator;