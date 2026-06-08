import React from "react";
import { useNavigate } from 'react-router-dom';


export default function Inicio() {
    const navigate = useNavigate()

    const ingresarPrincipal = () => {
        navigate('/principal') // Navegará a principal (Layout)
    }

    return(
        <div className="bg-fondo">
            <div className="h-screen flex flex-col items-center justify-center gap-65 text-white text-3xl font-joti"> 
                <h1 className="-mt-40 mx-15 text-center">Ejercita tu mente con Vix</h1>
                <button 
                onClick={ingresarPrincipal}
                className="bg-boton1 py-5 px-22 rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.15)] hover:shadow-[0_0_20px_#38c623] transition-shadow duration-200 ">Incio</button>
            </div>
        </div>
    )
}