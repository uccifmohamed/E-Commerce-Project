document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('cart-table-body');
    const totalElement = document.getElementById('total-price');
    const buttonShopping = document.querySelector('.button-shopping');
    
    function parsePrice(price) {
        if (!price) return 0;
        const numericValue = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
        return isNaN(numericValue) ? 0 : numericValue;
    }

    function renderCart() {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        
        tbody.innerHTML = '';
        
        if (cart.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-4">
                        Your shopping cart is empty
                    </td>
                </tr>
            `;
            totalElement.textContent = 'Total: $0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const price = parsePrice(item.price);
            const itemTotal = price * (item.quantity || 1);
            total += itemTotal;
            
            const formattedPrice = item.price ? item.price : `$${price.toFixed(2)}`;
            const formattedTotal = `$${itemTotal.toFixed(2)}`;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="d-flex align-items-center">
                    <img src="${item.image || ''}" alt="${item.name || 'Product'}" 
                         style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px;">
                    ${item.name || 'Unknown Product'}
                </td>
                <td>${formattedPrice}</td>
                <td>
                    <div class="d-flex align-items-center justify-content-center">
                        <button class="btn btn-sm btn-outline-secondary decrease-btn" 
                                data-id="${item.id}">-</button>
                        <span class="mx-2">${item.quantity || 1}</span>
                        <button class="btn btn-sm btn-outline-secondary increase-btn" 
                                data-id="${item.id}">+</button>
                    </div>
                </td>
                <td>${formattedTotal}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-btn" 
                            data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        updateCartCount();
    }

    document.addEventListener('click', (e) => {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        
        if (e.target.closest('.increase-btn')) {
            const btn = e.target.closest('.increase-btn');
            const id = btn.dataset.id;
            
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }
        else if (e.target.closest('.decrease-btn')) {
            const btn = e.target.closest('.decrease-btn');
            const id = btn.dataset.id;
            
            const item = cart.find(item => item.id === id);
            if (item) {
                if ((item.quantity || 1) > 1) {
                    item.quantity -= 1;
                } else {
                    cart.splice(cart.indexOf(item), 1);
                }
                sessionStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        }
        else if (e.target.closest('.remove-btn')) {
            const btn = e.target.closest('.remove-btn');
            const id = btn.dataset.id;
            
            const newCart = cart.filter(item => item.id !== id);
            sessionStorage.setItem('cart', JSON.stringify(newCart));
            renderCart();
        }
    });

    if (buttonShopping) {
        buttonShopping.addEventListener('click', function() {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            window.location.href = '../HTML_pags/check_out.html';
        });
    }

    function updateCartCount() {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            counter.textContent = count;
            counter.style.display = count > 0 ? 'block' : 'none';
        }
    }

    renderCart();
});