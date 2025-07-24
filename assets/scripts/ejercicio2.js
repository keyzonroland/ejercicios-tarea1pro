// Ejercicio 2: Formulario de Subsidio de Arriendo de Vivienda
// Validación de elegibilidad según requisitos del Estado de Chile

/**
 * Clase para manejar la validación del subsidio de arriendo
 */
class SubsidyValidator {
    constructor() {
        this.minimumAge = 18;
        this.minimumSavings = 4; // UF
        this.maximumVulnerability = 70; // Porcentaje
        this.monthlyAmount = 4.2; // UF
        this.maximumTotal = 170; // UF
        this.maxYears = 8;
    }

    /**
     * Valida la edad del postulante
     * @param {number} age - Edad en años
     * @returns {object} - Resultado de validación
     */
    validateAge(age) {
        const isValid = age >= this.minimumAge;
        return {
            isValid,
            message: isValid 
                ? `✓ Cumple con el requisito de edad (${age} años)`
                : `✗ No cumple: Debe ser mayor de ${this.minimumAge} años (actual: ${age} años)`
        };
    }

    /**
     * Valida la cédula de identidad
     * @param {string} hasValidId - Estado de la cédula
     * @returns {object} - Resultado de validación
     */
    validateId(hasValidId) {
        const isValid = hasValidId === 'si' || hasValidId === 'extranjero';
        let message;
        
        switch(hasValidId) {
            case 'si':
                message = '✓ Posee cédula de identidad chilena vigente';
                break;
            case 'extranjero':
                message = '✓ Posee cédula de identidad para extranjeros vigente';
                break;
            case 'no':
                message = '✗ No cumple: Debe poseer cédula de identidad vigente';
                break;
            default:
                message = '✗ Debe seleccionar el estado de su cédula de identidad';
        }

        return { isValid, message };
    }

    /**
     * Valida el ahorro mínimo
     * @param {number} savings - Ahorro en UF
     * @returns {object} - Resultado de validación
     */
    validateSavings(savings) {
        const isValid = savings >= this.minimumSavings;
        return {
            isValid,
            message: isValid 
                ? `✓ Cumple con el ahorro mínimo (${savings} UF ≥ ${this.minimumSavings} UF)`
                : `✗ No cumple: Necesita al menos ${this.minimumSavings} UF de ahorro (actual: ${savings} UF)`
        };
    }

    /**
     * Valida el titular de la cuenta de ahorro
     * @param {string} accountOwner - Titular de la cuenta
     * @returns {object} - Resultado de validación
     */
    validateAccountOwner(accountOwner) {
        const validOwners = ['postulante', 'conyuge', 'conviviente'];
        const isValid = validOwners.includes(accountOwner);
        
        let message;
        switch(accountOwner) {
            case 'postulante':
                message = '✓ Cuenta a nombre del postulante';
                break;
            case 'conyuge':
                message = '✓ Cuenta a nombre del cónyuge';
                break;
            case 'conviviente':
                message = '✓ Cuenta a nombre del conviviente civil';
                break;
            case 'otro':
                message = '✗ No cumple: La cuenta debe estar a nombre del postulante, cónyuge o conviviente civil';
                break;
            default:
                message = '✗ Debe seleccionar el titular de la cuenta de ahorro';
        }

        return { isValid, message };
    }

    /**
     * Valida la vulnerabilidad social
     * @param {number} vulnerability - Porcentaje de vulnerabilidad
     * @returns {object} - Resultado de validación
     */
    validateVulnerability(vulnerability) {
        const isValid = vulnerability <= this.maximumVulnerability;
        return {
            isValid,
            message: isValid 
                ? `✓ Cumple con el criterio de vulnerabilidad (${vulnerability}% ≤ ${this.maximumVulnerability}%)`
                : `✗ No cumple: Debe estar en el ${this.maximumVulnerability}% más vulnerable (actual: ${vulnerability}%)`
        };
    }

    /**
     * Valida todos los requisitos del formulario
     * @param {object} formData - Datos del formulario
     * @returns {object} - Resultado completo de validación
     */
    validateApplication(formData) {
        const validations = [
            this.validateAge(parseInt(formData.age)),
            this.validateId(formData.hasValidId),
            this.validateSavings(parseFloat(formData.savings)),
            this.validateAccountOwner(formData.accountOwner),
            this.validateVulnerability(parseInt(formData.socialVulnerability))
        ];

        const allValid = validations.every(v => v.isValid);
        const messages = validations.map(v => v.message);

        return {
            isEligible: allValid,
            validations: messages,
            subsidyInfo: allValid ? this.getSubsidyInfo() : null
        };
    }

    /**
     * Obtiene información del subsidio
     * @returns {object} - Información del subsidio
     */
    getSubsidyInfo() {
        const monthsTotal = Math.floor(this.maximumTotal / this.monthlyAmount);
        
        return {
            monthlyAmount: this.monthlyAmount,
            maximumTotal: this.maximumTotal,
            maxYears: this.maxYears,
            monthsTotal: monthsTotal,
            description: `Podrá recibir ${this.monthlyAmount} UF mensuales hasta un máximo de ${this.maximumTotal} UF total, lo que equivale a aproximadamente ${monthsTotal} meses de subsidio.`
        };
    }
}

// Instancia del validador
const validator = new SubsidyValidator();

/**
 * Maneja el envío del formulario
 * @param {Event} event - Evento del formulario
 */
function handleSubmit(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validar aplicación
    const result = validator.validateApplication(data);
    
    // Mostrar resultado
    displayResult(result);
}

/**
 * Muestra el resultado de la validación
 * @param {object} result - Resultado de la validación
 */
function displayResult(result) {
    const resultDiv = document.getElementById('result');
    
    let html = '<h3>Resultado de la Evaluación</h3>';
    
    // Mostrar validaciones individuales
    html += '<div style="margin-bottom: 1rem;">';
    result.validations.forEach(validation => {
        const isValid = validation.startsWith('✓');
        html += `<p style="color: ${isValid ? '#28a745' : '#dc3545'}; margin: 0.5rem 0;">${validation}</p>`;
    });
    html += '</div>';
    
    // Mostrar resultado final
    if (result.isEligible) {
        html += `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <h4 style="color: #155724; margin-top: 0;">🎉 ¡ELEGIBLE PARA EL SUBSIDIO!</h4>
                <p style="color: #155724; margin: 0.5rem 0;">Cumple con todos los requisitos para postular al subsidio de arriendo de vivienda.</p>
                <div style="margin-top: 1rem;">
                    <strong>Información del beneficio:</strong>
                    <p style="margin: 0.5rem 0;">${result.subsidyInfo.description}</p>
                    <ul style="margin: 0.5rem 0; margin-left: 1.5rem;">
                        <li>Monto mensual: ${result.subsidyInfo.monthlyAmount} UF</li>
                        <li>Monto máximo total: ${result.subsidyInfo.maximumTotal} UF</li>
                        <li>Período máximo: ${result.subsidyInfo.maxYears} años</li>
                        <li>Uso consecutivo o fragmentado</li>
                    </ul>
                </div>
            </div>
        `;
        resultDiv.className = 'result success';
    } else {
        html += `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <h4 style="color: #721c24; margin-top: 0;">❌ NO ELEGIBLE</h4>
                <p style="color: #721c24; margin: 0;">No cumple con todos los requisitos necesarios para el subsidio. Revise los puntos marcados arriba.</p>
            </div>
        `;
        resultDiv.className = 'result error';
    }
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    
    // Scroll al resultado
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Resetea el formulario y oculta resultados
 */
function resetForm() {
    document.getElementById('subsidyForm').reset();
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subsidyForm');
    form.addEventListener('submit', handleSubmit);
    
    // Agregar botón de reset
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.textContent = 'Limpiar Formulario';
    resetButton.className = 'btn';
    resetButton.style.width = '100%';
    resetButton.style.marginTop = '0.5rem';
    resetButton.style.background = '#6c757d';
    resetButton.onclick = resetForm;
    
    form.appendChild(resetButton);
});

// Función de prueba para validar el funcionamiento
function testSubsidyValidator() {
    console.log('=== Pruebas del Validador de Subsidio ===');
    
    const testCases = [
        {
            name: 'Caso válido completo',
            data: {
                age: '25',
                hasValidId: 'si',
                savings: '5',
                accountOwner: 'postulante',
                socialVulnerability: '60'
            },
            expectedEligible: true
        },
        {
            name: 'Menor de edad',
            data: {
                age: '17',
                hasValidId: 'si',
                savings: '5',
                accountOwner: 'postulante',
                socialVulnerability: '60'
            },
            expectedEligible: false
        },
        {
            name: 'Sin ahorro suficiente',
            data: {
                age: '25',
                hasValidId: 'si',
                savings: '2',
                accountOwner: 'postulante',
                socialVulnerability: '60'
            },
            expectedEligible: false
        },
        {
            name: 'No vulnerable',
            data: {
                age: '25',
                hasValidId: 'si',
                savings: '5',
                accountOwner: 'postulante',
                socialVulnerability: '80'
            },
            expectedEligible: false
        }
    ];
    
    testCases.forEach((test, index) => {
        const result = validator.validateApplication(test.data);
        const passed = result.isEligible === test.expectedEligible;
        console.log(`Prueba ${index + 1} (${test.name}): ${passed ? '✓' : '✗'} - Elegible: ${result.isEligible}`);
    });
}
