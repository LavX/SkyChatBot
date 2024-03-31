// Function to handle sending of messages
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    const sendButton = document.getElementById('send-message');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (messageText) {
        const messagesContainer = document.getElementById('messages');
        const customerMessage = createMessageElement(messageText, 'customer');
        messagesContainer.appendChild(customerMessage);
        messageInput.value = ''; // Clear the input field immediately after sending the message
        messageInput.disabled = true; // Disable the input field

        loadingIndicator.style.display = 'block'; // Show loading indicator
        sendButton.disabled = true; // Disable send button

        const sessionId = localStorage.getItem('session_id');
        const dataToSend = { message: messageText, session_id: sessionId };

        ajaxUtility('http://localhost:8000/send-message', 'POST', dataToSend, function(response) {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            sendButton.disabled = false; // Enable send button
            messageInput.disabled = false; // Enable the input field

            if (response.error) {
                const errorMessage = createMessageElement(response.error, 'error');
                messagesContainer.appendChild(errorMessage);
            } else {
                const replyMessage = createMessageElement(response.message, 'ai');
                messagesContainer.appendChild(replyMessage);
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, function(error) {
            console.error('The request failed:', error);
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            sendButton.disabled = false; // Enable send button
            messageInput.disabled = false; // Enable the input field
            const errorMessage = createMessageElement('Failed to send message. Please try again.', 'error');
            messagesContainer.appendChild(errorMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }
}

// Event listener for the send message button
document.getElementById('send-message').addEventListener('click', sendMessage);

// Event listener for the Enter key in the message input
document.getElementById('message-input').addEventListener('keypress', function(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        sendMessage();
    }
});


let chatWidget = document.getElementById('chat-widget');
let chatButton = document.getElementById('chat-btn');

function showChatWidget() {
    chatWidget.style.display = 'block';
    chatButton.style.display = 'none';
    console.log("Chat widget shown.");
}

function hideChatWidget() {
    chatWidget.style.display = 'none';
    chatButton.style.display = 'block';
    console.log("Chat widget hidden.");
}

chatButton.addEventListener('click', function() {
    try {
        showChatWidget();
    } catch (error) {
        console.error("Error showing chat widget:", error);
    }
});

document.getElementById('minimize-chat').addEventListener('click', function() {
    try {
        hideChatWidget();
    } catch (error) {
        console.error("Error hiding chat widget:", error);
    }
});

document.addEventListener('click', function(event) {
    let isClickInsideWidget = chatWidget.contains(event.target);
    let isClickInsideButton = chatButton.contains(event.target);

    if (!isClickInsideWidget && !isClickInsideButton) {
        try {
            hideChatWidget();
        } catch (error) {
            console.error("Error hiding chat widget:", error);
        }
    }
});

function generateUUID() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0) {
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3|0x8)).toString(16);
    });
}

let sessionId = localStorage.getItem('session_id');
if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem('session_id', sessionId);

    ajaxUtility('http://localhost:8000/initialize-session', 'POST', { session_id: sessionId }, function(response) {
        console.log('Session ID initialized successfully.');
    }, function(error) {
        console.error('Failed to initialize session ID.', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        showChatWidget();
        // Removed the condition to check for first load and directly call sendWelcomeMessage
        sendWelcomeMessage();
    } catch (error) {
        console.error("Error initializing chat widget or sending welcome message:", error);
    }
});

function getCurrentTimestamp() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
}

function createMessageElement(message, sender) {
    const messageElement = document.createElement('div');
    const timestamp = getCurrentTimestamp();
    messageElement.classList.add('message');

    if (sender === 'customer') {
        messageElement.classList.add('customer-message');
        messageElement.innerHTML = `<strong>You:</strong> ${message} <span class="message-time">${timestamp}</span>`;
    } else if (sender === 'ai') {
        messageElement.classList.add('ai-message');
        messageElement.innerHTML = `<strong>AI:</strong> ${message} <span class="message-time">${timestamp}</span>`;
    } else if (sender === 'error') {
        messageElement.classList.add('error-message');
        messageElement.innerHTML = `<strong>Error:</strong> ${message} <span class="message-time">${timestamp}</span>`;
    }

    return messageElement;
}

function ajaxUtility(url, method, data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess(JSON.parse(xhr.responseText));
        } else {
            onError('Failed to process the request: ' + xhr.responseText);
        }
    };

    xhr.onerror = function () {
        onError('The request encountered an error.');
    };

    xhr.send(JSON.stringify(data));
}

// Add a resize button event listener
let resizeButton = document.getElementById('resize-chat');
if (resizeButton) {
    resizeButton.addEventListener('click', toggleWidgetSize);
} else {
    console.error("Resize button not found. Ensure the resize button has an id of 'resize-chat'.");
}

// Toggle widget size functionality
function toggleWidgetSize() {
    if (chatWidget.classList.contains('chat-widget-large')) {
        chatWidget.classList.remove('chat-widget-large');
        console.log("Chat widget size reverted to default.");
    } else {
        chatWidget.classList.add('chat-widget-large');
        console.log("Chat widget size enlarged.");
    }
}

// Function to send a predefined welcome message to the AI and display its response
function sendWelcomeMessage() {
    console.log("Sending welcome message to user."); // Added log to confirm execution
    const welcomeMessage = "Hello! How can I assist you today?";
    const sessionId = localStorage.getItem('session_id');
    const dataToSend = { message: welcomeMessage, session_id: sessionId };

    ajaxUtility('http://localhost:8000/send-message', 'POST', dataToSend, function(response) {
        const messagesContainer = document.getElementById('messages');
        const welcomeMessageElement = createMessageElement(response.message, 'ai');
        messagesContainer.appendChild(welcomeMessageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, function(error) {
        console.error('Error sending welcome message to backend:', error);
    });
}