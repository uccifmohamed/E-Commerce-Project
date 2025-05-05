document.addEventListener('DOMContentLoaded', function() {
    function displayOrderSummary() {
        // Change localStorage to sessionStorage
        let cart;
        try {
            cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            if (!Array.isArray(cart)) {
                console.warn("Cart is not an array, resetting");
                cart = [];
            }
        } catch (e) {
            console.error("Error reading cart:", e);
            cart = [];
        }

        const orderSummary = document.getElementById('order-summary');
        const orderTotal = document.getElementById('order-total');
        
        orderSummary.innerHTML = '';
        
        if (cart.length === 0) {
            console.warn("Cart is empty - showing message");
            orderSummary.innerHTML = '<p class="text-center py-4">Your cart is empty</p>';
            orderTotal.textContent = '$0.00';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            // More robust price parsing
            let price = 0;
            try {
                if (typeof item.price === 'string') {
                    price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                } else if (typeof item.price === 'number') {
                    price = item.price;
                }
            } catch (e) {
                console.error("Error parsing price:", e);
                price = 0;
            }

            const quantity = parseInt(item.quantity) || 1;
            const itemTotal = price * quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'd-flex justify-content-between mb-2';
            itemElement.innerHTML = `
                <span>${item.name || 'Product'} × ${quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            orderSummary.appendChild(itemElement);
        });
        
        orderTotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Initialize
    displayOrderSummary();

    // Debug: Force a cart example if empty (remove in production)
    if (!localStorage.getItem('cart')) {
        console.log("No cart found, creating example cart");
        localStorage.setItem('cart', JSON.stringify([
            { name: "Sample Product", price: "19.99", quantity: 2 },
            { name: "Another Product", price: 29.99, quantity: 1 }
        ]));
        displayOrderSummary(); // Refresh to show new cart
    }
});