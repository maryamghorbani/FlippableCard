import Axios from 'axios';
// A mock function to mimic making an async request for data
interface PokemonStat{
  name: String;
  value: number;
}

export interface Pokemon{
  id: number;
  name: String;
  image: String;
  tags: [String];
  stats: [PokemonStat],
}

function parserPokemon(data: any): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    tags: data.types.map((t: {type: {name: String}}) => t.type.name),
    stats: data.stats.map((stat: {base_stat: number, stat: {name: String}}) => (
        {value: stat.base_stat, name: stat.stat.name}
    )),
  };
}

export function fetchDetail(id: number) {
  return Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(responseData => parserPokemon(responseData.data));
}

export function fetchRandomly(){
  let min = Math.ceil(1);
  let max = Math.floor(898);
  let id = Math.floor(Math.random() * (max - min + 1) + min);
  return Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(responseData => parserPokemon(responseData.data));
}