document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.value = localStorage.getItem(textarea.id) || "";

        // Ajusta a altura inicial se houver texto salvo
        autoResize(textarea);

        textarea.addEventListener("input", function() {
            autoResize(this);
            saveText(this.id);
        });
    });
});

function autoResize(textarea) {
    textarea.style.height = "auto"; // Reseta a altura para recalcular
    textarea.style.height = (textarea.scrollHeight) + "px"; // Ajusta para caber o texto
}

function saveText(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function toggleTextarea(id) {
    const textarea = document.getElementById(id);
    textarea.classList.toggle("show");

    // Se estiver visível, já ajusta a altura
    if (textarea.classList.contains("show")) {
        autoResize(textarea);
    }
}

// Exibir/Ocultar Menu
const title = document.getElementById("toggle-menu");
const menuContainer = document.getElementById("menu-container");

title.addEventListener("click", () => {
    menuContainer.classList.toggle("menu-visible");
});

// Mudança de cor
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", function() {
    document.documentElement.style.setProperty("--highlight-color", this.value);
});

// Limpar cache
document.getElementById("clear-cache").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});