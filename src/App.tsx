import { useState, useEffect } from "react";
import Pokedex from "./components/pokedex/Pokedex";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import "./App.css";
import { TPokemon, TPokemonDescription } from "./components/Models/pokemon";

export const numberOfFetch = 150;
const App = () => {
  const [pokemonList, setPokemonList] = useState<TPokemonDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<TPokemonDescription>();

  useEffect(() => {
    if (!loading) {
      console.log("aqui2");
      fetchPokemon();
    }
  }, [offset]);

  useEffect(() => {
    console.log("aqui1");
    fetchPokemon();
  }, []);

  function handleOffset() {
    setOffset((prevOffset: number) => prevOffset + numberOfFetch);
  }

  const fetchPokemon = async () => {
    if (!hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${numberOfFetch}&offset=${offset}`
      );

      const data = await response.json();

      const promises = data.results.map(async (pokemon: TPokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      });

      const results = await Promise.all(promises);
      setPokemonList((prevList) => [...prevList, ...results]);

      if (data.next === null) setHasMore(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <h1>Pokémon List</h1>
      </header>
      <div className={selected ? "main_content showSelected" : "main_content"}>
        <Pokedex
          setSelected={setSelected}
          loading={loading}
          pokemonList={pokemonList}
          handleOffset={handleOffset}
          hasMore={hasMore}
        ></Pokedex>
        {selected != null && (
          <PokemonDetails pokemon={selected}></PokemonDetails>
        )}
      </div>
    </div>
  );
};

export default App;
