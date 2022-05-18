let ports = []; // All the connected windows / tabs
let coinyWS;

const broadcast = function(type, payload) {
  ports.forEach(p => p.postMessage({ type, payload }));
};

const connectToCoinyWS = connectionData => {
  if (coinyWS) {
    broadcast('log', 'Coiny WS already connected.');
    return;
  }

  const url = new URL(connectionData.baseURL + '/user/notifications');
  url.searchParams.set('token', connectionData.jwt);
  coinyWS = new WebSocket(url);

  coinyWS.onopen = () => {
    broadcast('log', 'Coiny WS connected successfully.');
  };

  coinyWS.onclose = () => {
    setTimeout(() => {
      connectToCoinyWS(connectionData);
    }, 3000);
    coinyWS = null;
    broadcast('log', 'Coiny WS closed. Attempting reconnect in 3 seconds...');
  };

  coinyWS.onerror = () => {
    broadcast('log', 'Error occured with coiny WS.');
  };

  coinyWS.onmessage = e => {
    broadcast('notification', e.data);
    broadcast('log', `Message received from coiny ws: ${e.data}`);
  };
};

const disconnectFromCoinyWS = () => {
  coinyWS.close();
  coinyWS = null;
  broadcast('log', 'Coiny WS disconnected');
};

addEventListener('connect', e => {
  const port = e.ports[0];
  ports.push(port);

  broadcast('log', `Window / tab opened - Total: ${ports.length}`);

  port.addEventListener('message', function(e) {
    const message = e.data;

    switch (message.command) {
      case 'close': {
        ports = ports.filter(p => p !== port);
        broadcast('log', `Window / tab closed - Total: ${ports.length}`);
        break;
      }
      case 'connect': {
        connectToCoinyWS(message.data);
        break;
      }
      case 'disconnect': {
        disconnectFromCoinyWS();
        break;
      }
    }
  });

  port.start();
}, false);
