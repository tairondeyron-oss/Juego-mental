import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LISTA_PREGUNTAS } from "../data/preguntas";


export default function Juego() {

    // Iniciar estados funcionalidad de preguntas del juego

    // Inicialización de estado preguntas desde 0 del array externo
    const [indicePregunta, setIndecePregunta] = useState(0);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [validarRespuesta, setValidarRespuesta] = useState(false);
    const [confirmarRespuesta, setConfirmarRespuesta] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false)


    // Apuntar dinámicamente al objeto actual del array
    const preguntaActual = LISTA_PREGUNTAS[indicePregunta]

    // Guardar respuesta seleccionada
    const seleccionarOpcion = (opcion) => {
        if(validarRespuesta) return;
        setOpcionRespuesta(opcion);
    }

    // Validar si la opcion es correcta
    const validarPregunta = () => {
        if(!opcionSeleccionada) return alert('Seleccione una respuesta primero');

        const confirmacion = opcionSeleccionada === preguntaActual.respuestaCorrecta;
        setValidarRespuesta(validacion);
        setConfirmarRespuesta(true);
    }

    // Continuar si la opcion es correcta

    const validacionCorrecta = () =>{
        // Reiniciar estados
        setOpcionSeleccionada(null);
        setValidarRespuesta(false);

        // Aparecer nueva pregunta
        if(preguntaActual + 1 < LISTA_PREGUNTAS.length){
            preguntaActual(preguntaActual + 1);
        } else {
            setJuegoTerminado(true);
        }
    }

    // Terminar juego si todas las respuestas son respondidas

    if(juegoTerminado){
        return(
            <div>
                <h1>Juego terminado</h1>
                <p>Felcitaciones has completa exitosamente cada ejercicio matemático</p>
            </div>
        )
    }

    // Navegar a inicio Boton volver

    const navigate = useNavigate();

    const navegarInicio = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen w-full  bg-fondo ">

            <div className="flex flex-col mx-4 py-10  gap-4 items-center  text-white  ">
                <h1 className="text-xl font-kite break-word whitespace-normal overflow-hidden text-center ">Si lor un coco vale 45$ y una  mandarina vale 17$</h1>

                <div className=" mt-66 border-b -pb-2  ">
                    <input 
                    className=" text-center focus:outline-none "
                    type="text" placeholder="Ingrese su respuesta" />
                </div>

                <div className="flex flex-row-reverse  gap-14 ">
                    <button className="border-2  py-2 px-8 rounded-xl mt-10 bg-green-500 hover:bg-green-600 border-none " >Confirmar</button>
                    <button className="border-2  py-2 px-8 rounded-xl mt-10   bg-red-500 hover:bg-red-600 border-none  " >Regresar</button>
                </div>
            </div>
        </div>
    )
}