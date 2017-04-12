import { Subject } from 'rxjs';
import { Action, CharacterAction, CharacterActionCooldown, Game } from './game';
import { Fight } from './fight';

export class Manager {
  public history: Action[] = [];
  public actionsHandler: Subject<Game>;

  constructor (
    public game: Game,
    public playerKey: string
  ) {
    this.actionsHandler = new Subject<Game>();
  }

  performAction (action: CharacterAction): void {
    this.performActionAndWait(action, CharacterActionCooldown.get(action));
  }

  performActionAndWait (action: CharacterAction, delay: number): void {
    Fight.performAction(this.game.token, this.playerKey, action)
      .delay(delay)
      .flatMap(() => Fight.getGame(this.game.token, this.playerKey)) // It seems to take too much time once in a while ...
      .subscribe((game) => {
        this.history.push({
          coolDown   : CharacterActionCooldown.get(action),
          description: '',
          name       : action
        });

        game.coolDownFinished = true;

        this.actionsHandler.next(game);
      });
  }

  getLastAction (): Action {
    return this.history[ this.history.length - 1 ];
  }

}
