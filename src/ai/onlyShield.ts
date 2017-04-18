import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export default class OnlyShieldAI extends AI {

  firstAction (game: Game): void {
    this.manager.performActionAndWait(CharacterAction.SHIELD, 600);
  }

  ai (game: Game): void {
  }
}


