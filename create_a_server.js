var http = require('http');
var contacts = 
[
    {
        id: 0,
        first: 'Carry',
        last: 'Dunwood',
        phone: '1234567890'
    },
    {
        id: 1,
        first: 'Ellen',
        last: 'Kramp',
        phone: '7703755846'
    },
    {
        id: 2,
        first: 'Tommy',
        last: 'Gringle',
        phone: '5236459001'
    }
];
var lastId = 0;
var findContact = function(id) {
    id = parseInt(id, 10);
    return contacts.find(function(contact) {
        return contact.id === id;
    });
};

var deleteContact = function(contactToDelete) {
    contacts = contacts.filter(function(contact) {
        return contact !== contactToDelete;
    });
};

var readBody = function(request, callback) {
    var body = '';
    request.on('data', function(chunk) {
        body += chunk.toString();
    });
    request.on('end', function() {
        callback(body);
    });
};

var matches = function(request, method, path) {
    return request.method === method &&
        request.url.startsWith(path);
};

var getSuffix = function(fullUrl, prefix) {
    return fullUrl.slice(prefix.length);
};

var getContacts = function(request, response) {
    response.end(JSON.stringify(contacts));
};

var postContacts = function(request, response) {
    readBody(request, function(body) {
        var contact = JSON.parse(body);
        contact.id = ++lastId;
        console.log(contact);
        contacts.push(contact);
        response.end('Created contact!');
    });
};

var deleteContact = function(request, response) {
    var id = getSuffix(request.url, '/contacts/');
    var contact = findContact(id);
    deleteContact(contact);
    console.log(contact);
    response.end('Deleted contact!');
};

var getContact = function(request, response) {
    var id = getSuffix(request.url, '/contacts/');
    var contact = findContact(id);
    response.end(JSON.stringify(contact));
};

var putContact = function(request, response) {
    var id = getSuffix(request.url, '/contacts/');
    var contact = findContact(id);
    readBody(request, function(body) {
        var newParams = JSON.parse(body);
        Object.assign(contact, newParams);
        response.end('Updated contact!');
    });
};

var notFound = function(request, response) {
    response.statusCode = 404;
    response.end('404, nothing here!');
};

var routes = [
{ method: 'DELETE', path: '/contacts/', handler: deleteContact },
{ method: 'GET', path: '/contacts/', handler: getContact },
{ method: 'PUT', path: '/contacts/', handler: putContact },
{ method: 'GET', path: '/contacts', handler: getContacts },
{ method: 'POST', path: '/contacts', handler: postContacts }
];

var server = http.createServer(function(request, response) {
    console.log(request.method, request.url);
    var route = routes.find(function(route) {
        return matches(request, route.method, route.path);
    });
    (route ? route.handler : notFound)(request, response);
});
server.listen(3000);