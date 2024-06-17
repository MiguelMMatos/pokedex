import { SetStateAction, useEffect, useState } from "react";
import {
  TAbilityDetails,
  TEffectLanguage,
  TPokemonDescription,
  weakenessDict,
} from "../Models/pokemon";
import { capitalizeFirstLetter } from "../pokedex/pokemon/Pokemon";
import "./pokemonDetails.css";

interface Props {
  pokemon: TPokemonDescription;
}

type TNames = {
  [key: string]: string;
};

const names: TNames = {
  hp: "Hp",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special Attack",
  "special-defense": "Special Defence",
  speed: "Speed",
};

function convertRange(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
) {
  if (value < fromMin) value = fromMin;
  if (value > fromMax) value = fromMax;

  const result =
    ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
  return result;
}

function PokemonDetails({ pokemon }: Props) {
  const [abilities, setAbilities] = useState<string[]>([]);
  const [selectedAbility, setSelectedAbility] = useState<TEffectLanguage>();

  function renderTypes() {
    const types = pokemon.types.map((type) => {
      return (
        <div className={type.type.name + " pokemon_type"}>{type.type.name}</div>
      );
    });
    return types;
  }

  function renderWeaknesses() {
    const weaknesses = [];
    const helper: string[] = [];
    const types = pokemon.types.map((type) => {
      return type.type.name;
    });

    for (let i = 0; i < pokemon.types.length; i++) {
      const weakeness = weakenessDict[pokemon.types[i].type.name];
      for (let j = 0; j < weakeness.length; j++) {
        if (!helper.includes(weakeness[j]) && !types.includes(weakeness[j])) {
          helper.push(weakeness[j]);
          weaknesses.push(
            <div className={weakeness[j] + " pokemon_type"}>{weakeness[j]}</div>
          );
        }
      }
    }
    return weaknesses;
  }

  function renderStats() {
    const stats = pokemon.stats.map((stat) => (
      <div className="pokemon_stat">
        <div>{names[stat.stat.name] + ": " + stat.base_stat}</div>
        <div id="myProgress">
          <div
            id="myBar"
            style={{
              width: convertRange(stat.base_stat, 0, 200, 0, 100) + "%",
            }}
          ></div>
        </div>
      </div>
    ));

    return stats;
  }

  useEffect(() => {
    const newAbilities: SetStateAction<string[]> = [];
    const fetchAbilityData = async () => {
      // Assuming pokemon.abilities is an array of objects with ability.url
      const promises = pokemon.abilities.map(async (ability) => {
        const response = await fetch(ability.ability.url);
        const data = await response.json();
        return data; // Return the fetched data
      });

      try {
        const results: TAbilityDetails[] = await Promise.all(promises);
        results.map((effect) => {
          effect.effect_entries.map((entry) => {
            if (entry.language.name == "en") {
              newAbilities.push(entry.effect);
            }
          });
        });
        setAbilities(newAbilities);
        console.log("Fetched ability data:", results);
        // Do something with the fetched data, like setting it in state
      } catch (error) {
        console.error("Error fetching ability data:", error);
        // Handle error as needed
      }
    };

    fetchAbilityData();
  }, [pokemon]);

  function renderAbility() {
    const abilitiesRender = pokemon.abilities.map((abilityCurrent, index) => (
      <div
        className="ability"
        key={abilityCurrent.ability.name}
        onMouseEnter={() => handleSelectAbility(abilityCurrent.ability)}
        onMouseLeave={() => setSelectedAbility(undefined)}
      >
        {abilityCurrent.ability.name}
        {selectedAbility?.name === abilityCurrent.ability.name && (
          <div className="ability_popup">{abilities[index]}</div>
        )}
      </div>
    ));

    return abilitiesRender;
  }

  function handleSelectAbility(ability: TEffectLanguage) {
    if (selectedAbility?.name != ability.name) {
      setSelectedAbility(ability);
    } else {
      setSelectedAbility(undefined);
    }
  }

  return (
    <div className="container_details">
      <div className="container_inner_details">
        <div className="left_info">
          <div className="sprite_container info_container no_background">
            <img src={pokemon.sprites.front_default}></img>
          </div>
          <div className="stats_container info_container">
            <div className="pokemon_stats">{renderStats()}</div>
          </div>
        </div>
        <div className="right_info info_container">
          <div className="inner_container">
            <div className="pokemon_name">
              {capitalizeFirstLetter(pokemon.name)}
            </div>
            <div className="pokemon_info_bottom">
              <div className="pokemon_types_container">
                <div className="top_container">
                  <div className="pokemon_types">
                    <div>Types</div>
                    <div className="weakness_container">{renderTypes()}</div>
                  </div>
                  <div className="pokemon_types">
                    <div>Ability</div>
                    <div className="weakness_container ">{renderAbility()}</div>
                  </div>
                </div>
                <div className="pokemon_types">
                  <div>Weaknesses</div>
                  <div className="weakness_container">{renderWeaknesses()}</div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
