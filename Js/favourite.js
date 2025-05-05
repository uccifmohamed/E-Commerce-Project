document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

    function displayFavorites() {
        favoritesContainer.innerHTML = '';

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h3 class="text-muted">Your favorites list is empty</h3>
                    <a href="product.html" class="btn btn-primary mt-3">Browse Products</a>
                </div>
            `;
            return;
        }

        favorites.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top p-3" alt="${product.name}" style="height: 200px; object-fit: contain;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-primary fw-bold">${product.price}</p>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between">
                        <button class="btn btn-outline-danger remove-favorite" data-product-id="${product.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            Remove
                        </button>
                        <button class="btn btn-primary add-to-cart-from-fav" data-product-id="${product.id}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            favoritesContainer.appendChild(col);
        });
    }

    // Handle remove favorite
    
    // Handle add to cart from favorites
    favoritesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-from-fav')) {
            e.preventDefault();
            const btn = e.target.closest('.add-to-cart-from-fav');
            const productId = btn.getAttribute('data-product-id');
            
            const product = favorites.find(item => item.id === productId);
            
            if (product) {
                let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                favoritesContainer.addEventListener('click', (e) => {
                    if (e.target.closest('.remove-favorite')) {
                        const btn = e.target.closest('.remove-favorite');
                        const productId = btn.getAttribute('data-product-id');
                        
                        const updatedFavorites = favorites.filter(item => item.id !== productId);
                        sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                        
                        // تحديث المصفوفة المحلية
                        favorites.length = 0;
                        favorites.push(...updatedFavorites);
                        
                        displayFavorites();
                        updateFavoriteCounter();
                        
                        showToast(`${product.name} Removed from favourites`, 'danger'); // اللون الأحمر
                    }
                });
                
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartCounter();
                
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                            Added to cart`;
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        Add to cart
                    `;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-primary');
                }, 2000);
                
                showToast(`${product.name} Added to cart`, 'success'); // اللون الأخضر
            }
        }
    });

    displayFavorites();
});

// دالة showToast المعدلة
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast show align-items-center text-white bg-${type}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// الدوال المساعدة (يجب تعريفها إذا لم تكن موجودة)
function updateFavoriteCounter() {
    const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    const counter = document.getElementById('favorite-counter');
    if (counter) {
        counter.textContent = favorites.length;
    }
}

function updateCartCounter() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const counter = document.getElementById('cart-counter');
    if (counter) {
        counter.textContent = totalItems;
    }
}