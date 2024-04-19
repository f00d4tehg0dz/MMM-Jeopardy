# MMM-Jeopardy

Experience the beloved game show that has captivated audiences for over four decades as it arrives on your Magic Mirror. Prepare yourself for an extensive collection of 156,800 captivating clues and answers from the show.

## How it works

Immerse yourself in the familiar format of the game show, where each round begins with the presentation of a category and a corresponding value for the clue within that category. Once the clue is revealed, you are given a designated time-frame to provide your response before the answer is unveiled. The momentum continues as you swiftly transition to the next category and clue, ensuring a fast-paced, stimulating, and enjoyable experience. Prepare to be challenged, entertained, and educated all at once!

## Examples

* Screenshot of Question and then screenshot of Question with Answer

![](screenshots/screenshot.png) ![](screenshots/screenshot2.png)

## Installation

* `git clone https://github.com/f00d4tehg0dz/MMM-Jeopardy` into the `~/MagicMirror/modules` directory.

* Uses the Jeopardy REST API `https://github.com/f00d4tehg0dz/jeopardy-api`

## Config.js entry and options

    {
      module: "MMM-Jeopardy",
      position: "top_right",             		// Works well anywhere
      config: {
          useHeader: false,                  // Set to True if you want a header shown
          header: "This is Jeopardy!",       // Text for Header. Only will show if useHeader is set to true in config
          maxWidth: "192px",                 // Stretch or constrain the whole container
          textAlignment: "right",            // Text alignment
          animationSpeed: 3000,              // How fast the text fades in and fades out. (e.g clue fades in and then fades out)
          initialLoadDelay: 4250,            // How soon the module loads on Magic Mirror startup, in milliseconds, 4.25 in seconds
          answerDisplayDuration: 20 * 1000,  // Duration in milliseconds to display the answer before moving to the next question (e.g 20 seconds) 
          nextQuestionDelay: 10 * 1000,      // Delay in milliseconds after displaying the answer before moving to the next question (e.g 10 seconds)
        }
    },

## Special thanks to SpaceCowboysDude and mykle1