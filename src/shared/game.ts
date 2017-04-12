export interface Game {
  token: string;
  status: GameStatus;
  speed: number;
  countDown: number;
  coolDownFinished?: boolean;
  me: Player;
  foe: Player;
}

export interface Player {
  healthPoints: number;
  armor: number;
  isBehindShield: number;
  history: Action[];
  character: Character;
}

export interface Character {
  armor: number;
  name: string;
  actions: Action[]
}

export interface Action {
  coolDown: number;
  description: string;
  name: CharacterAction;
}

export class GameStatus {
  static WAITING = 'WAITING';
  static PLAYING = 'PLAYING';
  static FINISHED = 'FINISHED';
}

export class CharacterType {
  static WARRIOR = 'WARRIOR';
  static PALADIN = 'PALADIN';
  static DRUID = 'DRUID';
  static SORCERER = 'SORCERER';

  static isCharacterType(type: String): Boolean {
    return type === CharacterType.WARRIOR ||type === CharacterType.PALADIN ||type === CharacterType.DRUID ||type === CharacterType.SORCERER;
  }
}

export class CharacterAction {
  static HIT = 'HIT';
  static THRUST = 'THRUST';
  static HEAL = 'HEAL';
  static SHIELD = 'SHIELD';
}

export class CharacterActionCooldown {
  static HIT = 1000;
  static THRUST = 1000;
  static HEAL = 500;
  static SHIELD = 0;

  static get (action: CharacterAction) {
    switch (action) {
      case CharacterAction.HIT:
        return CharacterActionCooldown.HIT;

      case CharacterAction.THRUST:
        return CharacterActionCooldown.THRUST;

      case CharacterAction.HEAL:
        return CharacterActionCooldown.HEAL;

      case CharacterAction.SHIELD:
      default:
        return CharacterActionCooldown.SHIELD;
    }
  }
}
