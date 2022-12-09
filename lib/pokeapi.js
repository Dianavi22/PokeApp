import GraphQL from "./graphql"
import { Cache, MemoryStore } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
const cache = new Cache({
    namespace: 'pokeapi',
    policy: {
        stdTTL: 0,
        // maxEntries: 50000
    },
    // backend: MemoryStore
    backend: AsyncStorage
})

const graphQL = new GraphQL('https://beta.pokeapi.co/graphql/v1beta')

const spriteUrl = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`


async function listPokemon() {
    const cacheName = 'pomemonsV3'
    const cacheEntry = await cache.get(cacheName)
    if (cacheEntry)
        return JSON.parse(cacheEntry)
    console.log("CALL API")
    const result = await graphQL.query(`
        query samplePokeAPIquery {
        gen3_species: pokemon_v2_pokemonspecies(where: {}) {
            id
            pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}}) {
                name
            }
            pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 5}}, limit: 1) {
                flavor_text
            }
            }
        }`
    )
    const pokemons = result.gen3_species.map(p => { return { 
        id: p.id,
        name: p.pokemon_v2_pokemonspeciesnames[0].name,
        text: p.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text.replaceAll('\n', ' '),
    }})
    cache.set(cacheName, JSON.stringify(pokemons))
    return pokemons
}

async function details(pokemonId) {
    const cacheName = `pokemonV6+${pokemonId}`
    const cacheEntry = await cache.get(cacheName)
    if (cacheEntry)
        return JSON.parse(cacheEntry)
    console.log("CALL API")
    const result = await graphQL.query(`
        query samplePokeAPIquery {
            pokemon_v2_pokemon(where: {id: {_eq: ${pokemonId}}}) {
            id
            pokemon_v2_pokemonspecy {
                pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 5}}) {
                    name
                }
                pokemon_v2_pokemoncolor {
                    name
                }
                pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 5}}, limit: 1) {
                    flavor_text
                }
            }
            pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                    pokemon_v2_abilitynames(where: {language_id: {_eq: 5}}) {
                        name
                    }
                    pokemon_v2_abilityflavortexts(where: {language_id: {_eq: 5}}) {
                        flavor_text
                    }
                }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  pokemon_v2_typenames(where: {language_id: {_eq: 5}}) {
                    name
                  }
                }
            }
            pokemon_v2_pokemonmoves(limit: 5) {
                pokemon_v2_move {
                    pokemon_v2_movenames(where: {language_id: {_eq: 5}}) {
                        name
                    }
                    pokemon_v2_moveflavortexts(where: {language_id: {_eq: 5}}, limit: 1) {
                        flavor_text
                    }
                }
            }
            }
        }      
    `)
    const entry = result.pokemon_v2_pokemon[0]
    const pokemon = {
        id: entry.id,
        name: entry.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name,
        text: entry.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text.replaceAll('\n', ' '),
        // abilities: entry.pokemon_v2_pokemonabilities.map(a => { const ab = a.pokemon_v2_ability; return {
        //     name: ab.pokemon_v2_abilitynames[0].name,
        //     description: (ab.pokemon_v2_abilityflavortexts[3] ?? ab.pokemon_v2_abilityflavortexts[0]).flavor_text.replaceAll('\n', ' ')
        // }}),
        abilities: entry.pokemon_v2_pokemonmoves.map(a => { const ab = a.pokemon_v2_move; return {
            name: ab.pokemon_v2_movenames[0].name,
            description: (ab.pokemon_v2_moveflavortexts[0]).flavor_text.replaceAll('\n', ' ')
        }}),
        color: entry.pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name,
        types: entry.pokemon_v2_pokemontypes.map(t => t.pokemon_v2_type.pokemon_v2_typenames[0].name)
    }
    cache.set(cacheName, JSON.stringify(pokemon))
    return pokemon
}

export default {
    spriteUrl,
    listPokemon,
    details,
}
