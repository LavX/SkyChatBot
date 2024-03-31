# SkyChatBot

SkyChatBot is an innovative chat widget that enhances website visitor interactions through real-time messaging. With its Python backend and seamless integration with a 3rd party API, it facilitates instant communication between site visitors and businesses, enriching the user experience without the need for user authentication.

## Overview

The SkyChatBot project combines Vanilla JavaScript and Bootstrap for a user-friendly frontend, with a Flask-powered Python backend for efficient message processing. This architecture ensures the chat widget is both effective and easy to integrate into any website. The project is structured into two main directories: `SkyChatBotBackend` for the backend application and `SkyChatBotWidget` for the frontend widget, promoting a clear separation of concerns and streamlined development.

## Features

- **Real-time Messaging**: Allows users to send and receive messages instantly.
- **Session Management**: Tracks user sessions with unique IDs for a cohesive conversation experience.
- **Customizable UI**: Offers a customizable user interface, ensuring a visually appealing and interactive chat experience.
- **Environment Variable Support**: Facilitates easy backend configuration through a `.env` file, enhancing security and flexibility.
- **AI-Initiated Interaction**: Automatically prompts users with a welcome message from the AI, encouraging interaction.
- **Responsive Design**: Ensures the chat widget and buttons are appropriately sized and positioned for optimal user experience across devices.

## Getting Started

### Requirements

- Python 3.x
- Flask
- Requests library
- python-dotenv
- A modern web browser

### Quickstart

1. Clone the repository to your local machine.
2. Install the required Python packages (`flask`, `requests`, `python-dotenv`) using `pip`.
3. Configure your third-party API credentials in the `.env` file within the `SkyChatBotBackend` directory.
4. Launch the backend server with `python app.py` from within the `SkyChatBotBackend` directory.
5. Open `SkyChatBotWidget/index.html` in a web browser to start interacting with the chat widget.

### License

Copyright (c) 2024. All rights reserved.