# Fast & Furious Discord Bot

## Overview

This project showcases a custom Discord bot designed for the Fast & Furious clan server. Built using Node.js with the Discord.js library and MongoDB for data persistence, this bot provides a comprehensive suite of features to enhance server management, moderation, and member engagement. This was my first foray into Discord bot development and JavaScript programming, demonstrating a rapid learning curve and problem-solving abilities in a new language and environment.

## Key Features

The bot encompasses a diverse range of functionalities:

### Administration

*   **Announcements:** Broadcast server-wide announcements.
*   **Reaction Roles:** Implement reaction-based role assignment (configured for countries and Town Halls).
*   **Custom Embeds/Messages:** Craft and dispatch embeds and messages to designated channels.
*   **Ticket System:** Facilitate user support and issue tracking through a ticket system.
*   **User Information Retrieval:** Access detailed member information.

### Developer Utilities

*   **Event Emitter:** Trigger specific guild member events for testing and debugging.
*   **Maintenance Mode:** Toggle bot maintenance mode to restrict functionality during updates or downtime.
*   **Status Monitoring:** Display bot status and database connectivity.

### Entertainment

*   **8-Ball:** Offer a classic fortune-telling experience.
*   **Meme Integration:** Fetch and display memes from Reddit.
*   **Subreddit Support:** Retrieve memes from user-specified subreddits.
*   **Animal Facts and Images:** Provide entertaining animal information and visuals.

### Moderation

*   **Ban/Unban Management:** Control user access to the server.
*   **Bulk Message Deletion:** Clear specified numbers of messages from channels.
*   **Kick Functionality:** Remove users from the server.
*   **Role Administration:** Add and remove roles from members.
*   **Slow Mode Implementation:** Regulate message frequency within channels.

### Core Systems

*   **Giveaway Management:** Create, manage, and execute giveaways.
*   **Music Integration:** Enable music playback in voice channels with queue management, volume control, and related features.
*   **Recruitment Questions:** Streamline recruitment by sending a predefined set of questions to applicants.
*   **Suggestion System:** Encourage community feedback through a suggestion system with voting.

### Utility Commands

*   **Help Command:** Provide clear instructions and usage examples for all commands.
*   **Ping Command:** Check bot latency and API responsiveness.

## Setup and Installation

1. **Prerequisites:** Node.js v16+, npm v6+, MongoDB instance, Discord bot token.

2. **Clone and Install:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    npm install
    ```

3. **Configuration:**
    *   Populate `.env` with `TOKEN` and `Database` connection string.
    *   Customize `structures/config.js` to match server preferences.
    *   Enable required intents in the Discord Developer Portal.

4. **Run:** `npm start`

## Usage Examples

*   `/announce announcement:Message`
*   `/ban target:@User reason:Reason`
*   `/giveaway start duration:1d winners:1 prize:Prize channel:#channel`
*   `/music play query:Song`
*   `/help` or `/help command:command-name`

## Notes

*   This project represents my initial exploration of Discord bot creation and JavaScript development. It served as a valuable learning experience, allowing me to acquire proficiency in these technologies and develop a functional bot from scratch.
*   This bot hasn't been updated for a very long time, so most features will not be fully functional.