document.addEventListener("DOMContentLoaded", () => {
    // =======================
    // 🔹 1. Salvar Última Página Visitada
    // =======================
    const lastPage = localStorage.getItem("lastPage");

    if (lastPage && location.pathname !== lastPage) {
        window.location.href = lastPage;
    }

    localStorage.setItem("lastPage", location.pathname);

    // =======================
    // 🔹 2. Recuperar e Salvar Cor Escolhida pelo Usuário
    // =======================
    const colorPicker = document.getElementById("color-picker");
    const savedColor = localStorage.getItem("highlightColor");

    if (savedColor) {
        document.documentElement.style.setProperty("--highlight-color", savedColor);
        colorPicker.value = savedColor;
    }

    colorPicker.addEventListener("input", function() {
        document.documentElement.style.setProperty("--highlight-color", this.value);
        localStorage.setItem("highlightColor", this.value);
    });

    // =======================
    // 🔹 3. Exibir/Ocultar Menu ao Clicar no Título
    // =======================
    const title = document.getElementById("toggle-menu");
    const menuContainer = document.getElementById("menu-container");

    title.addEventListener("click", () => {
        menuContainer.classList.toggle("menu-visible");
    });

    // =======================
    // 🔹 4. Ajustar a Caixa de Anotações (Expande Automaticamente)
    // =======================

function toggleTextarea(id) {
    const textarea = document.getElementById(id);
    
    if (textarea) {
        textarea.classList.toggle("show");

        // Se estiver visível, já ajusta a altura automaticamente
        if (textarea.classList.contains("show")) {
            autoResize(textarea);
        }
    }
}

// Adiciona evento a todas as caixas de anotações clicáveis
document.querySelectorAll(".clickable").forEach(element => {
    element.addEventListener("click", function() {
        const textareaId = this.getAttribute("data-textarea");
        toggleTextarea(textareaId);
    });
});

    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.value = localStorage.getItem(textarea.id) || "";

        // Ajusta a altura inicial se houver texto salvo
        autoResize(textarea);

        textarea.addEventListener("input", function() {
            autoResize(this);
            saveText(this.id);
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

    // =======================
    // 🔹 5. Limpar Cache ao Clicar no Botão
    // =======================
    document.getElementById("clear-cache").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });

});