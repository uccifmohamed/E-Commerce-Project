(function($) {

  "use strict";

  var searchPopup = function() {
    // open search box
    $('#header-nav').on('click', '.search-button', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header-nav').on('click', '.btn-close-search', function(e) {
      $('.search-popup').toggleClass('is-visible');
    });
    
    $(".search-popup-trigger").on("click", function(b) {
        b.preventDefault();
        $(".search-popup").addClass("is-visible"),
        setTimeout(function() {
            $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
    $(".search-popup").on("click", function(b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
        $(this).removeClass("is-visible"))
    }),
    $(document).keyup(function(b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
    })
  }

  $(document).ready(function() {

    searchPopup();

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      navigation: {
        nextEl: ".swiper-arrow-prev",
        prevEl: ".swiper-arrow-next",
      },
    });         

    var swiper = new Swiper(".product-swiper", {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: "#mobile-products .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    });      


    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-prev",
        prevEl: ".swiper-arrow-next",
      },
    }); 
    
  }); 
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("userIcon");
    const userMenu = document.getElementById("userMenu");
    const loginForm = document.getElementById("loginForm");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.querySelector("#userMenu a[href='registration.html']");
    const closeLoginForm = document.getElementById("closeLoginForm");
    const myAccountLink = document.querySelector("a[href='account.html']");
    const userMenuList = userMenu.querySelector("ul");
    const cartLinks = document.querySelectorAll("a[href='Cart.html']");

    // Add "My Profile" and "Logout" dynamically
    const myProfileLink = document.createElement("a");
    myProfileLink.textContent = "My Profile";
    myProfileLink.href = "account.html";
    myProfileLink.style.display = "none";

    const logoutLink = document.createElement("a");
    logoutLink.textContent = "Logout";
    logoutLink.href = "#";
    logoutLink.style.display = "none";
    logoutLink.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      updateMenu(false);
    });

    // Append "My Profile" and "Logout" to the user menu
    const myProfileListItem = document.createElement("li");
    myProfileListItem.appendChild(myProfileLink);
    const logoutListItem = document.createElement("li");
    logoutListItem.appendChild(logoutLink);
    userMenuList.appendChild(myProfileListItem);
    userMenuList.appendChild(logoutListItem);
    
    // Toggle login form
    userIcon.addEventListener("click", function () {
      userMenu.style.display = userMenu.style.display === "none" ? "block" : "none";
    });

    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.style.display = "block";
      userMenu.style.display = "none";
    });

    closeLoginForm.addEventListener("click", function () {
      loginForm.style.display = "none";
    });

    // Handle login
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "true");
      loginForm.style.display = "none";
      updateMenu(true);
    });
    
    // Restrict cart access
    cartLinks.forEach(cartLink => {
      cartLink.addEventListener("click", function (e) {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
          e.preventDefault();
          alert("You must log in or sign up to add products to the cart.");
        }
      });
    });
    
    // Update menu based on login state
    function updateMenu(isLoggedIn) {
      if (isLoggedIn) {
        userMenu.style.display = "none";
        loginLink.parentElement.style.display = "none";
        signupLink.style.display = "none";
        myProfileLink.style.display = "block";
        logoutLink.style.display = "block";
        myAccountLink.style.display = "block";
      } else {
        loginLink.parentElement.style.display = "block";
        signupLink.style.display = "block";
        myProfileLink.style.display = "none";
        logoutLink.style.display = "none";
        myAccountLink.style.display = "none";
      }
    }

    // Check login state on page load
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    updateMenu(isLoggedIn);
  }); // End of a document ready
  
  document.getElementById('infoLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('infoPreview').style.display = 'block';
  });
  document.getElementById('closeinfoPreview').addEventListener('click', function() {
    document.getElementById('infoPreview').style.display = 'none';
  });
})(jQuery);
