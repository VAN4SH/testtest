// 1) Небольшая корзина: увеличиваем счетчик по кнопке "Добавить в корзину"
let cartCount = Number(localStorage.getItem("cartCount")) || 0;

function updateCartView() {
  const cartPlace = document.getElementById("cartCount");
  if (cartPlace) {
    cartPlace.textContent = cartCount;
  }
}

function setupCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      cartCount = cartCount + 1;
      localStorage.setItem("cartCount", String(cartCount));
      updateCartView();
      alert("Товар добавлен в корзину");
    });
  });
}

// 2) Переключение темы
function setupThemeToggle() {
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
}

// 3) Поиск по каталогу
function setupCatalogSearch() {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".product-card");

  if (!searchInput || cards.length === 0) {
    return;
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(function (card) {
      const name = card.dataset.name.toLowerCase();
      if (name.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// 4) Простая проверка формы контактов
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const formMessage = document.getElementById("formMessage");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue.length < 2) {
      formMessage.textContent = "Введите имя (минимум 2 символа).";
      formMessage.style.color = "#dc2626";
      return;
    }

    if (phoneValue.length < 6) {
      formMessage.textContent = "Введите корректный телефон.";
      formMessage.style.color = "#dc2626";
      return;
    }

    if (messageValue.length < 5) {
      formMessage.textContent = "Сообщение слишком короткое.";
      formMessage.style.color = "#dc2626";
      return;
    }

    formMessage.textContent = "Спасибо! Сообщение отправлено.";
    formMessage.style.color = "#16a34a";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartView();
  setupCartButtons();
  setupThemeToggle();
  setupCatalogSearch();
  setupContactForm();
});
