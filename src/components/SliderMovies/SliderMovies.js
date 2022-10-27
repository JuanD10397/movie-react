import React from 'react';
import { Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
//Mis componentes
import Loading from "../Loading";

import './SliderMovies.scss';

export default function SliderMovies(props){

    // movies contiene el resultado de mi hook useFetch, por lo tanto tiene 3 propiedades: loading, result y error
    const { movies } = props;

    //Si  el fetch sigue cargado o no hay resultado
    if(movies.loading || !movies.result){
        return <Loading />
    }

    //Si ya terminó de cargar y hay resultado

    const { results } = movies.result;

    return (
        <Carousel autoplay className="slider-movies">
            { results.map(movie => (
                //results tiene todas las películas. Haré un map para obtener una por una usando el Componente interno
                //paso el key (cada película tiene un key) y los datos de la película al componente Movie
                <Movie key={movie.id} movie={movie} />
            ))}
        </Carousel>
    );
}


    //Componente interno, que tendrá una única película

    function Movie(props){
        //backdrop_path es la ruta a la carátula de la película, overview es un resumen de info sobre la película
        const {
            movie: {id, backdrop_path, title, overview}
        } = props;

       const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
       

        return (
            <div 
                className="slider-movies__movie" 
                style={{ backgroundImage: `url('${backdropPath}')`}}
            >
                <div className="slider-movies__movie-info">
                    <div>
                        <h2>{title}</h2>
                        <p>{overview}</p>
                        <Link to={`/movie/${id}`}>
                            <Button type="primary">Ver más</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
            
        
    }



