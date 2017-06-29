# SIIGAME-AI

A tool creates with [RxJS](https://github.com/Reactive-Extensions/RxJS), to help to use the [Coding Game](https://coding-game.swat-sii.fr)

## How to install

`npm install` or `yarn`

Then you can run `npm run watch` to compile your ts files.

## Create your own AI

Create your AI in `src/ai/` folder as yourAI.ts

```typescript
import { AI } from "../shared/ai";
import { CharacterAction, Game } from "../shared/game";

export default class yourAI extends AI {

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

You can run your IA with the above command :

```bash
DEBUG=*,-Fight::getGamenode node ./src/app.js --ai=yourAI --player-name=your-name --character=warrior
```

## Preconfigured AI

You can run a preconfigured AI to help you to test your AI

### OnlyHit
 
```bash
npm run-script start:only-hit --versus=true
```

### OnlyThrust

This AI use THRUST action until the enemy has 0 of armor. Then it use only the HIT action.

```bash
npm run-script start:only-thrust --versus=true
```

### OnlyShield

This AI use SHIELD and wait your aciton.

```bash
npm run-script start:only-shield --versus=true
```

# How to use

For example, we want to launch a game with OnlyShield versus OnlyThrust:

In you first shell run :

```bash
npm run-script start:only-thrust
```

Then the result is something like that:

```
Fight::createGame { token: 'cpvmm2',
Fight::createGame   status: 'WAITING',
Fight::createGame   speed: 1000,
Fight::createGame   countDown: null,
Fight::createGame   me: null,
Fight::createGame   foe: 
Fight::createGame    { healthPoints: 1000,
Fight::createGame      armor: 17,
Fight::createGame      character: { armor: 17, name: 'WARRIOR', actions: [Object] },
Fight::createGame      history: [],
Fight::createGame      isBehindShield: false } } +0ms
```

Then you can run in another shell:

```bash
DEBUG=*,-Fight::getGamenode node ./src/app.js --ai=only-shield --player-name=OnlyShield --character=warrior --versus=true --game-token=<token>
```

With `--gameToken` equal to the token in the previous command

