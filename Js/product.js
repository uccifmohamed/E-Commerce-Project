document.addEventListener("DOMContentLoaded", function () {
    // 1. بيانات المنتجات
    const mobileProducts = [
        { id: "product-1", name: "iPhone 10", price: "$980", image: "images/product-item1.jpg", category: "Mobile" },
        { id: "product-2", name: "iPhone 11", price: "$1100", image: "images/product-item2.jpg", category: "Mobile" },
        { id: "product-3", name: "iPhone 8", price: "$780", image: "images/product-item3.jpg", category: "Mobile" },
        { id: "product-4", name: "iPhone 13", price: "$1500", image: "images/product-item4.jpg", category: "Mobile" },
        { id: "product-5", name: "iPhone 12", price: "$1300", image: "images/product-item5.jpg", category: "Mobile" }
    ];

    const smartWatches = [
        { id: "product-6", name: "Pink Watch", price: "$870", image: "images/product-item6.jpg", category: "Watch" },
        { id: "product-7", name: "Heavy Watch", price: "$680", image: "images/product-item7.jpg", category: "Watch" },
        { id: "product-8", name: "Spotted Watch", price: "$750", image: "images/product-item8.jpg", category: "Watch" },
        { id: "product-9", name: "Black Watch", price: "$650", image: "images/product-item9.jpg", category: "Watch" },
        { id: "product-10", name: "Black Watch", price: "$750", image: "images/product-item10.jpg", category: "Watch" }
    ];

    const earbuds = [
        { id: "product-11", name: "Redmi Buds", price: "$20", image: "images/product-item11.jpg", category: "Earbuds" },
        { id: "product-12", name: "Samsung Buds", price: "$35", image: "images/product-item12.jpg", category: "Earbuds" },
        { id: "product-13", name: "Oramio Buds", price: "$20", image: "images/product-item13.jpg", category: "Earbuds" },
        { id: "product-14", name: "Xiaomi Buds", price: "$15", image: "images/product-item14.jpg", category: "Earbuds" },
        { id: "product-15", name: "iPhone Buds", price: "$20", image: "images/product-item14.jpg", category: "Earbuds" }
    ];

    // 2. دالة عرض السلايدر
    function renderSlider(containerId, products) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    ${products.map(product => `
                        <div class="swiper-slide">
                            <div class="product-card position-relative">
                                <div class="image-holder">
                                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                                </div>
                                <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                                    <h3 class="card-title text-uppercase">
                                        <a href="#">${product.name}</a>
                                    </h3>
                                    <span class="item-price text-primary">${product.price}</span>
                                </div>
                                <div class="product-actions d-flex justify-content-between align-items-center mt-3">
                                    <a href="#" class="favorite-btn text-danger fs-5" data-product-id="${product.id}">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
                                                  fill="currentColor" class="heart-outline"/>
                                            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
                                                  fill="currentColor" class="heart-filled" style="display: none;"/>
                                        </svg>
                                    </a>
                                    <a href="#" class="add-to-cart btn btn-sm btn-primary text-white d-flex align-items-center" data-product-id="${product.id}">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-1">
                                            <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" 
                                                  fill="currentColor"/>
                                        </svg>
                                        Add
                                    </a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        `;

        // تهيئة Swiper
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 40 },
            },
        });

        // تهيئة أزرار المفضلة
        initializeFavoriteButtons();
    }

    // 3. تهيئة جميع السلايدرات
    renderSlider("mobileSlider", mobileProducts);
    renderSlider("watchesSlider", smartWatches);
    renderSlider("earbudsSlider", earbuds);

    // 4. إدارة الأحداث
    document.addEventListener('click', function(e) {
        // إضافة إلى السلة
        if (e.target.closest('.add-to-cart')) {
            e.preventDefault();
            const btn = e.target.closest('.add-to-cart');
            const productId = btn.getAttribute('data-product-id');
            addToCart(productId, btn);
        }
        
        // إضافة/إزالة من المفضلة
        if (e.target.closest('.favorite-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.favorite-btn');
            const productId = btn.getAttribute('data-product-id');
            toggleFavorite(productId);
        }
    });

    // 5. الدوال الأساسية
    function addToCart(productId, btn = null) {
        const allProducts = [...mobileProducts, ...smartWatches, ...earbuds];
        const product = allProducts.find(p => p.id === productId);
        
        if (!product) return;
        
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
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

        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        
        if (btn) {
            // تأثير مرئي عند الإضافة
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                Added
            `;
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            
            setTimeout(() => {
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-1">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Add
                `;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
            }, 2000);
        }
    }

    function toggleFavorite(productId) {
        const allProducts = [...mobileProducts, ...smartWatches, ...earbuds];
        const product = allProducts.find(p => p.id === productId);
        
        if (!product) return;
        
        let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        const existingIndex = favorites.findIndex(item => item.id === productId);
        const btn = document.querySelector(`.favorite-btn[data-product-id="${productId}"]`);
        
        if (existingIndex >= 0) {
            // إزالة من المفضلة
            favorites.splice(existingIndex, 1);
            if (btn) {
                const outline = btn.querySelector('.heart-outline');
                const filled = btn.querySelector('.heart-filled');
                outline.style.display = 'block';
                filled.style.display = 'none';
            }
        } else {
            // إضافة إلى المفضلة
            favorites.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            if (btn) {
                const outline = btn.querySelector('.heart-outline');
                const filled = btn.querySelector('.heart-filled');
                outline.style.display = 'none';
                filled.style.display = 'block';
            }
        }
        
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteCounter();
    }

    // 6. تحديث العدادات
    function updateCartCount() {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            counter.textContent = count;
            counter.style.display = count > 0 ? 'block' : 'none';
        }
    }

    function updateFavoriteCounter() {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        const counter = document.querySelector('.favorite-counter');
        
        if (counter) {
            counter.textContent = favorites.length;
            counter.style.display = favorites.length > 0 ? 'block' : 'none';
        }
    }

    // 7. تهيئة أزرار المفضلة
    function initializeFavoriteButtons() {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productId = btn.getAttribute('data-product-id');
            const outline = btn.querySelector('.heart-outline');
            const filled = btn.querySelector('.heart-filled');
            
            if (favorites.some(item => item.id === productId)) {
                if (outline) outline.style.display = 'none';
                if (filled) filled.style.display = 'block';
            } else {
                if (outline) outline.style.display = 'block';
                if (filled) filled.style.display = 'none';
            }
        });
    }

    // 8. التهيئة الأولية
    updateCartCount();
    updateFavoriteCounter();
});