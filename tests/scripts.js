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
      return null; // Maneja el error y devuelve null
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
      backgroundColor = "rgb(209, 161, 161)"
      // Evita la conversion y deja el valor target sin cambios
      return;
    }
  
    // Actualiza el valor del campo target-id
    document.getElementById("target-id").value = valorBase;
  
    const valorTarget = (valorBase * tipoCambio) + 60;
  
    document.getElementById("target-id").value = valorTarget.toFixed(2);
  
    // Actualiza el valor de la tasa de cambio
    document.getElementById("exchange-rate").textContent = `1 USD = ${tipoCambio.toFixed(2)+6} ARS`;
  
    // Si el valor base es mayor o igual a 5, oculta el mensaje de error
    if (valorBase >= 5) {
      document.getElementById("error-message").textContent = "";
      
    }
  }
  
  // Ejecuta la conversion al iniciar la página
  convertir();
  
  // Asocia la función convertir al evento keyup del campo base-input
  document.getElementById("base-input").addEventListener("keyup", convertir);
  
  // Clear initial "0" on focus for base input
  document.getElementById("base-input").addEventListener("focus", function() {
    if (this.value === "5") {
      this.value = "";
    }
  });


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
  
  function verificarFormulario() {
    const formulario = document.querySelector(".formulario");
  
    if (formulario.validity.valid) {
      // El formulario está completo y válido
      // Habilitar el botón y cambiar el estilo
      button.disabled = false;
      button.style.backgroundColor = "red";
      button.style.color = "white";
    } else {
      // El formulario no está completo o no es válido
      // Deshabilitar el botón y mantener el estilo por defecto
      button.disabled = true;
      button.style.backgroundColor = "#ccc";
      button.style.color = "#666";
    }
  }
  

