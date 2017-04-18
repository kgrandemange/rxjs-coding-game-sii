import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export default class OnlyThrustAI extends AI {

  firstAction (game: Game): void {
    this.manager.performAction(CharacterAction.THRUST);
  }

  ai (game: Game): void {
    if (game.foe.armor === 0 ) {
      this.manager.performAction(CharacterAction.HIT);
    } else {
      this.manager.performAction(CharacterAction.THRUST);
    }
  }
}

