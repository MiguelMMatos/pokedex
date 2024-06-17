import Pokemon from "./pokemon/Pokemon";
import "./pokedex.css";
import { useRef, useState } from "react";
import { TPokemonDescription } from "../Models/pokemon";

interface Props {
  loading: boolean;
  pokemonList: TPokemonDescription[];
  hasMore: boolean;
  setSelected: (pokemon: TPokemonDescription) => void;
  handleOffset: () => void;
}

function Pokedex({
  loading,
  pokemonList,
  hasMore,
  setSelected,
  handleOffset,
}: Props) {
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleClick() {
    handleOffset();
  }

  return (
    <div id="Pokedex" className="pokedex_container" ref={scrollRef}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        className="input_search"
      ></input>
      <div className="pokemon_container">
        <div className="pokedex_show">
          {pokemonList.map(
            (pokemon) =>
              pokemon.name.includes(search) && (
                <Pokemon setSelected={setSelected} pokemon={pokemon}></Pokemon>
              )
          )}
        </div>
        <div className="flex_center">
          {hasMore && !loading && (
            <button onClick={() => handleClick()}>Load More</button>
          )}
          {loading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
