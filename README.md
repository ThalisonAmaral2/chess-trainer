# Chess Trainer

## What's the benefit of using it?
- You can quickly copy the FEN code of any position


# How can I run the Chess Trainer?

You will need to download the [Chess Trainer API](https://github.com/ThalisonAmaral2/chess-trainer-api)


### 0. Create a directory `Recommendend`
```sh
mkdir Chess-Trainer-App
cd Chess-Trainer-App
```

### 1. Download the Client and API
```sh
git clone https://github.com/ThalisonAmaral2/chess-trainer.git
git clone https://github.com/ThalisonAmaral2/chess-trainer-api.git
```
### 2. Running both
Assuming you followed the **0. Create a directory** step.

#### Run the API
```sh
cd chess-trainer-api
npm run dev
```
#### Run the client
```sh
cd chess-trainer
npm run dev
```

### 3. Run it on a Browser
`http://localhost:5173/`

Click on **Next** Button to load the first Puzzle

![Chess Trainer Demo](https://raw.githubusercontent.com/ThalisonAmaral2/chess-trainer/refs/heads/development/media/Puzzle.png)


## Upcoming features

- Solved puzzle history
- Export Solved Puzzles History as PGN
- Puzzle Rush Mode _(Solve the maximum puzzles you can under 5 minutes)_
