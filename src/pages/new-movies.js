import React, { useState, useEffect} from 'react';
import { Row, Col} from 'antd';
//Mis Hooks, Componentes y Constantes
import { URL_API, API_KEY } from '../utils/constants';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import MovieCatalog from '../components/MovieCatalog';
import PaginationMovie from '../components/PaginationMovie';


export default function NewMovies(){
    
    //Estado que tiene la lista de películas
    const [movieList, setMovieList] = useState([]);
    //Estado de la paginación. Page es la página en la que estamos
    const [page, setPage] = useState(1);
    
    
    useEffect(() => {
        //Usaremos función asíncrona, hasta que las películas no carguen voy a mostrar un Loading
        (async () => {
            //No usaremos el Hook de Fetch que creamos. Usaremos un Fetch normal, solo para tener un ejemplo de ambas opciones
            const response = await fetch(
                `${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}`
            );
            const movies = await response.json();
            setMovieList(movies);
        })()
    }, [page]); //useEffect se ejecuta cada vez que cambie el page


    //Función para cambiar de página en la paginación (el onChangePage lo envía el componente Pagination de antd de forma automática, sin que hagamos nada) solo la recogemos y actualizamos
    const onChangePage = page => {
        setPage(page);
    }



    return (
        <Row>
            <Col span="24" style={{ textAlign: "center", marginTop:25 }}>
                <h1 style={{ fontSize: 35, fontWeight: "bold"}}>
                    Últimos Lanzamientos
                </h1>
            </Col>

            {/**Este ? es parte de un if corto. Si movieList.results tiene resultados se hace eso, sino, Loading */}
            { movieList.results ? (
                <Row>
                    <MovieCatalog movies={movieList} />
                    <Col span="24">
                        <PaginationMovie 
                            currentPage={movieList.page}
                            totalItems={movieList.total_results}
                            onChangePage={onChangePage}
                        />
                    </Col>
                </Row>
            ) : (
                <Col span="24">
                    <Loading />
                </Col>
            )}

            <Col span={24}>
                <Footer />
            </Col>
            
        </Row>
    );
}