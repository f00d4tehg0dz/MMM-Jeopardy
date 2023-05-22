# MMM-Jeopardy

Experience the beloved game show that has captivated audiences for over four decades as it arrives on your Magic Mirror. Prepare yourself for an extensive collection of 156,800 captivating clues and answers from the show.

## How it works

Immerse yourself in the familiar format of the game show, where each round begins with the presentation of a category and a corresponding value for the clue within that category. Once the clue is revealed, you are given a designated time-frame to provide your response before the answer is unveiled. The momentum continues as you swiftly transition to the next category and clue, ensuring a fast-paced, stimulating, and enjoyable experience. Prepare to be challenged, entertained, and educated all at once!

## Examples

* Screenshot of Question and then screenshot of Question with Answer

![](screenshot.png) ![](screenshot2.png)

## Installation

* `git clone https://github.com/f00d4tehg0dz/MMM-Jeopardy` into the `~/MagicMirror/modules` directory.

* Uses the Jeopardy REST API `https://github.com/f00d4tehg0dz/jeopardy-api`

## Config.js entry and options

    {
        module: 'MMM-Jeopardy',
        position: 'top_left',
        config: {
		    useHeader: false,
            header: "This is Jeopardy!",
		    maxWidth: "250px",
		    animationSpeed: 3000,
        }
    },

## Special thanks to SpaceCowboysDude and mykle1