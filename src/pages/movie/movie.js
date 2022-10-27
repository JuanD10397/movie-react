import React, { useState } from 'react';
import { Row, Col, Button } from "antd";
import { PlayCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom"; //Es un Hook que permite obtener los parámetros de la url
import moment from "moment";
//Mis Hooks, Componentes y Constantes
import useFetch from "../../hooks/useFetch";
import { URL_API, API_KEY } from "../../utils/constants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./movie.scss";



export default function Movie(){

    //Este es el Hook que importé, toma los parámetros del url, en este caso el id de la película
    const { id } = useParams(); 

    //obtengo detalles de la película con el Hook que creé. Revisar documentación de la API en moviedb
    const movieInfo = useFetch(
        `${URL_API}/movie/${id}?api_key=${API_KEY}&language=es-ES`
    );

    // Si sigue cargando o el resultado es nulo aparece el spinner de loading
    if(movieInfo.loading || !movieInfo.result){
        return <Loading />
    }

    // Si todo funciona bien retornaré el Componente Interno RenderMovie
    return (
        <RenderMovie movieInfo={movieInfo.result}/>
    );
}


//COMPONENTES INTERNOS

function RenderMovie(props){

    const { 
        movieInfo: { backdrop_path, poster_path } 
    } = props;

    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;


    return (
        <div 
            className="movie" 
            style={{backgroundImage: `url('${backdropPath}')`}}
        >
            <div className="movie__dark" />
            <Row>
                <Col span={8} offset={3} className="movie__poster">
                    <PosterMovie image={poster_path}/>
                </Col>
                <Col span={10} className="movie__info">
                    <MovieInfo movieInfo={props.movieInfo}/>
                </Col>
            </Row>
        </div>
    )
}


function PosterMovie(props){
    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`;

    return (
        <div style={{backgroundImage: `url('${posterPath}')`}}></div>
    )
}


// Va a renderizar toda la info de la película
function MovieInfo(props){
    const { 
        movieInfo: { id, title, release_date, overview, genres } 
    } = props;

    //Estado para saber si mostrar el modal del trailer o no
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    //Datos del video (trailer) de la película
    const videoMovie = useFetch(
        `${URL_API}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );


    // Función para abrir y cerrar el Modal del trailer
    const openModal = () => setIsVisibleModal(true);
    const closeModal = () => setIsVisibleModal(false);


    //Función para renderizar el botón de trailer (si la película no tiene trailer no va a renderizar el botón)
    const renderVideo = () => {
        if(videoMovie.result){
            if(videoMovie.result.results.length > 0) {  // Si el resultado tiene al menos un video, entra
                return (
                    <>
                        <Button onClick={openModal}>
                            <PlayCircleOutlined />
                            Ver Trailer
                        </Button>
                        <ModalVideo 
                            videoKey={videoMovie.result.results[0].key}
                            videoPlatform={videoMovie.result.results[0].site}
                            isOpen={isVisibleModal}
                            close={closeModal}
                        />
                    </>
                )
            }
        }
    }



    return (
        <>
            <div className="movie__info-header">
                <h1>
                    {title}
                    <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
                </h1>
                {renderVideo()}
            </div>
            <div className='movie__info-content'>
                <h3>Información</h3>
                <p>{overview}</p>
                <h3>Géneros</h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}