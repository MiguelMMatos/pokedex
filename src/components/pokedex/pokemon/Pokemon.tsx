import { TPokemonDescription } from "../../Models/pokemon";
import "./pokemon.css";

interface Props {
  pokemon: TPokemonDescription;
  setSelected: (pokemon: TPokemonDescription) => void;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokemon({ pokemon, setSelected }: Props) {
  return (
    <div
      onClick={() => setSelected(pokemon)}
      key={pokemon.id}
      className="pokemon_card"
    >
      <h2>{capitalizeFirstLetter(pokemon.name)}</h2>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

export default Pokemon;
