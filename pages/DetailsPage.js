import { useCallback, useEffect, useState } from "react"
import { Text } from "react-native"
import Details from "../component/Details"
import favlist from "../lib/favlist"
import pokeapi from "../lib/pokeapi"

const DetailsPage = ({ route }) => {
    const { pokemonId } = route.params

    const [pokemon, setPokemon] = useState()
    const [isInFavList, setIsInFavList] = useState(false)

    useEffect(() => {
        pokeapi.details(pokemonId).then(setPokemon).catch(console.error)
        setIsInFavList(favlist.contains(pokemonId))
    }, [])

    const toggleFavorite = useCallback(() => {
        if (isInFavList)
            favlist.remove(pokemonId)
        else
            favlist.add(pokemonId)
        setIsInFavList(!isInFavList)
    }, [isInFavList, pokemonId])

    if (!pokemon)
        return <Text>Chargement</Text>

    return <Details pokemon={pokemon} isInFavList={isInFavList}  imageUri={pokeapi.spriteUrl(pokemonId)}
        showFavoriteButton={true} toggleFavoriteCallback={toggleFavorite} />
}

export default DetailsPage