import { useState, useEffect } from 'react';

// useFetch servirá para hacer peticiones HTTP (fetch) a donde necesitemos
// recibe por params la url a la que se le hará la petición (la que me da MovieDB) y opciones
export default function useFetch(url, options){

    //Nuestro Hook será una mezcla entre 3 Estados de useState y un useEffect

    //Para saber si está haciendo la petición o si ya terminó de hacerla
    const [loading, setLoading] = useState(true);
    //Guarda el resultado de la petición
    const[result, setResult] = useState(null);
    //Guarda si ocurrió un error con la petición o con el resultado de la misma
    const[error, setError] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                // el await fetch es el que hace la petición al url
                const res = await fetch(url, options)
                const json = await res.json();
                setLoading(false);
                setResult(json);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        })();
    }, [options, url]);   //Cuando se actualice optios o url se va a volver a ejecutar el useEffect


    return { loading, result, error };
}