import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export class OnlyThrustAI extends AI {

  firstAction (game: Game): void {
    this.manager.performActionAndWait(CharacterAction.THRUST, 600);
  }

  ai (game: Game): void {
    if (game.foe.armor === 0 ) {
      this.manager.performAction(CharacterAction.HIT);
    } else {
      this.manager.performAction(CharacterAction.THRUST);
    }
  }
}

