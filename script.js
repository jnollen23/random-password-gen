// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function CreateUserPassword() {
  //
  var complexity = {
    length: 8,          //-Length of required password
    lowercase: true,    //-Can it be lowercase letters
    uppercase: false,   //-Can it be uppercase letters
    numeric: false,     //-Can it be numbers
    specialChar: false,  //-Can there be special characters
    errorMessage: ``,    //-Error message if something goes wrong
    charsPossible: ``,   //-The list of possible characters to add
    password: ``         //-The generated password
  }

  GetPasswordRequirements(complexity);

  if (complexity.errorMessage === ``)
    DetermineCharacters(complexity)

  if (complexity.errorMessage === ``)
    GeneratePassword(complexity);

  if (complexity.errorMessage !== ``)
    WriteToScreen(complexity.errorMessage, "#password");
  else
    WriteToScreen(complexity.password, "#password");
}

// Write password to the #password input
function GetPasswordRequirements(complexity) {
  //Creating password requirements
  complexity.length = prompt("Please enter the length of the password to generate, between 8 and 128", complexity.length);
  //if length is not in the valid range let the user know they picked a bad range and stop the rest the questions
  if (complexity.length > 7 && complexity.length < 129) {
    complexity.lowercase = confirm("Should lowercase letters be allowed?");
    complexity.uppercase = confirm("Should uppercase letters be allowed?");
    complexity.numeric = confirm("Should numbers be allowed?");
    complexity.specialChar = confirm("Should special characters be allowed?");
    //if the user did not select any characters to include in the password let them know and stop the function
    if (!(complexity.lowercase | complexity.uppercase | complexity.numeric | complexity.specialChar)) {
      complexity.errorMessage = `No characters where selected for password`
    }
  }
  else complexity.errorMessage = `Password length was set to an incorrect ammount`;

  return complexity
}

function WriteToScreen(password, element) {
  var passwordText = document.querySelector(element);
  passwordText.value = password;
}

function DetermineCharacters(complexity) {
  if (complexity.lowercase) {
    complexity.charsPossible += `abcdefghijklmnopqrztuvwxyz`;
  }
  if (complexity.uppercase) {
    complexity.charsPossible += `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  }
  if (complexity.numeric) {
    complexity.charsPossible += `0123456789`;
  }
  if (complexity.specialChar) {
    complexity.charsPossible += `~!@#$%^&*()_+-=,./<>?;':"[]{}\\|\``
  }

  if (complexity.charsPossible === ``) complexity.errorMessage = `There was a problem adding values please try again.`
}

function GeneratePassword(complexity) {
  //for the length selected pick a random index of possible characters to add to password
  for (var i = 0; i < complexity.length; i++) {
    complexity.password += complexity.charsPossible.charAt(Math.floor(Math.random() * complexity.charsPossible.length));
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", CreateUserPassword);
