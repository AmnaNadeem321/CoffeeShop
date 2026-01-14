// ==================== Authentication System ====================
// This file handles signup, login, OTP verification, and password reset

// ==================== Utility Functions ====================

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling;
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function validatePassword(password) {
    return password.length >= 6;
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

// Show success message
function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    successElement.textContent = message;
    successElement.classList.add('show');
    
    setTimeout(() => {
        successElement.classList.remove('show');
    }, 5000);
}

// ==================== SIGNUP FUNCTIONALITY ====================

let signupOTP = null;
let signupEmail = null;
let signupTimer = null;

// Handle signup form submission
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            showError('signupError', 'Please fill in all required fields');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('signupError', 'Please enter a valid email address');
            return;
        }
        
        if (!validatePassword(password)) {
            showError('signupError', 'Password must be at least 6 characters long');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('signupError', 'Passwords do not match');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.find(u => u.email === email);
        
        if (userExists) {
            showError('signupError', 'An account with this email already exists');
            return;
        }
        
        // Generate and store OTP
        signupOTP = generateOTP();
        signupEmail = email;
        
        // Store temporary signup data
        sessionStorage.setItem('tempSignupData', JSON.stringify({
            fullName,
            email,
            phone,
            password
        }));
        
        // Simulate sending OTP (in real app, this would be an API call)
        console.log('OTP for signup:', signupOTP); // For testing purposes
        alert(`OTP sent to ${email}\n\nFor testing, your OTP is: ${signupOTP}`);
        
        // Show OTP section
        document.getElementById('signupFormSection').style.display = 'none';
        document.getElementById('otpSection').classList.add('active');
        document.getElementById('displayEmail').textContent = email;
        
        // Start OTP timer
        startSignupTimer();
        
        // Focus first OTP input
        document.querySelector('.otp-input').focus();
    });
}

// Handle OTP input auto-focus
document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
    input.addEventListener('input', function() {
        if (this.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Verify OTP for signup
function verifySignupOTP() {
    const otpInputs = document.querySelectorAll('#otpSection .otp-input');
    const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');
    
    if (enteredOTP.length !== 6) {
        showError('otpError', 'Please enter complete 6-digit OTP');
        return;
    }
    
    if (enteredOTP !== signupOTP) {
        showError('otpError', 'Invalid OTP. Please try again');
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        return;
    }
    
    // OTP verified, create user account
    const tempData = JSON.parse(sessionStorage.getItem('tempSignupData'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const newUser = {
        id: Date.now().toString(),
        fullName: tempData.fullName,
        email: tempData.email,
        phone: tempData.phone,
        password: tempData.password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clear temporary data
    sessionStorage.removeItem('tempSignupData');
    signupOTP = null;
    signupEmail = null;
    
    // Clear timer
    if (signupTimer) {
        clearInterval(signupTimer);
    }
    
    // Success message and redirect
    alert('Account created successfully! Please login to continue.');
    window.location.href = 'login.html';
}

// Resend OTP for signup
function resendSignupOTP() {
    signupOTP = generateOTP();
    console.log('New OTP for signup:', signupOTP); // For testing
    alert(`New OTP sent to ${signupEmail}\n\nFor testing, your OTP is: ${signupOTP}`);
    
    // Clear OTP inputs
    document.querySelectorAll('#otpSection .otp-input').forEach(input => input.value = '');
    document.querySelector('.otp-input').focus();
    
    // Restart timer
    startSignupTimer();
}

// Start timer for signup OTP resend
function startSignupTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const resendBtn = document.getElementById('resendBtn');
    
    resendBtn.disabled = true;
    timerElement.textContent = `(${timeLeft}s)`;
    
    signupTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `(${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(signupTimer);
            resendBtn.disabled = false;
            timerElement.textContent = '';
        }
    }, 1000);
}

// ==================== LOGIN FUNCTIONALITY ====================

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validation
        if (!email || !password) {
            showError('loginError', 'Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('loginError', 'Please enter a valid email address');
            return;
        }
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            showError('loginError', 'Invalid email or password');
            return;
        }
        
        // Set current user session
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        }));
        
        // Success message and redirect
        alert('Login successful!');
        
        // Check if there's a redirect URL
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        
        if (redirect) {
            window.location.href = redirect;
        } else {
            window.location.href = 'index.html';
        }
    });
}

// ==================== FORGOT PASSWORD FUNCTIONALITY ====================

let resetOTP = null;
let resetEmail = null;
let resetTimer = null;

// Handle email form submission for password reset
if (document.getElementById('emailForm')) {
    document.getElementById('emailForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        
        if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        
        if (!user) {
            showError('emailError', 'No account found with this email address');
            return;
        }
        
        // Generate and store OTP
        resetOTP = generateOTP();
        resetEmail = email;
        
        console.log('OTP for password reset:', resetOTP); // For testing
        alert(`OTP sent to ${email}\n\nFor testing, your OTP is: ${resetOTP}`);
        
        // Show OTP section
        document.getElementById('emailSection').style.display = 'none';
        document.getElementById('otpSection').classList.add('active');
        document.getElementById('displayEmail').textContent = email;
        
        // Start timer
        startResetTimer();
        
        // Focus first OTP input
        document.querySelector('.otp-input').focus();
    });
}

// Verify OTP for password reset
function verifyOTPForReset() {
    const otpInputs = document.querySelectorAll('#otpSection .otp-input');
    const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');
    
    if (enteredOTP.length !== 6) {
        showError('otpError', 'Please enter complete 6-digit OTP');
        return;
    }
    
    if (enteredOTP !== resetOTP) {
        showError('otpError', 'Invalid OTP. Please try again');
        otpInputs.forEach(input => input.value = '');
        otpInputs[0].focus();
        return;
    }
    
    // OTP verified, show new password section
    document.getElementById('otpSection').classList.remove('active');
    document.getElementById('newPasswordSection').classList.add('active');
    
    // Clear timer
    if (resetTimer) {
        clearInterval(resetTimer);
    }
}

// Resend OTP for password reset
function resendOTPForReset() {
    resetOTP = generateOTP();
    console.log('New OTP for password reset:', resetOTP); // For testing
    alert(`New OTP sent to ${resetEmail}\n\nFor testing, your OTP is: ${resetOTP}`);
    
    // Clear OTP inputs
    document.querySelectorAll('#otpSection .otp-input').forEach(input => input.value = '');
    document.querySelector('.otp-input').focus();
    
    // Restart timer
    startResetTimer();
}

// Start timer for reset OTP resend
function startResetTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const resendBtn = document.getElementById('resendBtn');
    
    resendBtn.disabled = true;
    timerElement.textContent = `(${timeLeft}s)`;
    
    resetTimer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `(${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(resetTimer);
            resendBtn.disabled = false;
            timerElement.textContent = '';
        }
    }, 1000);
}

// Handle password reset form submission
if (document.getElementById('resetPasswordForm')) {
    document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        if (!validatePassword(newPassword)) {
            showError('passwordError', 'Password must be at least 6 characters long');
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            showError('passwordError', 'Passwords do not match');
            return;
        }
        
        // Update user password
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === resetEmail);
        
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Clear reset data
            resetOTP = null;
            resetEmail = null;
            
            // Success message and redirect
            showSuccess('successMessage', 'Password reset successful!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showError('passwordError', 'An error occurred. Please try again.');
        }
    });
}

// ==================== LOGOUT FUNCTIONALITY ====================

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// ==================== CHECK AUTHENTICATION STATUS ====================

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// ==================== PROTECT PAGES ====================

function requireAuth(redirectTo = 'login.html') {
    const user = checkAuth();
    if (!user) {
        const currentPage = window.location.pathname.split('/').pop();
        window.location.href = `${redirectTo}?redirect=${currentPage}`;
        return false;
    }
    return true;
}
