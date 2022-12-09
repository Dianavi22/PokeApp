import { useCallback, useEffect, useMemo, useState } from "react"
import { View, FlatList, TextInput, StyleSheet } from "react-native"
import { FAB, IconButton } from "react-native-paper"
import CardView from "../component/CardView"
import favlist from "../lib/favlist"
import pokeapi from '../lib/pokeapi'

const ListPage = ({navigation}) => {
    const [pokemons, setPokemons] = useState([])
    const [search, setSearch] = useState("")
    const [filterFavorites, setFilterFavorites] = useState(false)
    
    useEffect(() => {
        pokeapi.listPokemon().then(setPokemons).catch(console.error)
    }, [])

    const pokemonsFiltered = useMemo(() => {
        let filtered = search.length > 0
            ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLocaleLowerCase()))
            : pokemons
                
        if (filterFavorites) {
            const favList = favlist.getList()
            filtered = filtered.filter(p => favList.includes(p.id))
        }

        return filtered
    }, [pokemons, search, filterFavorites])
    
    const renderer = useCallback(elem => <CardView pokemon={elem.item} callback={() => navigation.push('DetailsPage', {pokemonId: elem.item.id})} />)
    const toggleFavoritesFilter = useCallback(() => setFilterFavorites(!filterFavorites), [filterFavorites])
    const openCreator = useCallback(() => navigation.push('PokemonCreator'))

    return <View>
        <View style={styles.filters}>
            <TextInput placeholder="Rechercher..." value={search} onChangeText={setSearch} style={styles.searchBar}/>
            <IconButton icon={filterFavorites ? "star" : "star-outline"} onPress={toggleFavoritesFilter} size={30} />
        </View>
        <FAB icon="creation" style={styles.fab} onPress={openCreator}/>
        <FlatList data={pokemonsFiltered} renderItem={renderer} />
    </View>
}

const styles = StyleSheet.create({
    searchBar: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 18,
        marginTop: 12,
        paddingLeft: 16,
        flex: 1,
    },
    filters: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 90,
        zIndex: 100,
    }
})

export default ListPage