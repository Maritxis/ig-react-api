# Taller IG con React nodegirlsmadrid 29F
Bienvenidas!!!!

## ¿Qué vamos a hacer?

## Pasos

## Inicializar el proyecto
1. Instala create-react-app con el comando npm install -g create-react-app.
2. Inicializa el proyecto con el comando: npm create-react-app ig-ngm
3. Cambia a la capeta que contiene el código y abre tu IDE

## Arquitectura del proyecto
Como vemos "create-react-app" nos ha creado una estructura básica del proyecto. La magia la vamos a hacer dentro de la capeta
'src' y vamos a dividir nuestro código entre los componentes de UI o dummies y los compoenents que se responsabilizan de las 
acciones o containers. En nuestro caso, solo tendremos un componente "container" que le vamos a llamar Home.jsx y el resto serán 
componentes de UI. 

Como primer paso, vamos a crear la estructura de carpetas que necesitaremos:

%%%%Imagen estructura de carpetas containers, data, components

## Montando los componentes básicos: Header, Container y Footer
Vamos a tener tres componentes básicos en nuestra página (a parte de dos más que nos permitirán tener el código separado por responsabilidades 
independientes). Estos son:
* Header
* Container (que va a ser la parte principal de la aplicación)
* Footer

Vamos a crear la estructura básica de un componente en react:

```
  import React from 'react';

  const Component = () => ({});

  export default Component;
```
Este paso lo repetiremos para cada uno de los componentes con sus correspondientes nombres.

## Montando el componente principal: Home
Estos tres componentes han de ir embebidos en el componente principal: Home, que será el que contenga toda la lógica de nuestra aplicación.
Creamos el archivo Home.jsx dentro de la carpeta containers y le damos la estructura básica que ha de tener cualquier componente de react.

A continuación vamos a incluir nuestros tres componentes ya creados, de tal forma que el componente Home nos va a quedar:

```
import react from 'React';
import Header from '../../components/header/Header';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';

const Home = () => {
  return (
    <div>
      <Header/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default Home;
 ```
para que podamos visualizar Home, hay que incluirlo dentro de la página principal de la aplicación: App. App quedaría así:

```
import React from 'react';
import Home from './containers/home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
 ```
Ahora ya podemos arrancar nuestra aplicación y ver los componentes visuales

## Dando contenido a nuestros dummy components:
Vamos a ver qué va a hacer cada uno de nuestros componentes y a añadirles el código que necesitan:

### Header:
Este componente debe permitirnos navegar entre pantallas cuando estemos cargando la imagen y deberá permitirnos cancelar el post.
Para ello vamos a incluir condicionalmente cuatro botones que estarán o no estarán dependiendo del paso en el que estemos.

Y nuestro componente Header quedaría así:

```
import React from 'react';

const Header = ({ handleGoHome, handleNextStep, handleSharePost, step}) => {
  return (
    <>
      {step ===1 && <button onClick={handleGoHome}>Home</button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}>Cancel</button>}
      {(step ===1 || step === 2) && <button onClick={handleNextStep}>Next</button>}
      {step === 3 && <button onClick={handleSharePost}>Share</button>}
    </>
  );
};

export default Header;
 ```
donde:

  * step: es el paso del flujo de carga de imágenes.
  * hadleGoHome: es la función que nos va a permitir navegar hasta la primera pantalla.
  * handleNextStep: es la función que nos permitirá navegar hasta a siguiente pantalla.
  * handleSharePost: es una función que navegará a home y lanzará la petición post con los datos.

### Footer
Este es el componente que nos va a permitir subir las imágenes. Para ello, incluiremos un botón
que permita navegar a la pantalla de inicio y un input para seleccionar el archivo que queremos subir.

```
import React from 'react';

const Footer = ({ handleGoHome, handleUploadImage, step }) => {
  return (
    <>
      <button onClick={handleGoHome}>Home</button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step!==1}
        onChange={handleUploadImage}/>
    </>
  );
};

export default Footer;
 ```
donde step y handleGoHome son los mismos elementos definidos para el componente Header, handleUploadImage va ser la función
que suba imágenes y el input va a estar deshabilitado en cualquier pantalla que no sea la inicial. 

## Carga inicial de los posts
Aunque lo lógico ahora sería darle contenido a nuestro componete "Container", vamos a hacer un alto en el camino para traernos los
datos de la api que queremos que se visualicen dentro del mismo. Esta llamada, la vamos a hacer dentro del componente que tiene
la lógica de la aplicación: Home, puesto que estos datos se los tendremos que pasar a Container como un parámetro (no olvidemos
que los componentes en reac son funciones) y queremos que si estos cambian, nos interesa que Container se vuelva a renderizar 
con las variaciones que se hayan producido en los datos, vamos a necesitar que nuestra variable posts forme parte del estado de 
Home, ¿cómo hacemos eso? de la siguiente manera: 

```
import react, { useState } from 'React';
import Header from '../../components/header/Header';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [posts, setPosts] = useState([]); 
  return (
    <div>
      <Header/>
      <Container/>
      <Footer/>
    </div>
  )
}

export default Home;
 ```

## Componentes para la visualización de datos: CardPost y CardFilter

## Manejo del estado de los componentes para el seteo de los datos

## Container: conetnido según el step

## Peticiones a la api
  ### Actualización de posts

  ### Subida del nuevo post