document.addEventListener("DOMContentLoaded", function() {
    async function obtenerTipoCambio() {
        try {
            const url = "https://dolarapi.com/v1/dolares/mayorista";
            const respuesta = await fetch(url);
        
            // Verifica si la solicitud fue exitosa
            if (!respuesta.ok) {
                throw new Error(`Error al obtener datos: ${respuesta.status}`);
            }
        
            const data = await respuesta.json();
            return data.venta; // Extrae el valor de "venta" del JSON
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
    
    async function convertir() {
        const tipoCambio = await obtenerTipoCambio();
    
        // Si no se pudo obtener el tipo de cambio, no se hace la conversion
        if (!tipoCambio) return;
    
        const valorBase = parseFloat(document.getElementById("base-input").value);
    
        // Valida si el valor base es menor a 5
        if (valorBase < 5) {
            // Muestra un mensaje de error
            document.getElementById("error-message").textContent = "El monto mínimo es de 5 USD";
            document.getElementById("error-message").style.color = "red"; // Agregué estilo para cambiar el color del mensaje
            document.getElementById("controls").style.backgroundColor = "rgba(255, 0, 0, 0.1)"; // Cambia el color de fondo del contenedor
            return; // Evita la conversión y deja el valor target sin cambios
        } else {
            // Si el valor base es mayor o igual a 5, oculta el mensaje de error
            document.getElementById("error-message").textContent = "";
            document.getElementById("controls").style.backgroundColor = "transparent"; // Restaura el color de fondo del contenedor
        }
    
        // Actualiza el valor del campo target-id
        document.getElementById("target-id").value = valorBase;
    
        const valorTarget = valorBase * tipoCambio + 60;
    
        document.getElementById("target-id").value = valorTarget.toFixed(2);
    
        // Actualiza el valor de la tasa de cambio
        document.getElementById("exchange-rate").textContent = `1 USD = ${(tipoCambio + 6).toFixed(2)} ARS`; // Corregí la forma de mostrar la tasa de cambio
    }
    
    // Ejecuta la conversión al iniciar la página
    convertir();
    
    // Asocia la función convertir al evento keyup del campo base-input
    document.getElementById("base-input").addEventListener("keyup", convertir);
    
    // Limpia el valor inicial "0" al enfocar el input de base
    document.getElementById("base-input").addEventListener("focus", function() {
        if (this.value === "5") {
            this.value = "";
        }
    });
    
    // Aplica estilos al enfocar y desenfocar los inputs del formulario
    const inputs = document.querySelectorAll('.formulario input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = 'green';
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.style.borderColor = 'red';
                input.style.color = 'red';
            } else {
                input.style.borderColor = 'black';
                input.style.color = 'black';
            }
        });
    });
    
    // Verifica y envía el formulario
    document.querySelector(".formulario form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        
        const formulario = document.querySelector(".formulario form");

        if (formulario.checkValidity()) {
            // Captura los datos del formulario
            const nombre = document.querySelector("#nombre").value;
            const email = document.querySelector("#correo_electronico").value;
            const numero_whatsapp = document.querySelector("#numero_whatsapp").value;
            const correo_paypal = document.querySelector("#correo_paypal").value;
            const cbu = document.querySelector("#cbu").value;

            // Captura los valores de los inputs de conversión
            const baseInput = document.querySelector("#base-input").value;
            const targetInput = document.querySelector("#target-id").value;

            // Mensaje a enviar
            const mensaje = `**Formulario de contacto:**\n\nNombre: ${nombre}\nCorreo electrónico: ${email}\nNúmero de Whatsapp: ${numero_whatsapp}\nCorreo electrónico de Paypal: ${correo_paypal}\nCBU/CVU/Alias para Transferencia bancaria Argentina: ${cbu}\nEnvía a PayPal: ${baseInput}\nRecibe en ARS: ${targetInput}`;

            const BOT_TOKEN = '7163602387:AAGicK3mKJEw2mVEdTXSrutEvHpMyu_Mp2c';
        
            // Prepara los datos para el envío
            const data = {
                chat_id: '1840071442', 
                text: mensaje,
                parse_mode: 'Markdown',
            };
        
            // Envía los datos al bot
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Mensaje de éxito
                    alert('¡Formulario enviado correctamente!');
                } else {
                    // Mensaje de error
                    console.error('Error al enviar el formulario:', data);
                    alert('Error al enviar el formulario. Inténtalo de nuevo más tarde.');
                }
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                alert('Error al enviar el formulario. Inténtalo de nuevo más tarde.');
            });
        } else {
            // Mostrar mensaje de error de validación
            alert('Formulario incompleto o con errores. Revisa los campos.');
        }
    });
});
