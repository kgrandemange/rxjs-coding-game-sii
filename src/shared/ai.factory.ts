import * as debug from 'debug';

import { AI } from './ai';
import { Game } from './game';
import { Manager } from './manager';
import { OnlyHitAI } from '../ai/onlyHit';
import { OnlyThrustAI } from '../ai/onlyThrust';
import { OnlyShieldAI } from '../ai/onlyShield';

export class AIFactory {

  static create (name: string, game: Game, playerKey: string): AI {
    const manager = new Manager(game, playerKey);

    debug('ai')(`Using '${name}' AI`);

    switch (name) {
      case 'only-hit':
        return new OnlyHitAI(manager);
      case 'only-thrust':
        return new OnlyThrustAI(manager);
      case 'only-shield':
        return new OnlyShieldAI(manager);

      default:
        throw new Error(`AI '${name}' not found. Add it in src/shared/ai.factory.ts`);
    }
  }

}
