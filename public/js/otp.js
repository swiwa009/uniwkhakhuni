// Dummy OTP - Just visual effects, no real validation
const otpInputs = document.querySelectorAll('.otp-input');
const submitButton = document.getElementById('submitButton');
const resendButton = document.getElementById('resendButton');
const countdownElement = document.getElementById('countdown');
const timerDisplay = document.getElementById('timerDisplay');

// Timer variables
let countdownTimer;
let timeLeft = 60;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupOTPInputs();
    startCountdown();
});

// Setup OTP Input Fields - Basic visual only
function setupOTPInputs() {
    otpInputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', function(e) {
            const value = e.target.value;

            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }

            // Add filled class
            if (value) {
                e.target.classList.add('filled');
            } else {
                e.target.classList.remove('filled');
            }

            // Auto-focus next input
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            // Enable/disable submit button
            checkAllFilled();
        });

        // Handle keydown for backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
                otpInputs[index - 1].value = '';
                otpInputs[index - 1].classList.remove('filled');
                checkAllFilled();
            }
        });

        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();

            if (/^\d{6}$/.test(pastedData)) {
                const digits = pastedData.split('');
                digits.forEach((digit, i) => {
                    if (otpInputs[i]) {
                        otpInputs[i].value = digit;
                        otpInputs[i].classList.add('filled');
                    }
                });
                otpInputs[otpInputs.length - 1].focus();
                checkAllFilled();
            }
        });

        // Prevent non-numeric characters
        input.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
}

// Check if all inputs are filled
function checkAllFilled() {
    const allFilled = Array.from(otpInputs).every(input => input.value !== '');
    submitButton.disabled = !allFilled;
    return allFilled;
}

// Start countdown timer
function startCountdown() {
    timeLeft = 60;
    resendButton.disabled = true;
    timerDisplay.style.display = 'block';

    countdownTimer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            resendButton.disabled = false;
            timerDisplay.style.display = 'none';
        }
    }, 1000);
}

// Resend OTP (dummy - just resets timer)
resendButton.addEventListener('click', function() {
    if (!resendButton.disabled) {
        // Clear inputs
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
        });
        checkAllFilled();

        // Reset timer
        startCountdown();

        // Focus first input
        otpInputs[0].focus();
    }
});

// Form submission (dummy - does nothing)


// Focus first input on load
otpInputs[0].focus();

// Prevent zoom on iOS
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});
