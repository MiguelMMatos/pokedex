export type TPokemon = {
  url: string;
};

export type TSprites = {
  front_default: string;
};

export type TPokemonDescription = {
  id: string;
  name: string;
  sprites: TSprites;
  weight: string;
  types: TPokemonType[];
  abilities: TAbility[];
  stats: TStats[];
};

export type TStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type TAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type TPokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

type TWeakeness = {
  [key: string]: string[];
};

export type TEffect = {
  effect: string;
  language: TEffectLanguage;
};

export type TEffectLanguage = {
  name: string;
  url: string;
};

export type TAbilityDetails = {
  effect_entries: TEffect[];
};

export const weakenessDict: TWeakeness = {
  normal: ["fighting"],
  fire: ["water", "rock", "ground"],
  water: ["electric", "grass"],
  electric: ["ground"],
  grass: ["fire", "ice", "poison", "flying", "bug"],
  ice: ["fire", "fighting", "rock", "steel"],
  fighting: ["flying", "psychic", "fairy"],
  poison: ["ground", "psychic"],
  ground: ["water", "grass", "ice"],
  flying: ["electric", "ice", "rock"],
  psychic: ["bug", "ghost", "dark"],
  bug: ["fire", "flying", "rock"],
  rock: ["water", "grass", "fighting", "ground", "steel"],
  ghost: ["ghost", "dark"],
  dragon: ["ice", "dragon", "fairy"],
  dark: ["fighting", "bug", "fairy"],
  steel: ["fire", "fighting", "ground"],
  fairy: ["poison", "steel"],
};
