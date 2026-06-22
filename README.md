# Simon

This is a React implementation of the memorization game "Simon" where a sequence is played and the player have to repeat the same sequence.

The game was made to sharpen my React knowledge and because it's fun. The initial game design and implementation took about 2 days or so,
but have been improved since then.

## Custom Sequences

You can provide a custom sequence of notes to play by adding a `sequence` parameter to the URL. The value should be a comma-separated list of numbers from 0 to 3, where each number represents a color/note:

- 0: Yellow
- 1: Blue
- 2: Green
- 3: Red

After the provided sequence has been played, the game will continue with random notes. Text or numbers outside the range of 0-3 will be ignored.

### Example

```
https://thewilley.github.io/Simon/?sequence=0,1,2,3,0,1
```

## How To Use

Simply go to the [official webpage](https://thewilley.github.io/Simon/) to get started, or run the app yourself by following these steps:

```bash
# Clone this repository
$ git clone https://github.com/TheWilley/Simon

# Go into the repository
$ cd Simon

# Install dependencies
$ bun install

# Build app
$ bun run build

# If you want to start the app
$ bun run preview

# If you want to develop the app
$ bun run dev
```

## License

[MIT](https://raw.githubusercontent.com/TheWilley/Simon/main/LICENSE)
