
function goHome() {
    window.location.href = "index.html";
}

function showMessageBox(title, message, isSuccess = true) {
    const modalBackdrop = document.getElementById('confirmation-modal-backdrop');
    const modalTitle = document.getElementById('confirmation-modal-title');
    const messageContainer = document.getElementById('confirmation-message');
    const goHomeButton = modalBackdrop.querySelector('.go-home-btn');
    const mainContent = document.getElementById('main-content');

    modalTitle.textContent = title;
    messageContainer.innerHTML = message;

    if (isSuccess) {
        goHomeButton.style.display = 'block';
        modalTitle.style.color = 'var(--accent-green)';
        modalBackdrop.querySelector('.modal-box').style.borderColor = 'var(--accent-green)';
    } else {
        goHomeButton.style.display = 'none';
        modalTitle.style.color = 'var(--accent-red)';
        modalBackdrop.querySelector('.modal-box').style.borderColor = 'var(--accent-red)';
    }

    modalBackdrop.classList.add('show');
    mainContent.classList.add('blurred');
    document.body.style.overflow = 'hidden';
}

function hideConfirmationModal() {
    document.getElementById('confirmation-modal-backdrop').classList.remove('show');
    document.getElementById('main-content').classList.remove('blurred');
    document.body.style.overflow = '';
}

function updateBookingSteps(currentStepId) {
    const steps = ['step-cart', 'step-details', 'step-confirm'];
    let currentStepIndex = steps.indexOf(currentStepId);

    steps.forEach((stepId, index) => {
        const stepElement = document.getElementById(stepId);
        const circle = stepElement.querySelector('.circle');
        const connector = stepElement.nextElementSibling;

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
            circle.innerHTML = (index + 1).toString();
        }

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
    updateBookingSteps('step-details');

    const bookingCartItemsContainer = document.getElementById('booking-cart-items');
    const bookingCartTotalSpan = document.getElementById('booking-cart-total');
    const bookingForm = document.getElementById('booking-form');

    const cartData = localStorage.getItem('cart');
    let cart = [];

    if (cartData) {
        try {
            cart = JSON.parse(cartData);
            if (cart.length === 0) {
                bookingCartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty. Please go back to select services.</p>';
                bookingCartTotalSpan.textContent = '0';
                bookingForm.style.display = 'none';
                updateBookingSteps('step-cart');
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

    function renderBookingCart() {
        bookingCartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'booking-cart-item';
            itemDiv.innerHTML = `<span>${item.service}</span> <span>₹${item.price}</span>`;
            bookingCartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });

        bookingCartTotalSpan.textContent = `${total}`;
    }

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
        updateBookingSteps('step-confirm');
    });

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
