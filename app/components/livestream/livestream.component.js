const { WebSocketService } = require('../../services/websocket-services/websocket.service.js');

export class LiveStreamComponent extends HTMLElement {
    constructor() {
        super();
        
    WebSocketService()
    }
}


