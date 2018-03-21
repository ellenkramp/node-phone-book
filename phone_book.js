const fs = require('fs');

// var readline = require('linebyline'),
//     rl = readline('./phonebook.txt');

var directory = "Electronic Phone Book \
===================== \
1. Look up an entry \
2. Set an entry \
3. Delete an entry \
4. List all entries \
5. Quit \
What do you want to do (1-5)?"

fs.writeFile('phonebook_app.txt', 'utf8', (err, data) => {

});

fs.readFile('phonebook_app.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// var startPhonebook = function() {
//     readline(directory);
//     rl.on('Choose an option', function(option) {
//         if (option === 1) {
//             // ...
//             startPhonebook();
//         } else if (option === 5) {
//             //Quit program
//             rl.close();
//             return;
//         }
//         });
//     }
    
//     startPhonebook();