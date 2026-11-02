// Build a Voting System

const poll = new Map();

// adds an option to vote on to the voting system
function addOption(option) {
    if (option === "") {
        return "Option cannot be empty.";
    }
    if (!poll.has(option)) {
        poll.set(option, new Set());
        return `Option "${option}" added to the poll.`
    } else {
        return `Option "${option}" already exists.`
    };
}

console.log(addOption("Turkey"));
console.log(addOption("Morocco"));
console.log(addOption("Spain"));


// casts a vote on a existing option using voterId
function vote(option, voterId) {

    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`
    };

    const voters = poll.get(option);

    if (poll.has(option)) {
        if (voters.has(voterId)) {
            return `Voter ${voterId} has already voted for "${option}".`
        } else {
            voters.add(voterId);
            return `Voter ${voterId} voted for "${option}".`
        }
    }
}

console.log(vote("Turkey", "traveler1"));
console.log(vote("Turkey", "traveler2"));
console.log(vote("Turkey", "traveler1"));
console.log(vote("Morocco", "traveler1"));
console.log(vote("Nigeria", "traveler2"));


// builds the poll results as a text summary
function displayResults() {

    let finalString = `Poll Results:`;

    for (const [option, voters] of poll) {
        finalString += `\n${option}: ${voters.size} votes`
    }
    return finalString;
}

console.log(displayResults());