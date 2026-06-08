import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Simulación de datos (Mock Data) que luego vendrán de tu Base de Datos
const PREGUNTAS_MOCK = [
    {
        id: 1,
        enunciado: "¿Tailwind v4 utiliza archivos CSS nativos para su configuración?",
        opciones: ["Verdadero", "Falso"],
        respuestaCorrecta: "Verdadero"
    },
    {
        id: 2,
        enunciado: "¿El prefijo 'text-' en Tailwind se utiliza para cambiar la tipografía?",
        opciones: ["Verdadero", "Falso"],
        respuestaCorrecta: "Falso"
    },
    {
        id: 3,
        enunciado: "¿Vite es un empaquetador de aplicaciones frontend?",
        opciones: ["Verdadero", "Falso"],
        respuestaCorrecta: "Verdadero"
    }
];

export default function Layout() {
    // Estados para controlar el flujo del juego
    const [indicePregunta, setIndicePregunta] = useState(0);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [respuestaValidada, setRespuestaValidada] = useState(false);
    const [esCorrecta, setEsCorrecta] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    // Obtener la pregunta actual basada en el índice
    const preguntaActual = PREGUNTAS_MOCK[indicePregunta];

    // Acción 1: Guardar la opción que el usuario presiona
    const manejarSeleccion = (opcion) => {
        if (respuestaValidada) return; // Bloquear selección si ya validó
        setOpcionSeleccionada(opcion);
    };

    // Acción 2: Validar si la respuesta es correcta al dar "Confirmar"
    const confirmarRespuesta = () => {
        if (!opcionSeleccionada) return alert("Por favor, selecciona una opción");

        const validacion = opcionSeleccionada === preguntaActual.respuestaCorrecta;
        setEsCorrecta(validacion);
        setRespuestaValidada(true);
    };

    // Acción 3: Avanzar a la siguiente pregunta (Solo si fue verdadera)
    const siguientePregunta = () => {
        // Reiniciar estados para la nueva pregunta
        setOpcionSeleccionada(null);
        setRespuestaValidada(false);

        if (indicePregunta + 1 < PREGUNTAS_MOCK.length) {
            setIndicePregunta(indicePregunta + 1);
        } else {
            setJuegoTerminado(true);
        }
    };

    if (juegoTerminado) {
        return (
            <div className="text-center p-10 bg-[#292465] text-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <h2 className="text-3xl font-bold text-[#38c623]">¡Felicidades!</h2>
                <p className="mt-2">Has completado todas las preguntas con éxito.</p>
            </div>
        );
    }

    const navigate = useNavigate()
    const ingresarInicio = () => {
        
        navigate('/') // Navegará a '/' (Inicio)
    }

    return (
        <div className=" h-screen mx-auto p-6 bg-[#292465] text-white">
            {/* Enunciado de la Pregunta */}
            <h2 className="text-xl font-semibold mb-6 text-center">
                {preguntaActual.enunciado}
            </h2>

            {/* Botones de Opciones */}
            <div className="flex flex-col gap-3 mb-6">
                {preguntaActual.opciones.map((opcion, index) => (
                    <button
                        key={index}
                        onClick={() => manejarSeleccion(opcion)}
                        className={`p-3 rounded-lg border-2 transition-all font-medium
                ${opcionSeleccionada === opcion
                                ? 'border-[#38c623] bg-[#38c623]/20'
                                : 'border-slate-500 hover:border-slate-300'
                            }`}
                    >
                        {opcion}
                    </button>
                ))}
            </div>

            {/* Retroalimentación Visual de la Validación */}
            {respuestaValidada && (
                <div className={`p-3 mb-4 text-center rounded-lg font-bold ${esCorrecta ? 'bg-green-600' : 'bg-red-600'}`}>
                    {esCorrecta ? "¡Respuesta Correcta! 🎉" : "Respuesta Incorrecta. Inténtalo de nuevo. ❌"}
                </div>
            )}

            {/* Botón de Acción Dinámico */}
            {!respuestaValidada ? (
                <button
                    onClick={confirmarRespuesta}
                    className="w-full bg-[#38c623] text-white font-semibold p-3 rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_#38c623] transition-all"
                >
                    Confirmar Respuesta
                </button>
            ) : (
                <button
                    onClick={esCorrecta ? siguientePregunta : () => setRespuestaValidada(false)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg transition-all"
                >
                    {esCorrecta ? "Siguiente Pregunta" : "Reintentar"}
                </button>
            
            )}
            <button
                    onClick={ingresarInicio}
                    className="w-full bg-red-400 hover:bg-red-600 text-white font-bold p-3 mt-3 rounded-lg transition-all"
                >
                    Volver
                </button>


        </div>
    );
}
