# SkyChatBot

🚀 **Overview**

The SkyChatBot project leverages Vanilla JavaScript and Bootstrap for the frontend, creating a user-friendly interface, and Flask for the Python backend to handle messaging. The architecture supports seamless integration with SkypeMessageAPI for message processing. The project consists of the `SkyChatBotBackend` directory for backend operations and the `SkyChatBotWidget` directory for frontend components, ensuring organized development and easy maintenance.

🌟 **Features**

- 📡 Real-time Interaction: Users can interact in real-time, sending and receiving messages instantly.
- 🔒 Session Management: Integration of session IDs for consistent user experiences across chat sessions.
- 🎨 Dynamic UI: Customizable and interactive user interface that adapts to different devices and screen sizes.
- 🔐 Environment Configuration: Support for `.env` files for secure and flexible backend configuration.
- 🤖 Interactive Prompts: AI-driven prompts to engage users and initiate conversations.
- ⚠️ Error Handling: Robust error handling mechanisms to inform users and maintain engagement even when third-party services are down.

📋 **Getting Started**

### Requirements

- Python 3.x
- Flask
- Requests library
- python-dotenv
- Vanilla JavaScript-enabled web browser

### Quickstart

1. **Clone the SkyChatBot Repository**
   ```
   git clone https://github.com/LavX/SkyChatBot.git
   ```

2. **Navigate to the `SkyChatBotBackend`**
   - Install dependencies:
     ```
     cd SkyChatBotBackend
     pip install -r requirements.txt
     ```

3. **Set Up the SkypeMessageAPI (3rd Party API)**
   - Clone the SkypeMessageAPI repository:
     ```
     git clone https://github.com/LavX/SkypeMessageAPI.git
     ```
   - Follow the `README.md` in the SkypeMessageAPI project to set up the API, including the `.env` file configuration with your Skype credentials.

4. **Integrate SkypeMessageAPI**
   - Ensure the `SkyChatBotBackend` is configured to use the SkypeMessageAPI for sending messages. Update the `.env` file in `SkyChatBotBackend` with the necessary API endpoint and credentials obtained from setting up the SkypeMessageAPI.

5. **Start the Backend Server**
   ```
   python app.py
   ```

6. **Using the Chat Widget**
   - Open the `SkyChatBotWidget/index.html` file in your browser to use the chat widget.

👐 **Contributing**

Contributions, issues, and feature requests are welcome. For more information on how to contribute, please check our issues page.

📜 **License**

Distributed under the MIT License. See LICENSE for more information.

📬 **Contact**

Laszlo A. Toth - lavx@lavx.hu
Project Link: https://github.com/LavX/SkyChatBot

## Disclaimer

This project is intended for educational purposes only and might violate Skype's or Microsoft's Terms and Conditions. Users should ensure they comply with all relevant policies and regulations when using or deploying this project. The author(s) do not assume any responsibility for any misuse or breach of agreement on the part of the users.
