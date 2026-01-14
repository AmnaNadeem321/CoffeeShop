// Handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, this would be sent to a server)
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    e.target.reset();
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 3rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        animation: fadeIn 0.3s ease;
    `;
    
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 4rem; color: #4caf50; margin-bottom: 1rem;"></i>
        <h2 style="color: var(--dark-color); margin-bottom: 1rem;">Message Sent!</h2>
        <p style="color: #666; margin-bottom: 2rem;">Thank you for contacting us. We'll get back to you soon!</p>
        <button onclick="this.parentElement.remove()" class="btn btn-primary">
            Close
        </button>
    `;
    
    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
    `;
    backdrop.onclick = () => {
        backdrop.remove();
        successDiv.remove();
    };
    
    document.body.appendChild(backdrop);
    document.body.appendChild(successDiv);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        backdrop.remove();
        successDiv.remove();
    }, 5000);
}
