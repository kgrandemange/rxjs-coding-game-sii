import { Manager } from './manager';
import { Observable } from 'rxjs';
import { Game, GameStatus } from './game';
import { Fight } from './fight';

export abstract class AI {

  constructor (
    public manager: Manager
  ) {}

  abstract firstAction (game: Game): void;

  abstract ai (game: Game): void;

  start () {
    this.waitUntilGameStarted().subscribe(() => {
    }, () => {}, () => {
      Fight.getGame(this.manager.game.token, this.manager.playerKey)
        .delayWhen((game) => Observable.timer(game.countDown))
        .subscribe(() => {
          this.firstAction(this.manager.game)
        })
    });


    Observable.merge(this.manager.actionsHandler).subscribe((game: Game) => {
      if (game.status === GameStatus.PLAYING) {
        this.ai(game);
      }
    });
  }

  // Observe game status
  private waitUntilGameStarted (delay: number = 500): Observable<Game> {
    return Observable
      .interval(delay)
      .flatMap(() => Fight.getGame(this.manager.game.token, this.manager.playerKey))
      .takeWhile((game) => game.status === GameStatus.WAITING);
  }

}
