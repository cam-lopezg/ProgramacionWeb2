document.addEventListener('DOMContentLoaded', function () {
    const registroForm = document.getElementById('registroForm');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        validateForm();
    });

    clearBtn.addEventListener('click', function () {
        registroForm.reset();
        clearErrors();
    });

    function validateForm() {
        clearErrors();

        const nombre = document.getElementById('nombre').value.trim();
        const usuario = document.getElementById('usuario').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
        const direccion = document.getElementById('direccion').value.trim();

        if (!nombre) {
            showError('nombreError', 'El nombre es obligatorio.');
        }

        if (!usuario) {
            showError('usuarioError', 'El nombre de usuario es obligatorio.');
        }

        if (!email) {
            showError('emailError', 'El correo electrónico es obligatorio.');
        } else if (!validateEmail(email)) {
            showError('emailError', 'Por favor, ingrese un correo electrónico válido.');
        }

        if (!validatePassword(password)) {
            showError('passwordError', 'La contraseña debe contener al menos un número y una letra en mayúscula, y tener entre 6 y 18 caracteres.');
        }

        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Las contraseñas no coinciden.');
        }

        const edad = calculateAge(fechaNacimiento);
        if (isNaN(edad) || edad < 13) {
            showError('fechaNacimientoError', 'Debe ser mayor de 13 años para registrarse.');
        }

        if (!document.querySelector('.error')) {
            showSuccess('successMessage', '¡Formulario validado correctamente! Puedes enviarlo ahora.');
        }
        if (
            !document.getElementById('nombreError').textContent &&
            !document.getElementById('usuarioError').textContent &&
            !document.getElementById('emailError').textContent &&
            !document.getElementById('passwordError').textContent &&
            !document.getElementById('confirmPasswordError').textContent &&
            !document.getElementById('fechaNacimientoError').textContent &&
            !document.getElementById('direccionError').textContent
        ) {
            showSuccess('successMessage', '¡Formulario validado correctamente! Puedes enviarlo ahora.');
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(function (errorElement) {
            errorElement.textContent = '';
        });
    }

    function showError(id, errorMessage) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = errorMessage;
    }

    function validateEmail(email) {
      return true;
    }

    function validatePassword(password) {
        
        const numberPattern = /\d/;
        const uppercasePattern = /[A-Z]/;
        return numberPattern.test(password) && uppercasePattern.test(password) && password.length >= 6 && password.length <= 18;
    }

    function calculateAge(birthday) {
       
        const today = new Date();
        const diff = today.getTime() - birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    function showSuccess(id, message) {
        const successElement = document.getElementById(id);
        successElement.textContent = message;
    }
});
