// Ejercicio 1: Convertidor de USD a CLP
// Tipo de cambio: 1 USD = 745 CLP

const EXCHANGE_RATE = 745;

/**
 * Función principal que convierte dólares a pesos chilenos
 * @param {number} dollarAmount - Monto en dólares (puede incluir centavos)
 * @returns {number|null} - Monto en pesos chilenos o null si hay error
 */
function dollarsToPesos(dollarAmount) {
    // Validar que el parámetro sea un número válido
    if (typeof dollarAmount !== 'number' || isNaN(dollarAmount) || dollarAmount < 0) {
        return null;
    }
    
    // Convertir a pesos chilenos
    const pesosAmount = dollarAmount * EXCHANGE_RATE;
    
    // Redondear a 2 decimales para evitar errores de punto flotante
    return Math.round(pesosAmount * 100) / 100;
}

/**
 * Función que valida si un string es un número válido
 * @param {string} str - String a validar
 * @returns {boolean} - true si es un número válido
 */
function isValidNumber(str) {
    // Eliminar espacios
    str = str.trim();
    
    // Verificar que no esté vacío
    if (str === '') return false;
    
    // Usar parseFloat y verificar que no sea NaN
    const num = parseFloat(str);
    
    // Verificar que sea un número válido y no negativo
    return !isNaN(num) && isFinite(num) && num >= 0;
}

/**
 * Función que formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado
 */
function formatNumber(num) {
    return new Intl.NumberFormat('es-CL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(num);
}

/**
 * Función que maneja la conversión desde la interfaz
 */
function convertToPesos() {
    const input = document.getElementById('dollarAmount');
    const resultDiv = document.getElementById('result');
    const inputValue = input.value.trim();
    
    // Limpiar resultado anterior
    resultDiv.style.display = 'none';
    resultDiv.className = 'result';
    
    // Validar entrada vacía
    if (inputValue === '') {
        showResult('Por favor, ingrese un monto en dólares.', 'error');
        return;
    }
    
    // Validar que sea un número
    if (!isValidNumber(inputValue)) {
        showResult('Error: Debe ingresar un número válido. Solo se aceptan números positivos, incluyendo decimales.', 'error');
        return;
    }
    
    // Convertir string a número
    const dollarAmount = parseFloat(inputValue);
    
    // Realizar conversión
    const pesosAmount = dollarsToPesos(dollarAmount);
    
    if (pesosAmount === null) {
        showResult('Error: Ocurrió un problema en la conversión.', 'error');
        return;
    }
    
    // Mostrar resultado exitoso
    const formattedDollars = formatNumber(dollarAmount);
    const formattedPesos = formatNumber(pesosAmount);
    
    showResult(
        `<strong>Conversión exitosa:</strong><br>
        USD $${formattedDollars} = CLP $${formattedPesos}<br>
        <small>Tipo de cambio: 1 USD = ${EXCHANGE_RATE} CLP</small>`,
        'success'
    );
}

/**
 * Función auxiliar para mostrar resultados
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success' o 'error')
 */
function showResult(message, type) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = `result ${type}`;
    resultDiv.style.display = 'block';
}

// Event listener para permitir conversión con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('dollarAmount');
    
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertToPesos();
        }
    });
    
    // Enfocar el input al cargar la página
    input.focus();
});

// Función de prueba para validar el funcionamiento
function testConverter() {
    console.log('=== Pruebas del Convertidor USD-CLP ===');
    
    const testCases = [
        { input: 100, expected: 74500 },
        { input: 1.50, expected: 1117.5 },
        { input: 0.25, expected: 186.25 },
        { input: 1000.99, expected: 745737.55 },
        { input: 0, expected: 0 }
    ];
    
    testCases.forEach((test, index) => {
        const result = dollarsToPesos(test.input);
        const passed = result === test.expected;
        console.log(`Prueba ${index + 1}: ${test.input} USD → ${result} CLP ${passed ? '✓' : '✗'}`);
    });
    
    // Pruebas de validación
    console.log('\n=== Pruebas de Validación ===');
    const invalidInputs = ['abc', '', '  ', '-10', 'null', 'undefined'];
    invalidInputs.forEach(input => {
        const isValid = isValidNumber(input);
        console.log(`"${input}" es válido: ${isValid ? '✓' : '✗'}`);
    });
}
