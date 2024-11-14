# Macros FoundryVTT Anima Beyond Fantasy

This repository contains custom macros designed for the Anima Beyond Fantasy in FoundryVTT. These macros automate various aspects of character management, such as Ki accumulation, Zeon accumulation, spell casting, and technique usage...

## Table of Contents

- [Macros FoundryVTT Anima Beyond Fantasy](#macros-foundryvtt-anima-beyond-fantasy)
- [Installation](#installation)
- [Macros Overview](#macros-overview)
  - [1. Ki Accumulation Macro](#1-ki-accumulation-macro)
  - [2. Zeon Accumulation Macro](#2-zeon-accumulation-macro)
  - [3. Spell Casting Macro](#3-spell-casting-macro)
  - [4. Technique Use Macro](#4-technique-use-macro)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use the macros in your Foundry VTT game follow these steps

1. Get the Macro code:
    - Copy each macro's code from this repository.
2. Create a new Macro in Foundry VTT:
    - Open your Foundry VTT game.
    - Click on the "Macros" tab in the bottom bar.
    - Click the "+" button to create a new macro.
    - Choose "Script" as the macro type.
    - Paste the macro code into the macro editor.
    - Give the macro a name corresponding to its function (e.g., "Ki Accumulation").
3. Assign an Icon
    - Click on the macro's icon to select an image that represents the macro.
4. Save the Macro
5. Add the Macro to Your Hotbar:
    - Drag the macro from the "Macros" directory to your hotbar for easy access.

Repeat these steps for each macro you wish to add to your game.

## Macros Overview

### 1. [Ki Accumulation Macro](accumulate-ki.js)

This macro allows a character to accumulate Ki points, either fully or partially, in selected characteristics. It provides a user interface to choose which characteristics to accumulate Ki in, adjusts for fatigue usage, and updates the character's Ki accumulation and fatigue values accordingly.

### 2. [Zeon Accumulation Macro](accumulate-zeon.js)

This macro enables a character to accumulate Zeon, either fully or partially, while considering fatigue usage and modifications. It updates the character's Zeon values and communicates the changes via a chat message.

### 3. [Spell Casting Macro](cast-spell.js)

This macro allows a character to cast spells from their spell list. It provides a user interface to select a spell and its grade, previews the spell details, checks for sufficient Zeon and intelligence, and updates the character's Zeon accumulation upon casting or maintaining the spell.

### 4. [Technique Use Macro](use-technique-ki.js)

This macro allows a character to use their Ki techniques. It provides a user interface to select a technique, displays the Ki costs and accumulated Ki, checks for sufficient Ki in each characteristic, and updates the character's Ki values accordingly. 

TODO: Add support for Maintining Ki habilities (we'll need to change how the system stores Ki Techniques)


## Contributing

If you wish to contribute to this collection of macros:

- Report Issues: Use the repository's issue tracker to report bugs or suggest enhancements.
- Submit Pull Requests: Fork the repository, make your changes, and submit a pull request for review.
- Share ideas: Feel free to ask for any kind of Macro in the [vtt-macros-and-tips](https://discord.com/channels/327226685399367680/765299386506805252) Discord channel of the Anima Beyond Fantasy Spanish Discord or the issue tracker.


## License
This project is open-source and available under the [MIT License](LICENSE).