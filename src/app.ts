import * as debug from 'debug';
import { Observable } from 'rxjs';
import { argv } from 'yargs';

import { Fight } from './shared/fight';
import { CharacterType } from './shared/game';
import { AIFactory } from './shared/ai.factory';

/**
 * --player-name
 * --player-key
 * --character
 * --ai
 * --versus
 * --game-token
 */

const greatestDuels = [
  'DavidVsGoliath',
  'ObiWanVsDarkVador',
  'NeoVsAgentSmith',
  'BlackMambaVsORenIshii',
  'AchilleVsHector',
  'T800VsT1000',
  'SpiderManVsOctopus',
  'LukeVsDarkVador',
  'WillTurnerVsJackSparrow',
  'HarryPotterVsVoldemort'
];

const info = {
  game      : greatestDuels[ Math.floor(Math.random() * greatestDuels.length) ],
  playerKey : argv.playerKey || Math.random().toString(36).substring(7),
  playerName: argv.playerName || 'no-name'
};

let initObs = null;

if (argv.gameToken) {
  initObs = Fight.joinGame(argv.gameToken,
    info.playerKey,
    argv.character && CharacterType.isCharacterType(argv.character.toUpperCase()) ? argv.character.toUpperCase() : CharacterType.WARRIOR,
    info.playerName);
} else {
  initObs = Fight.createGame(info.game, false, argv.versus || false).flatMap((game) => Fight.joinGame(game.token,
    info.playerKey,
    argv.character && CharacterType.isCharacterType(argv.character.toUpperCase()) ? argv.character.toUpperCase() : CharacterType.WARRIOR,
    info.playerName))
}

initObs.subscribe((game) => {
    debug('app')(`${info.game.split('Vs')[ 0 ]} just start fighting ${info.game.split('Vs')[ 1 ]}`);

    AIFactory.create(argv.ai, game, info.playerKey).start();
  }, (err) => debug('app')(err));
