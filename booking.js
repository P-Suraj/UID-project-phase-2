// Function to navigate back to the home page
function goHome() {
    window.location.href = "index.html";
}

// Function to show a custom message box (instead of alert)
function showMessageBox(title, message, isSuccess = true) {
    const modalBackdrop = document.getElementById('confirmation-modal-backdrop');
    const modalTitle = document.getElementById('confirmation-modal-title');
    const messageContainer = document.getElementById('confirmation-message');
    const goHomeButton = modalBackdrop.querySelector('.go-home-btn');
    const mainContent = document.getElementById('main-content'); // Reference to the main content wrapper

    modalTitle.textContent = title;
    messageContainer.innerHTML = message;

    // Adjust button visibility and modal styling based on success/error
    if (isSuccess) {
        goHomeButton.style.display = 'block';
        modalTitle.style.color = 'var(--accent-green)'; // Green for success
        modalBackdrop.querySelector('.modal-box').style.borderColor = 'var(--accent-green)';
    } else {
        goHomeButton.style.display = 'none'; // Hide "Go to Home" button for validation errors
        modalTitle.style.color = 'var(--accent-red)'; // Red for errors
        modalBackdrop.querySelector('.modal-box').style.borderColor = 'var(--accent-red)';
    }

    modalBackdrop.classList.add('show'); // Use class to trigger transition
    mainContent.classList.add('blurred'); // Apply blur to the main content wrapper
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to hide the custom message box
function hideConfirmationModal() {
    document.getElementById('confirmation-modal-backdrop').classList.remove('show');
    document.getElementById('main-content').classList.remove('blurred');
    document.body.style.overflow = ''; // Restore scrolling
}

// Function to update booking steps UI
function updateBookingSteps(currentStepId) {
    const steps = ['step-cart', 'step-details', 'step-confirm'];
    let currentStepIndex = steps.indexOf(currentStepId);

    steps.forEach((stepId, index) => {
        const stepElement = document.getElementById(stepId);
        const circle = stepElement.querySelector('.circle');
        const connector = stepElement.nextElementSibling; // Get the next sibling (connector)

        if (index < currentStepIndex) {
            stepElement.classList.add('completed');
            stepElement.classList.remove('active');
            circle.innerHTML = '<i class="fas fa-check"></i>';
        } else if (index === currentStepIndex) {
            stepElement.classList.add('active');
            stepElement.classList.remove('completed');
            circle.textContent = (index + 1).toString();
        } else {
            stepElement.classList.remove('active', 'completed');
            circle.textContent = (index + 1).toString();
            circle.innerHTML = (index + 1).toString(); // Reset icon if present
        }

        // Handle connector active state
        if (connector && connector.classList.contains('step-connector')) {
            if (index < currentStepIndex) {
                connector.classList.add('next-active');
            } else {
                connector.classList.remove('next-active');
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Initial step update for "Details" page
    updateBookingSteps('step-details');

    const bookingCartItemsContainer = document.getElementById('booking-cart-items');
    const bookingCartTotalSpan = document.getElementById('booking-cart-total');
    const bookingForm = document.getElementById('booking-form');

    // Retrieve cart data from localStorage
    const cartData = localStorage.getItem('cart');
    let cart = [];

    if (cartData) {
        try {
            cart = JSON.parse(cartData);
            if (cart.length === 0) {
                bookingCartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty. Please go back to select services.</p>';
                bookingCartTotalSpan.textContent = '0';
                bookingForm.style.display = 'none';
                updateBookingSteps('step-cart'); // Indicate cart is empty
            } else {
                renderBookingCart();
            }
        } catch (e) {
            console.error("Error parsing cart data from localStorage:", e);
            bookingCartItemsContainer.innerHTML = '<p class="empty-cart-message">Error loading cart data. Please clear your browser cache and try again.</p>';
            bookingCartTotalSpan.textContent = '0';
            bookingForm.style.display = 'none';
        }
    } else {
        bookingCartItemsContainer.innerHTML = '<p class="empty-cart-message">No items in cart. Please go back to select services.</p>';
        bookingCartTotalSpan.textContent = '0';
        bookingForm.style.display = 'none';
    }

    // Function to render cart items on the booking page
    function renderBookingCart() {
        bookingCartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'booking-cart-item';
            // Add a span for service name and another for price for better alignment
            itemDiv.innerHTML = `<span>${item.service}</span> <span>₹${item.price}</span>`;
            bookingCartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });

        bookingCartTotalSpan.textContent = `${total}`;
    }

    // Handle form submission
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const pincode = document.getElementById('pincode').value.trim();

        if (!name || !phone || !address || !city || !pincode) {
            showMessageBox('Validation Error', 'Please fill in all address details before placing your order.', false);
            return;
        }
        if (!/^[0-9]{10}$/.test(phone)) {
            showMessageBox('Validation Error', 'Please enter a valid 10-digit phone number.', false);
            return;
        }
        if (!/^[0-9]{6}$/.test(pincode)) {
            showMessageBox('Validation Error', 'Please enter a valid 6-digit pincode.', false);
            return;
        }

        let confirmationDetails = `
            <strong>Services Booked:</strong><br>
            ${cart.map(item => `- ${item.service} (₹${item.price})`).join('<br>')}<br><br>
            <strong>Total Amount:</strong> ₹${bookingCartTotalSpan.textContent}<br><br>
            <strong>Customer Details:</strong><br>
            Name: ${name}<br>
            Phone: ${phone}<br>
            Address: ${address}, ${city} - ${pincode}
        `;

        showMessageBox(
            'Order Confirmed!',
            `Your order has been placed successfully! Our team will contact you shortly to confirm the details.<br><br>${confirmationDetails}<br><br>Thank you for choosing ServEaze!`,
            true
        );

        localStorage.removeItem('cart');
        bookingForm.reset();
        updateBookingSteps('step-confirm'); // Update UI to "Confirmation" step
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    navToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.getElementById('main-content').classList.add('blurred');
        document.body.style.overflow = 'hidden';
    });

    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.getElementById('main-content').classList.remove('blurred');
        document.body.style.overflow = '';
    });
});
