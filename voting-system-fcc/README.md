# Voting System

A console-based poll built for the freeCodeCamp JavaScript certification.
It focuses on the logic: a `Map` stores the options, and a `Set` per option makes sure each voter can only vote once.

## Example

```js
addOption("Turkey");           // Option "Turkey" added to the poll.
addOption("Morocco");          // Option "Morocco" added to the poll.
addOption("Spain");            // Option "Spain" added to the poll.
addOption("Turkey");           // Option "Turkey" already exists.
addOption("");                 // Option cannot be empty.

vote("Turkey", "traveler1");   // Voter traveler1 voted for "Turkey".
vote("Turkey", "traveler2");   // Voter traveler2 voted for "Turkey".
vote("Turkey", "traveler1");   // Voter traveler1 has already voted for "Turkey".
vote("Morocco", "traveler1");  // Voter traveler1 voted for "Morocco".
vote("Nigeria", "traveler2");  // Option "Nigeria" does not exist.

displayResults();
// Poll Results:
// Turkey: 2 votes
// Morocco: 1 votes
// Spain: 0 votes
```

## What I practised

- Using a `Map` to store options and a `Set` per option to block duplicate votes
- Checking the cases in the right order before changing data (empty → missing → duplicate)
- Building a formatted string from a collection, with `\n` between lines but not at the end

## Run it

You need [Node.js](https://nodejs.org) installed. Then, from this folder:

```
node script.js
```