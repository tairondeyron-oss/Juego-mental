import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LISTA_PREGUNTAS } from '../data/preguntas.js'

export default function Juego() {

    // Iniciar estados funcionalidad de preguntas del juego

    const [indicePregunta, setIndecePregunta] = useState(0); // enunciado 0
    const [respuestaPregunta, setRespuestaPregunta] = useState(null);
    const [validarRespuesta, setValidarRespuesta] = useState(false);
    const [confirmarRespuesta, setConfirmarRespuesta] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [modalActivo, setModalActivo] = useState(false);

    // Apuntar dinámicamente al objeto actual del array
    const preguntaActual = LISTA_PREGUNTAS[indicePregunta];

    // Responder pregunta
    const textoRespuesta = (e) => {
        setRespuestaPregunta(e.target.value);
    };

    // Validar si la opcion es correcta
    const validarPregunta = () => {
        if(!respuestaPregunta) return alert('Escriba una respuesta primero');

        const confirmacion = respuestaPregunta === preguntaActual.respuestaCorrecta;
        setValidarRespuesta(confirmacion);
        setConfirmarRespuesta(true);
    };

        // Manejar intento
    const manejarIntento = () => {
        setConfirmarRespuesta(false);
        setValidarRespuesta(false);
        setRespuestaPregunta("");
    }

    // Continuar si la opcion es correcta
    const validacionCorrecta = () =>{
        // Reiniciar estados
        setRespuestaPregunta(null);
        setValidarRespuesta(false);
        setConfirmarRespuesta(false);

        // Aparecer nueva pregunta
        if(indicePregunta + 1 < LISTA_PREGUNTAS.length){
            setIndecePregunta(indicePregunta + 1)
        } else {
            setModalActivo('exito');
        }
    };

    const info = () => {
        setModalActivo(true);
    }

    // Navegar a inicio Boton volver
    const navigate = useNavigate();

    const navegarInicio = () => {
        navigate('/')
    };

    return (
        <div className="min-h-screen w-full  bg-fondo ">

            <div className="flex flex-col mx-4 py-10  gap-4 items-center  text-white  ">
                <h1
                className="text-xl font-kite break-word whitespace-normal overflow-hidden text-center "
                >{preguntaActual.enunciado}
                </h1>

                <div className=" mt-66 border-b -pb-2  ">
                    <input 
                    onChange={textoRespuesta}
                    value={respuestaPregunta || ''}
                    className=" text-center focus:outline-none "
                    type="text" placeholder="Ingrese su respuesta" />
                </div>

                <div className="flex flex-row-reverse  gap-14 ">
                    {!confirmarRespuesta && (
                        <button 
                    onClick={validarPregunta}
                    className="border-2  py-2 px-8 rounded-xl mt-10 bg-green-500 hover:bg-green-600 border-none " 
                    >Confirmar
                    </button>
                    )}

                    {confirmarRespuesta && (
                        validarRespuesta ? (
                            <button
                            onClick={validacionCorrecta}
                            className="py-2 px-6  mt-10 rounded-2xl outline:border-none bg-blue-500 hover:bg-blue-600"
                            > Siguiente pregunta
                            </button>
                        ) :
                        <button
                        onClick={manejarIntento}
                        className="py-2 px-6 mt-10 rounded-2xl outline:border-none bg-red-500 hover:bg-red-600"
                        >Intentar nuevamente
                        </button>
                    )}
                    <button 
                        onClick={navegarInicio}
                        className="border-2  py-2 px-8 rounded-xl mt-10   bg-red-500 hover:bg-red-600 border-none  " 
                        > Regresar
                    </button>

                </div>
                
                <button
                onClick={() => setModalActivo('info')}
                className=  "mt-12 py-2 px-4 rounded-2xl bg-blue-400  transition-all"
                >Ver información
                </button>            

                {modalActivo && (
                    <div 
                    onClick={() => setModalActivo(null)}
                    className="fixed inset-0 bg-black/75 backdrop:blur-sm flex items-center justify-center z-50 ">
                        <div 
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-800 text-white p-6 rounded-2xl max-w-sm w-full mx-4 border border-slate-700 shadow-2xl flex flex-col items-center gap-2 text-center ">
                            
                            {modalActivo === 'exito' && (
                                <>
                                    <h2 className="text-xl">¡Felicidades ha completado el juego!</h2>
                                    <button
                                    onClick={navegarInicio}
                                    className="py-2 px-6 mt-10 rounded-2xl outline:border-none bg-fuchsia-800 hover:bg-fuchsia-600"
                                    >Volver a inicio
                                    </button>
                                </>
                            )}
                            {modalActivo === 'info' && (
                                <>
                                    <p>Este mini juego tiene como fin que practiques tu agilidad mental con una seria de ejercicios matemáticas simples</p>
                                </>
                            )}
                        
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}