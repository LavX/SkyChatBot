from flask import Flask, request, jsonify
import requests
import os
from sessionManager import store_session_id
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    try:
        app.logger.info('Hello World route was called')
        return 'Hello, World!'
    except Exception as e:
        app.logger.error('Error in hello_world route: %s', e, exc_info=True)
        return 'An error occurred', 500

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        # Extract message and session_id from request body
        message_data = request.json
        message = message_data.get('message')
        session_id = message_data.get('session_id')

        # Special handling for the predefined welcome message
        if message == "Hello! How can I assist you today?":
            app.logger.info('Sending predefined welcome message to user.')
            return jsonify({'message': message}), 200

        # Define 3rd party API URL and headers
        api_url = os.getenv('THIRD_PARTY_API_URL')
        headers = {
            'Content-Type': 'application/json',
            'x-api-key': os.getenv('THIRD_PARTY_API_KEY')
        }

        app.logger.info('Sending message to 3rd party API with session_id: %s', session_id)

        # Forward the message to the 3rd party API
        response = requests.post(api_url, headers=headers, json={'message': message, 'session_id': session_id})
        
        # Handle non-200 responses from the 3rd party API
        if response.status_code != 200:
            app.logger.error('Error from 3rd party API. Status code: %s, Response: %s', response.status_code, response.text)
            # Determine appropriate error message and status code
            if response.status_code == 401:
                return jsonify({'error': 'Invalid or missing API key'}), 401
            elif response.status_code >= 500:
                return jsonify({'error': 'The external service is temporarily unavailable. Please try again later.'}), 503
            elif response.status_code >= 400:
                return jsonify({'error': 'There was a problem with the request to the external service.'}), 400
            else:
                return jsonify({'error': 'An unexpected error occurred.'}), 500

        # Parse the API response and forward it to the frontend
        api_response = response.json()
        app.logger.info('Message successfully sent to 3rd party API and response received')
        return jsonify(api_response), 200
    except requests.exceptions.RequestException as e:
        app.logger.error('Request to 3rd party API failed: %s', e, exc_info=True)
        return jsonify({'error': 'Failed to connect to the 3rd party API'}), 503
    except Exception as e:
        app.logger.error('Error in send_message route: %s', e, exc_info=True)
        return jsonify({'error': 'An error occurred while processing your request'}), 500

@app.route('/initialize-session', methods=['POST'])
def initialize_session():
    try:
        session_id = request.json.get('session_id')
        if session_id:
            store_session_id(session_id)
            app.logger.info('Session ID %s stored successfully.', session_id)
            return jsonify({'message': 'Session initialized successfully'}), 200
        else:
            app.logger.error('Missing session ID in request')
            return jsonify({'error': 'Missing session ID'}), 400
    except Exception as e:
        app.logger.error('Error in initialize_session route: %s', e, exc_info=True)
        return jsonify({'error': 'An error occurred while initializing session'}), 500

if __name__ == '__main__':
    app.logger.info('Starting SkyChatBotBackend on port 8000')
    app.run(port=8000)