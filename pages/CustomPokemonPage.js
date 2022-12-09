import Details from "../component/Details"

const CustomPokemonPage = ({ route }) => {
    const { pokemon, imageUri } = route.params

    return <Details pokemon={pokemon} imageUri={imageUri} showFavoriteButton={false} />
}

export default CustomPokemonPage