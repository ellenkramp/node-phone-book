var http = require('http');
var fs = require('fs');

var contacts = [
{id: 0, first: 'Jonathan', last: 'Martin', email:
'jonathan@digitalcrafts.com'}
];

var lastId = 0;
var findContact = function(id) {
id = parseInt(id, 10);
    return contacts.find(function(contact) {
    return contact.id === id;
});
};
var removeContact = function(contactToDelete) {
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
/*
Returns false if it doesn't match,
but if it does match, returns an array
of the capture groups.
*/
var matches = function(request, method, path) {
    if (request.method === method) {
        var match = path.exec(request.url);
    if (match) {
        return match.slice(1);
    }
}
        return false;
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

var deleteContact = function(request, response, [id]) {
    var contact = findContact(id);
    removeContact(contact);
    console.log(contact);
    response.end('Deleted contact!');
    };

var getContact = function(request, response, [id]) {
    var contact = findContact(id);
    response.end(JSON.stringify(contact));
};
var putContact = function(request, response, [id]) {
    var contact = findContact(id);
    readBody(request, function(body) {
    var newParams = JSON.parse(body);
    Object.assign(contact, newParams);
    response.end('Updated contact!');
});
};

var homePage = function(request, response) {
    console.log(request);
    fs.readFile(`./Phonebook_Frontend/index.html`, 'utf8', function (err, data) {
        if (err) throw err;
        response.end(data);
});
};

var notFound = function(request, response) {
    response.statusCode = 404;
    response.end('404, nothing here!');
    };

var routes = [
{ method: 'DELETE', path: /^\/contacts\/([0-9]+)\/?$/, handler:
deleteContact },
{ method: 'GET', path: /^\/contacts\/([0-9]+)\/?$/, handler: getContact },
{ method: 'PUT', path: /^\/contacts\/([0-9]+)\/?$/, handler: putContact },
{ method: 'GET', path: /^\/contacts\/?$/, handler: getContacts },
{ method: 'POST', path: /^\/contacts\/?$/, handler: postContacts },
{ method: 'GET', path: /(index.html)/, handler: homePage}
];

var notFoundRoute = { handler: notFound };

var server = http.createServer(function(request, response) {
    let matchedRoute = notFoundRoute;
    let params = [];
    for (let route of routes) {
    let match = matches(request, route.method, route.path);
    if (match) {
        matchedRoute = route;
        params = match;
        break;
        }
}
matchedRoute.handler(request, response, params);
});

server.listen(3000);