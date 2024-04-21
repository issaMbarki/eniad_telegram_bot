# ENIAD Telegram Bot

## Description

This is a Telegram bot designed for the ENIAD University students. The bot shows menus in order to finally send to the user a file (course, td, tp, correction, etc.).

## Usage

The bot responds to various commands:

- `/start`: Sends the menu of semesters.
- `/s1` or `/s2`: Sends the menu of modules for a semester.
- `/info`: Sends information about the bot to the user.
- If the user is an admin and sends a document, the bot will save the file.

## Installing

To install and run the ENIAD Telegram Bot, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/issaMbarki/eniad_telegram_bot.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd eniad-telegram-bot
    ```

3.  Install the required dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    BOT_TOKEN=your-telegram-bot-token
    ADMIN_USERNAME=your-telegram-admin-username
    ADMIN_ID=your-telegram-admin-id
    ```

5.  Start the bot:
    ```bash
    npm start
    ```

Now you have successfully installed and started the ENIAD Telegram Bot. You can interact with it by sending commands to your Telegram bot.
