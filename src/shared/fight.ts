import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import * as debug from 'debug';
import 'rxjs';

import { CharacterAction, CharacterType, Game } from './game';

export class Fight {
  static BASE_URL = 'https://coding-game.swat-sii.fr/api';

  /**
   * Create a new game
   *
   * @param   name                Game name
   * @param   speedy              TRUE to fight in accelerated mode; FALSE otherwise
   * @param   versus              TRUE to fight against another player; FALSE to fight against an AI
   * @returns {Observable<Game>}
   */
  static createGame (name: string, speedy: boolean = false, versus: boolean = true): Observable<Game> {
    return RxHR
      .post(`${Fight.BASE_URL}/fights`, {
        json: true,
        body: {
          name  : name,
          speedy: speedy,
          versus: versus
        }
      })
      .map((data) => {
        const body: Game = data.body;

        debug('Fight::createGame')(body);

        return body;
      });
  }

  /**
   * Join a game
   *
   * @param   gameToken           Game token retrieved from {@link Fight.createGame}
   * @param   playerKey           Your player key
   * @param   character           The character you want to use
   * @param   characterName       Your character name
   * @returns {Observable<Game>}
   */
  static joinGame (gameToken: string, playerKey: string, character: CharacterType, characterName: string): Observable<Game> {
    return RxHR
      .post(`${Fight.BASE_URL}/fights/${gameToken}/players/${playerKey}`, {
        json: true,
        body: {
          character: character,
          name     : characterName
        }
      })
      .map((data) => {
        const body: Game = data.body;

        debug('Fight::joinGame')(body);
        debug('Fight::joinGame::actions')(body.me.character.actions.map((action) => `${action.name} - Cooldown ${action.coolDown}s`));

        return body;
    });
  }

  /**
   * Get a game
   *
   * @param   gameToken           Game token retrieved from {@link Fight.createGame}
   * @param   playerKey           Your player key
   * @returns {Observable<Game>}
   */
  static getGame (gameToken: string, playerKey: string): Observable<Game> {
    return RxHR
      .get(`${Fight.BASE_URL}/fights/${gameToken}/players/${playerKey}`, {
        json: true
      })
      .map((data) => {
        const body = data.body;

        debug('Fight::getGame')(body);

        return body;
      });
  }

  /**
   * Perform an action
   *
   * @param   gameToken           Game token retrieved from {@link Fight.createGame}
   * @param   playerKey           Your player key
   * @param   action              The action to perform
   * @returns {Observable<Game>}
   */
  static performAction (gameToken: string, playerKey: string, action: CharacterAction): Observable<Game> {
    return RxHR
      .post(`${Fight.BASE_URL}/fights/${gameToken}/players/${playerKey}/actions/${action}`, {
        json: true
      })
      .map((data) => {
        const body = data.body;

        debug('Fight::peformAction')(body);

        return body;
    });
  }

  // static waitUntil (delay, Observable) {
  //   Observable.create((observer) => {
  //     observer.delay(delay)
  //   })
  //   return new Objservable().delay().flatMap(Observable);
  // }

}
