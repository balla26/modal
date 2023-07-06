// Get all the phone number input fields
const phoneNumberInputs = document.querySelectorAll('.input-bx input');

// Get the "Next" button
const nextButton = document.querySelector('.otp-card button');

// Event listener for the phone number input fields
phoneNumberInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (areAllPhoneNumberInputsValid() && areAllPhoneNumberInputsFilled()) {
      nextButton.removeAttribute('disabled');
    } else {
      nextButton.setAttribute('disabled', true);
    }
  });
});

// Function to check if all phone number inputs are filled
function areAllPhoneNumberInputsFilled() {
  let allFilled = true;
  phoneNumberInputs.forEach((input) => {
    if (input.value.length === 0) {
      allFilled = false;
    }
  });
  return allFilled;
}

// Function to check if all phone number inputs are valid 10-digit numbers
function areAllPhoneNumberInputsValid() {
  let allValid = true;
  phoneNumberInputs.forEach((input) => {
    const phoneNumber = input.value;
    if (phoneNumber.length !== 10 || !/^[0-9]+$/.test(phoneNumber)) {
      allValid = false;
    }
  });
  return allValid;
}

// Get all the OTP input fields
const otpInputs = document.querySelectorAll('.otp-card-inputs input');

// Get the "Verify" button
const verifyButton = document.querySelector('#otpVerificationCard button');


// Event listener for the OTP input fields
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      handleOTPInput(e, input, index);
    });
  
    // Additional event listener to handle backspace key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '') {
        const prevInput = otpInputs[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    });
  });
  

// Function to handle OTP input
function handleOTPInput(e, input, index) {
  const currentElement = e.target;
  const inputValue = currentElement.value;
  const isValidDigit = /^\d$/.test(inputValue);

  if (isValidDigit) {
    if (inputValue !== '') {
      currentElement.value = inputValue.slice(-1); // Only keep the last digit
    }

    const nextInput = otpInputs[index + 1];
    const prevInput = otpInputs[index - 1];

    if (nextInput && inputValue !== '') {
      nextInput.focus(); // Move focus to the next input field
    } else if (prevInput && inputValue === '') {
      e.preventDefault(); // Prevent the default behavior of backspace
      prevInput.focus(); // Move focus to the previous input field
    }
  } else if (inputValue === '' && e.inputType === 'deleteContentBackward') {
    const prevInput = otpInputs[index - 1];
    if (prevInput) {
      prevInput.value = ''; // Clear the value of the previous input field
      prevInput.focus(); // Move focus to the previous input field
    }
  } else {
    currentElement.value = ''; // Clear the input if it's not a valid digit
  }

  if (areAllOTPInputsFilled()) {
    verifyButton.removeAttribute('disabled');
  } else {
    verifyButton.setAttribute('disabled', true);
  }
}

// Function to check if all OTP inputs are filled
function areAllOTPInputsFilled() {
  let allFilled = true;
  otpInputs.forEach((input) => {
    if (input.value.length === 0) {
      allFilled = false;
    }
  });
  return allFilled;
}

document.getElementById('nextButton').addEventListener('click', function() {
  // Get the entered mobile number
  var numberInput = document.querySelector(".input-bx input[type='text']");
  var mobileNumber = numberInput.value;

  // Check if the mobile number is valid
  if (mobileNumber.length === 10 && /^\d+$/.test(mobileNumber)) {
    // Hide the current section
    var currentSection = document.querySelector('.otp-card');
    currentSection.style.display = 'none';
    var exclamationIcon = document.getElementById('exclamationIcon');
    exclamationIcon.style.display = 'none';

    // Show the OTP verification section
    var otpVerificationSection = document.getElementById('otpVerificationCard');
    otpVerificationSection.style.display = 'block';
    var checkIcon = document.getElementById('checkIcon');
    checkIcon.style.display = 'block';

    // Autofocus on the first OTP input field
    var firstOTPInput = document.querySelector('.otp-card-inputs input');
    firstOTPInput.focus();
  }
});
