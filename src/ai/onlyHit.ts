import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export class OnlyHitAI extends AI {

  firstAction (game: Game): void {
    this.manager.performActionAndWait(CharacterAction.HIT, 600);
  }

  ai (game: Game): void {
    this.manager.performAction(CharacterAction.HIT);
  }
}

