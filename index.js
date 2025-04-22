document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');

    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function() {
        cartDropdown.classList.remove('show');
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                quantity: 1
            };

            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            updateCart();
            showAddedToCartMessage(product.name);
        });
    });

    function updateCart() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    }

    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.className = 'alert alert-success position-fixed';
        message.style.top = '20px';
        message.style.right = '20px';
        message.style.zIndex = '1000';
        message.textContent = `${productName} added to cart!`;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    document.getElementById('remindBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const confirmed = confirm("Would you like to set a reminder?");
        if (confirmed) {
            alert("Yes! We'll remind you later.");
        }
    });
});