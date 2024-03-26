document.addEventListener('DOMContentLoaded', function () {
    const logoButton = document.getElementById('logoButton');

    logoButton.addEventListener('click', function () {
        // Redirigir a la página principal (principal.html)
        window.location.href = 'principal.html';
    });
});