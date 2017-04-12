# SIIGAME-AI

An tool, create with [RxJS](https://github.com/Reactive-Extensions/RxJS), to help to use the [Coding Game](https://coding-game.swat-sii.fr)

## How to install

`npm install` or `yarn`

## Add your own AI

Create your AI into `src/ai/` folder :

```typescript
import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export class yourAI extends AI {

  firstAction (game: Game): void {
    // Put your first action here
  }

  ai (game: Game): void {
    // Put your code here
    // For example
    this.manager.performAction(CharacterAction.HIT);
  }
}
```

Then add your AI into the factory `shared/ai.factory.ts`.

You can run your IA with the above command :

```bash
DEBUG=*,-Fight::getGamenode node ./src/app.js --ai=your-ai --player-name=your-name --character=warrior
```

## Preconfigured AI

You can run a preconfigured AI to help you to test you AI

### OnlyHit
 
```bash
npm run-script start:only-hit 
```

### OnlyThrust

This AI use THRUST action until the enemy has 0 of armor. Then it use only the HIT action.

```bash
npm run-script start:only-thrust
```

### OnlyShield

This AI use SHIELD and wait your aciton.

```bash
npm run-script start:only-shield
```
