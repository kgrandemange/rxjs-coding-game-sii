import * as debug from 'debug';

import { AI } from './ai';
import { Game } from './game';
import { Manager } from './manager';

export class AIFactory {

  static create (name: string, game: Game, playerKey: string): AI {
    const manager = new Manager(game, playerKey);

    debug('ai')(`Using '${name}' AI`);

    try {
      const AiClass = require(`../ai/${name}`);
      return new AiClass.default(manager);
    } catch(e) {
      throw new Error(`AI '${name}' not found. Add it in src/ai/ folder. Make sure to export default`);
    }
  }

}
