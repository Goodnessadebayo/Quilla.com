function addToCart(element) {
    let productCard = element.closest('.portfolio-item');
    let productId = productCard.getAttribute('data-id');
    let productName = productCard.getAttribute('data-name');
    let productPrice = parseFloat(productCard.getAttribute('data-price').replace(",", ""));
    let productImage = productCard.getAttribute('data-image');

    let product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to the cart!`);

    displayCartItems();
    updateCartCount();
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemContainer = document.getElementById('cartItem');
    let cartFormInputs = document.getElementById('cartFormInputs');
    cartItemContainer.innerHTML = '';
    cartFormInputs.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemContainer.innerHTML = 'Your cart is empty';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            let cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" class="cart-image" alt="${item.name}">
                <div class="cart-details">
                    <strong>${item.name}</strong><br>
                    ₦${item.price.toLocaleString()}
                </div>
                <div class="cart-quantity">
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="btn btn-danger btn-sm my-2" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemContainer.appendChild(cartItem);

            cartFormInputs.innerHTML += `
                <input type="hidden" name="product_${index}_name" value="${item.name}">
                <input type="hidden" name="product_${index}_price" value="₦${item.price.toLocaleString()}">
                <input type="hidden" name="product_${index}_quantity" value="${item.quantity}">
            `;
        });

        cartFormInputs.innerHTML += `<input type="hidden" name="total_amount" value="₦${total.toLocaleString()}">`;
    }

    document.getElementById('total').innerText = `₦ ${total.toLocaleString()}`;
}

// Function to update the cart count displayed in the navigation
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('count').textContent = totalQuantity;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

window.onload = function() {
    displayCartItems();
    updateCartCount(); // Initialize cart count on page load
};