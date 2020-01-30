#!/usr/bin/env node

var webSocket = new WebSocket('ws://localhost:8090/assinatura');

webSocket.onopen = function (openEvent) {
    document.getElementById("matricula").value = '{"hostname": "pdv_1", "filial": 101, "idAssinatura": 1}';
    console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
};
webSocket.onclose = function (closeEvent) {
    console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
    setTimeout(function () { webSocket = new WebSocket('ws://localhost:8090/assinatura'); }, 6000);
};
webSocket.onerror = function (errorEvent) {
    console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
    setTimeout(function () { webSocket = new WebSocket('ws://localhost:8090/assinatura'); }, 6000);
};
webSocket.onmessage = function (messageEvent) {
    var wsMsg = messageEvent.data;
    document.getElementById("incomingMsgOutput").value += "Incoming message: " + messageEvent.data + "\n"
    console.log("WebSocket MESSAGE: " + wsMsg);
};

function sendMessage() {
    var message = document.getElementById("matricula").value;
    document.getElementById("incomingMsgOutput").value += "Output message: " +  message + "\n"
    webSocket.send(message);
}
