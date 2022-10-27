import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Mis Componentes
import MenuTop from "./components/MenuTop";

//Pages
import Home from "./pages/home";
import NewMovies from "./pages/new-movies";
import Popular from "./pages/popular";
import Search from "./pages/search";
import Movie from "./pages/movie";
import Error404 from "./pages/error404";

function App() {


  const { Header, Content } = Layout;

  return (
    <Layout> 
      <Router>

        <Header style={{zIndex: 1}}> {/**zIndex es para que el Header esté sobre cualquier otra cosa */}
          <MenuTop />
        </Header>

        <Content>

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/new-movies" element={<NewMovies />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />                   

            {/**Esta ruta será dinámica, porque recibirá el id de cada una de las películas */}
            {/**Si en el navegador coloco /movie no sale nada, si coloco /movie/cualquiercosa ahí sí sale */}
            <Route path="/movie/:id" element={<Movie />}/>

            {/**Si no es ninguna de las rutas anteriores, cargo Error404, para eso sirve el * */}
            <Route path="*" element={<Error404 />}/>

          </Routes>

        </Content>

      </Router>
    </Layout>
  );
}





export default App;
