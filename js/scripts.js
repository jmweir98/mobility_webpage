document.addEventListener('DOMContentLoaded', () => {
    // Full Width Slider
    const fullWidthSliderImages = document.querySelector('.full-width-slider .slider-images');
    if (fullWidthSliderImages) {
        const fullWidthImages = fullWidthSliderImages.querySelectorAll('img');
        let currentIndex = 0;
        const totalFullWidthImages = fullWidthImages.length;

        function showNextImage() {
            currentIndex = (currentIndex + 1) % totalFullWidthImages;
            const offset = -currentIndex * 100;
            fullWidthSliderImages.style.transform = `translateX(${offset}vw)`;
        }

        setInterval(showNextImage, 3000);
    }

    // Individual Sliders
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider) => {
        const sliderImages = slider.querySelector('.slider-images');
        const images = sliderImages.querySelectorAll('img');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');

        let currentIndex = 0;

        function updateSlider() {
            const offset = -currentIndex * 100;
            sliderImages.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        updateSlider();
    });

    // Handle "Add to Basket" button clicks
    document.querySelectorAll('.add-to-basket').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-item-name');
            const itemPrice = parseFloat(event.target.getAttribute('data-item-price'));
            const quantityInput = event.target.previousElementSibling;
            const quantity = parseInt(quantityInput.value, 10);

            addToBasket(itemName, itemPrice, quantity);
            window.location.href = 'cart.html'; 
        });
    });

    function addToBasket(itemName, itemPrice, quantity) {
        let basket = JSON.parse(localStorage.getItem('basket')) || [];

        let itemIndex = basket.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            basket[itemIndex].quantity += quantity;
        } else {         
            basket.push({ name: itemName, price: itemPrice, quantity });
        }
        localStorage.setItem('basket', JSON.stringify(basket));
    }

    // Date and Time Update
    function updateDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateTimeString = now.toLocaleString(undefined, options);
        const dateTimeElement = document.getElementById('dateTime');

        if (dateTimeElement) {
            dateTimeElement.textContent = dateTimeString;
        }
    }
    updateDateTime();

    setInterval(updateDateTime, 1000);

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (validateForm(name, email, message)) {
                const contactData = { name, email, message };
                localStorage.setItem('contactForm', JSON.stringify(contactData));
                alert('Form submitted successfully!');
                this.reset();
            }
        });
    }

    function validateForm(name, email, message) {
        let valid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const namePattern = /^[A-Za-z\s]+$/;

        if (name.trim() === '') {
            alert('Name is required');
            valid = false;
        } else if (!name.match(namePattern)) {
            alert('Name must contain only letters and spaces');
            valid = false;
        }

        if (!email.match(emailPattern)) {
            alert('Invalid email address');
            valid = false;
        }

        if (message.trim() === '') {
            alert('Message is required');
            valid = false;
        }

        return valid;
    }

    // Display Basket Items
    if (document.getElementById('basket-items')) {
        const basketItemsList = document.getElementById('basket-items');
        const totalPriceElement = document.getElementById('total-price');
        let basket = JSON.parse(localStorage.getItem('basket')) || [];

        if (basket.length === 0) {
            basketItemsList.innerHTML = '<li>Your basket is empty.</li>';
        } else {
            let totalPrice = 0;

            basket.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - £${item.price} x ${item.quantity}`;
                basketItemsList.appendChild(listItem);

                totalPrice += item.price * item.quantity;
            });

            totalPriceElement.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
        }
    }

    // Clear Basket Button 
    const clearBasketBtn = document.querySelector('.clear-basket-btn');
    if (clearBasketBtn) {
        clearBasketBtn.addEventListener('click', () => {
            localStorage.removeItem('basket'); 
            window.location.reload(); 
        });
    }

    // Checkout Button
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            triggerConfetti();
        });
    }

    function triggerConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        if (!confettiContainer) return;

        // Makes confetti
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function getRandomColor() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
