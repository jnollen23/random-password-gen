// Assignment code here
//variables to save selections
var length = 8;
var complexity = {
  lowercase: true,
  uppercase: false,
  numeric: false,
  specialChar: false
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  //Creating password requirements
  length = prompt("Please enter the length of the password to generate, between 8 and 128", length);
  complexity.lowercase = confirm("Should lowercase letters be allowed?");
  complexity.uppercase = confirm("Should uppercase letters be allowed?");
  complexity.numeric = confirm("Should numbers be allowed?");
  complexity.specialChar = confirm("Should special characters be allowed?");

  //Passing requirements to generator function
  var password = generatePassword(length, complexity);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function generatePassword(length, complexity) {
  var genPassword = `Input error please try again.`;
  var charsPossible = ``;

  //User input checking, is the password length valid and did they select at least 1 character type
  if (length > 7 && length < 129 && (complexity.lowercase | complexity.uppercase | complexity.numeric | complexity.specialChar)) {
    genPassword = ``;
    if (complexity.lowercase) {
      charsPossible += `abcdefghijklmnopqrztuvwxyz`;
    }
    if (complexity.uppercase) {
      charsPossible += `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    }
    if (complexity.numeric) {
      charsPossible += `0123456789`;
    }
    if (complexity.specialChar) {
      charsPossible += `~!@#$%^&*()_+-=,./<>?;':"[]{}\\|\``
    }

    //for the length selected pick a random index of possible characters to add to password
    for (var i = 0; i < length; i++) {
      genPassword += charsPossible.charAt(Math.floor(Math.random() * charsPossible.length));
    }
  }

  return genPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
