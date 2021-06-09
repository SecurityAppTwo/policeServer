var express = require('express');
var router = express.Router();
router.get('/status', (request, response) => response.json({ clients: clients.length }));

let clients = [];
let facts = [];

function eventsHandler(request, response, next) {
    console.log("eventsHandler")
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);
    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });

}

router.get('/events', eventsHandler);


const sendEventsToAll=(newFact)=> {
    console.log("sendEventsToAll");
    clients.forEach(client => {
        client.response.write(`data: ${JSON.stringify(newFact)}\n\n`)
    })
}

// async function addFact(request, respsonse, next) {
//     const newFact = request.body;
//     facts.push(newFact);
//     respsonse.json(newFact)
//     return sendEventsToAll(newFact);
// }

// router.post('/fact', addFact);

exports.router = router;
exports.sendEventsToAll = sendEventsToAll;
