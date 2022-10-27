import React, { useState, useEffect }from 'react';
import { Row, Col, Input } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
//Mis Componentes, Hooks, y Constants
import MovieCatalog from '../../components/MovieCatalog';
import Footer from '../../components/Footer';
import { URL_API, API_KEY } from '../../utils/constants';

import './search.scss';


function Search(props){

    // Recibo por props cosas que me manda el withRouter más abajo
    // En video usa history, pero en ReactV6 eso se cambió por navigate
    const { location, navigate } = props.router;

    // console.log(props);
    // console.log(navigate);
    // console.log(location);

    //Estados
    const [movieList, setMovieList] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // cada vez que se modifique location.search el useEffect se volverá a ejecutar
    useEffect(() => {
        (async () => {
            
            // Tomo el valor de búsqueda que está en la url. Devuelve un objeto, quiero solo el valor que busco
            const searchValue = queryString.parseUrl(location.search);
            // s es el valor que estoy buscando. Es lo que escribí en el buscador
            const { s } = searchValue.query;

            // Hago petición HTTP a TheMovieDB como indica en el link (en mi caso usaré las constantes que ya tengo)
            // https://developers.themoviedb.org/3/search/search-movies
            const response = await fetch(
                `${URL_API}/search/movie?api_key=${API_KEY}&language=es-ES&query=${s}&page=1`
            );

            // movies tiene el resultado en json de todas las películas encontradas 
            const movies = await response.json();

            // Seteo estados (lista de películas y buscador)
            setMovieList(movies);
            setSearchValue(s);
        })();
    }, [location.search]); 
    // location.search tendrá el valor de lo que escriba en mi buscador (useEffect se ejecutará apenas cambie el valor, no esperará a que presione buscar)

    // Función para escribir en la barra de búsqueda
    // Recibe un evento e que es el tiene el valor de la búsqueda
    const onChangeSearch = e => {
        // Tomo parámetros del url
        const urlParams = queryString.parse(location.search);
        // e.target.value tiene el valor que escribo en el input, en la barra de búsqueda
        urlParams.s = e.target.value;

        // Actualizo la url 
        navigate(`?${queryString.stringify(urlParams)}`);
        
        // Actualizo el valor que escribo en la barra de búsqueda
        setSearchValue(e.target.value);
        
        console.log(urlParams);
        console.log(e.target.value);
    }
    
    return (
        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Busca tu película</h1>
                <Input value={searchValue} onChange={onChangeSearch}/>
            </Col>
            {/*Si movieList tiene contenido entra. Significa que encontró películas */}
            {movieList.results && (
                <Row>
                    
                    <MovieCatalog movies={movieList} />
                </Row>
            )}
            <Col span={24}>
                <Footer />
            </Col>
        </Row>
    );
}

// Exporto abajo y envuelvo todo el Search con el withRouter
export default withRouter(Search);




// En React V6 el withRouter está descontinuado (deprecated). En el video lo usan
// Encontré en StackOverflow una forma de volverlo a crear  
// https://stackoverflow.com/questions/71097375/how-can-i-use-withrouter-in-react-router-v6-for-passing-props

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}



