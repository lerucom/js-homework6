// nodemon, live-server, browser-sync, webpack-dev
// ctrl+leftmouse на 'restify' открывает его файл
const restify = require('restify');
const { BadRequestError, NotFoundError } = require('restify-errors');
const port = process.env.PORT || 5000;

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.pre((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * - разрешаем всем
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { // Preflight
        res.send();
        next(false);
        return;
    }
    next();
});

let nextId = 1;
const items = [];

// '/items', GET
server.get('/items', (req, res, next) => {
    res.send(items);
    next();
});

server.post('/items', (req, res, next) => {
    const {id} = req.body;
    if (typeof id !== 'number') {
        next(new BadRequestError('Invalid JSON, must contain id'));
        return;
    }

    if (id === 0) {
        req.body.id = nextId++;
        items.push(req.body);
    } else {
        const index = items.findIndex((value) => {
            return value.id === id;
        });

        if (index === -1) {
            next(new NotFoundError('Item not found'));
            return;
        }

        items[index] = req.body;
    }

    res.send();
    next();
    console.log('PUSH');
    console.log(items);
});

server.del('/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return next(new BadRequestError('Invalid id'));
    }

    const index = items.findIndex((value) => {
        return value.id === id;
    });

    if (index === -1) {
        next(new NotFoundError('Item not found'));
        return;
    }

    items.splice(index, 1);
    res.send();
    next();
});

server.listen(port, () => {
    console.log('server started');
});
