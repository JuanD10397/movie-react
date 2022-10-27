import React from 'react';
import { Col, Card, Icon } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './MovieCatalog.scss';



export default function MovieCatalog(props){

    //por props recibe las películas
    const { movies: {
        results
    } } = props

    //Hago un map (ciclo). Por cada resultado realiza un return
    return results.map(movie => (
        <Col key={movie.id} xs={4} className="movie-catalog">
            <MovieCard movie={movie}/>
        </Col>
    ));
}

//Componentes internos
function MovieCard(props){

    const { movie: { id, title, poster_path } } = props;
    const { Meta } = Card; //Extraigo Meta del componente Card de antd
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
    
    return (
        <Link to={`/movie/${id}`}>
            <Card
                hoverable
                style={{width: 240}}
                cover={<img alt={title} src={posterPath} />}
                actions={[<EyeOutlined />]}
            >
            <Meta title={title}></Meta>
            </Card>
        </Link>
    );
} 