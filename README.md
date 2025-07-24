# Ejercicios de Programación JavaScript

Este proyecto contiene dos ejercicios prácticos desarrollados en JavaScript para resolver problemas específicos de conversión monetaria y validación de formularios.

## Estructura del Proyecto

```
ejercicios-tarea1pro/
├── assets/
│   ├── index.html          # Página principal con enlaces a los ejercicios
│   ├── ejercicio1.html     # Convertidor de USD a CLP
│   ├── ejercicio2.html     # Formulario de subsidio de arriendo
│   ├── css/
│   │   └── styles.css      # Estilos CSS para todas las páginas
│   └── scripts/
│       ├── ejercicio1.js   # Lógica del convertidor de monedas
│       └── ejercicio2.js   # Validación del formulario de subsidio
└── README.md
```

## Ejercicio 1: Convertidor de Dólares a Pesos Chilenos

### Descripción
Función que convierte montos en dólares estadounidenses a pesos chilenos utilizando un tipo de cambio fijo de 745 CLP por 1 USD.

### Características Implementadas
- Validación de entrada para aceptar solo números válidos
- Soporte para montos con centavos (decimales)
- Manejo de errores para entradas inválidas
- Formato de salida con separadores de miles
- Interfaz web interactiva con validación en tiempo real

### Funcionalidades Técnicas
- Función `dollarsToPesos()` que realiza la conversión
- Validación mediante `isValidNumber()` para verificar entradas
- Formateo de números con `Intl.NumberFormat`
- Manejo de eventos para conversión con tecla Enter

## Ejercicio 2: Formulario de Subsidio de Arriendo de Vivienda

### Descripción
Formulario web que valida la elegibilidad de un postulante para el subsidio de arriendo de vivienda del Estado de Chile.

### Requisitos Validados
1. **Edad**: Mayor de 18 años
2. **Cédula de Identidad**: Vigente (chilena o extranjera)
3. **Ahorro Mínimo**: 4 UF en cuenta de ahorro para vivienda
4. **Titular de Cuenta**: A nombre del postulante, cónyuge o conviviente civil
5. **Vulnerabilidad Social**: Pertenecer al 70% más vulnerable según Registro Social de Hogares

### Información del Subsidio
- Monto mensual: 4.2 UF
- Monto máximo total: 170 UF
- Período máximo: 8 años
- Uso consecutivo o fragmentado

### Implementación Técnica
- Clase `SubsidyValidator` para manejar todas las validaciones
- Métodos específicos para cada tipo de validación
- Interfaz que muestra resultados detallados con explicación de cada requisito
- Formulario HTML con campos apropiados y validación del lado cliente

## Características Generales

### Diseño
- Interfaz responsive que se adapta a dispositivos móviles y desktop
- Estilos CSS modernos con gradientes y transiciones
- Header y footer consistentes en todas las páginas
- Navegación entre páginas

### Validación
- Validación robusta de datos de entrada
- Mensajes de error claros y específicos
- Manejo de casos edge y entradas inválidas
- Feedback visual inmediato para el usuario

### Código
- Código bien documentado con comentarios JSDoc
- Funciones de prueba incluidas para debugging
- Separación clara entre lógica de negocio y presentación
- Manejo adecuado de eventos DOM

## Cómo Usar

1. Abrir `assets/index.html` en un navegador web
2. Seleccionar el ejercicio deseado desde la página principal
3. Para el Ejercicio 1: Ingresar un monto en dólares y hacer clic en "Convertir"
4. Para el Ejercicio 2: Completar todos los campos del formulario y hacer clic en "Verificar Elegibilidad"

## Tecnologías Utilizadas

- HTML5 para la estructura
- CSS3 para estilos y responsive design
- JavaScript ES6+ para la lógica de programación
- APIs nativas del navegador (FormData, Intl.NumberFormat)

## Validaciones Implementadas

### Ejercicio 1
- Verificación de que la entrada sea un número válido
- Manejo de números decimales (centavos)
- Prevención de valores negativos
- Control de entradas vacías o inválidas

### Ejercicio 2
- Validación de rangos numéricos (edad, ahorro, vulnerabilidad)
- Verificación de selecciones en campos desplegables
- Lógica condicional para múltiples criterios
- Retroalimentación detallada sobre cada requisito

Este proyecto demuestra la implementación de validaciones robustas, manejo de formularios web, y desarrollo de interfaces de usuario funcionales utilizando tecnologías web estándar.
