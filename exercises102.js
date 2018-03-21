//Print numbers in a range, each on new line using "for" loop
var javascript102 = {
    printNum: function printNumbers(start, end) {
    for (i = start; i<end+1; i++) {
       return console.log (i);
    }
},

//Print numbers in a range, each on new line using "while" loop
printNumNew: function printNumbersWhile(start, end) {
    var count = start;
    while (count<end+1) {
        console.log(count);
        count++;
    }
},

//Print square of asterisks
printSquare: function printSquare(num) {
    for (i = 0; i<num; i++) {
        console.log("*".repeat(num));
    }
    return 
},

//Print hollow square of asterisks
printBox: function printBox(w, h) {
    var i = h;
    var middleString = "*"+ "_".repeat(w-2)+ "*";
    var topBottomString = "*".repeat(w);
    for (i = 0; i<h+1; i++) {
        if (i === 0 || i === h) {
            console.log(topBottomString);
        } else {
            console.log(middleString);
        } 
    }
},


//Print Digital Crafts Banner
printBanner: function printBanner(string) {
    var bannerLength = string.length + 4;
    var stars = "*".repeat(bannerLength);
    var bannerText = "*"+" "+string+" "+"*";
    console.log(stars);
    console.log(bannerText);
    console.log(stars);
},



//Factor a number
printFactors: function factors(num) {
    var factorArray = [];
    for (i = 0; i<num+1; i++) {
        if (num%i === 0) {
            factorArray.push(i, num/i);
        }
    }
    factorArray = factorArray.sort();
    newArray = [];
    for (i=0; i<factorArray.length; i++) {
        if (newArray.indexOf(factorArray[i]) === -1) {
            newArray.push(factorArray[i]);
        }
    }
    return newArray;
},


//Caesar Cipher

caesar: function caesarCipher(string, diff) {
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
    "w", "x", "y", "z"];
    var returnString = "";
    string = string.toLowerCase();
    for (var i = 0; i < string.length; i++) {
        //for simplicity, create var to store character at i
        var letter = string.charAt(i);
        //for simplicity, create var to store the index in the alphabet of letter
        var alphaIndex = alphabet.indexOf(letter);
        //if the character in the string at index i is a letter in alphabet
        if (alphaIndex >= 0) {
            //add the diff to the current index to find the new index
            newIndex = alphaIndex + diff;
            //include a contingency if the new index exceeds our indices
            if (newIndex >= 26) {
                //subtract 26 to find the new index
                newIndex = alphaIndex + diff - 26;
            }
            //define new letter by adding the difference in indices
            var newLetter = alphabet[newIndex];
            //add newly defined letter to new string
            returnString += newLetter;
        }
        else {
            returnString += letter;
        }
    }
    console.log(returnString);
},



rockPS: function rockPaperScissors(player1, player2) {
    if (player1 === player2) {
        return 'draw';
    }
    if (player1 === 'rock') {
        if (player2 === 'scissors') {
            return 'player 1 wins';
        }
        if (player2 === 'paper') {
            return 'player 2 wins';
    }
}
    if (player1 === 'paper') {
        if (player2 === 'rock') {
            return 'player 1 wins'
        }
        if (player2 === 'scissors') {
            return 'player 1 wins'
        }
    }
    if (player1 === 'scissors') {
        if (player2 === 'paper') {
            return 'player 1 wins'
        }
        if (player2 === 'rock') {
            return 'player 2 wins'
        }
    }
}

}

exports.functionList = javascript102;