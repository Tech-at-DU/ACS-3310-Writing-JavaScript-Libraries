# Project: Websocket Library

To provide a student with an API for a WebSockets library, the API should be simple, yet comprehensive enough to cover essential WebSocket functionalities. Here's a proposed API outline:

### WebSocket Library API

#### Initialization
- **connect(url: string, options?: object): WebSocketClient**
  - Connects to a WebSocket server.
  - **url**: The URL of the WebSocket server.
  - **options**: Optional configuration object (e.g., protocols, reconnect options).

#### WebSocketClient Class
- **send(message: string | object): void**
  - Sends a message to the WebSocket server.
  - **message**: The message to send. Can be a string or an object.

- **close(): void**
  - Closes the WebSocket connection.

- **on(event: string, callback: Function): void**
  - Registers an event listener.
  - **event**: The event type (e.g., 'open', 'message', 'close', 'error').
  - **callback**: The function to call when the event occurs.

- **off(event: string, callback: Function): void**
  - Unregisters an event listener.
  - **event**: The event type (e.g., 'open', 'message', 'close', 'error').
  - **callback**: The function to remove from the event listeners.

#### Event Types
- **'open'**: Fired when the connection is successfully opened.
- **'message'**: Fired when a message is received from the server.
  - Callback parameter: The message received (string).
- **'close'**: Fired when the connection is closed.
  - Callback parameter: The close event object.
- **'error'**: Fired when an error occurs.
  - Callback parameter: The error object.

#### Options (optional)
- **reconnect: boolean**
  - Whether to automatically reconnect if the connection is lost.
- **reconnectInterval: number**
  - The interval in milliseconds between reconnection attempts.

## Test app
Your submitted homework should inlcude a test app that shows your code in action. The test should import your code to a react Project with npm. Your test app does not have to be complex, the goal is to show your library functioning in context, not creating complex comercial project. 

## Evaluation
| Category | Points |
|:---------|:-------|
| Code & function | 10 |
| Uses Typescript |  5 |
| Has Unit Tests  |  5 |
| Test App        |  5 |
| Uses Bundling   |  5 |
| Uses CI         |  5 |
| Total           | 35 |



### Example Usage

```javascript
// Initialize the WebSocket connection
const wsClient = WebSocketLibrary.connect('wss://example.com/socket', {
  reconnect: true,
  reconnectInterval: 5000
});

// Register event listeners
wsClient.on('open', () => {
  console.log('Connection opened');
  wsClient.send('Hello, Server!');
});

wsClient.on('message', (message) => {
  console.log('Received message:', message);
});

wsClient.on('close', (event) => {
  console.log('Connection closed', event);
});

wsClient.on('error', (error) => {
  console.error('Connection error:', error);
});

// Send a message to the server
wsClient.send('Another message');

// Close the connection
wsClient.close();

// Unregister event listeners
wsClient.off('message', messageHandler);
```

### Detailed Example Implementation

Here is a detailed example of how the library might be implemented based on the proposed API:

```javascript
class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;
    this.eventListeners = {};
    this.shouldReconnect = options.reconnect || false;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', (event) => this.handleEvent('open', event));
    this.ws.addEventListener('message', (event) => this.handleEvent('message', event.data));
    this.ws.addEventListener('close', (event) => {
      this.handleEvent('close', event);
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    });
    this.ws.addEventListener('error', (event) => this.handleEvent('error', event));
  }

  handleEvent(eventType, event) {
    if (this.eventListeners[eventType]) {
      this.eventListeners[eventType].forEach(callback => callback(event));
    }
  }

  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(typeof message === 'object' ? JSON.stringify(message) : message);
    }
  }

  close() {
    this.shouldReconnect = false;
    this.ws.close();
  }

  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  off(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }
}

const WebSocketLibrary = {
  connect(url, options) {
    return new WebSocketClient(url, options);
  }
};
```


