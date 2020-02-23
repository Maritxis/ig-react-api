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

```js
  import React from 'react';

  const Component = () => ({});

  export default Component;
```
Este paso lo repetiremos para cada uno de los componentes con sus correspondientes nombres.

## Montando el componente principal: Home
Estos tres componentes han de ir embebidos en el componente principal: Home, que será el que contenga toda la lógica de nuestra aplicación.
Creamos el archivo Home.jsx dentro de la carpeta containers y le damos la estructura básica que ha de tener cualquier componente de react.

A continuación vamos a incluir nuestros tres componentes ya creados, de tal forma que el componente Home nos va a quedar:

```js
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

```js
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

```js
import React from 'react';

const Header = ({ step}) => {
  return (
    <>
      {step ===1 && <button>Home</button>}
      {(step === 2 || step === 3) && <button>Cancel</button>}
      {(step ===1 || step === 2) && <button>Next</button>}
      {step === 3 && <button>Share</button>}
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

```js
import React from 'react';

const Footer = ({ step }) => {
  return (
    <>
      <button>Home</button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step!==1}
        />
    </>
  );
};

export default Footer;
 ```
donde step y handleGoHome son los mismos elementos definidos para el componente Header, handleUploadImage va ser la función
que suba imágenes y el input va a estar deshabilitado en cualquier pantalla que no sea la inicial.

### Container
De momento, inicializaremos este componente e una forma muy básica, simplemente vamos a hacer que nos muestre el paso
en el que nos encotramos. Así, Container nos queda tal que:

```js
import React from 'react';

const Container = ({ step }) => {
  return (
    <>
      <h2>Container in step {step} </h2>
    </>
  );
};

export default Container;
```
## Step, nuestra primera variable de estado, nuestro primer hook:

Vemos que nuestros tres componentes dependen de la variable step que les pasamos como propiedad. Esta propiedad, step
debe venir y ser manejada en el componente Home, pero ¿cómo? ¿como variable de estado? ¿porquéééeéééé motivooooo?

Bueno, el motivo no es especialmente sencillo, vamos a intentar explicarlo aquí, aunque seguramente, si estás haciendo el
taller en vivo la explicación sea mejor. Cuando pasamos una propiedad a un componente hijo, este solo se va a actualizar
si forma parte o bien de las propiedades o bien del estado del padre. Cualquier otro tipo de variable dentro del scope del 
componente padre que mute su valor, no se vería reflejada en el hijo.

Dicho lo cual, veamos cómo se traduce esto en código: necesitamos utilizar el método "useState" de react. Este método
nos devuelve un array con dos valores, el primero, el de nuestra variable de estado y el segundo, el de la función que hemos
de invocar cada vez que necesitemos mutar dicha variable, en otras palabras: 

```js
import react, { useState } from 'React';
import Header from '../../components/header/Header';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <Header
        step={step}
      />
      <Container
        step={step}
      />
      <Footer
        step={step}
      />
    </div>
  )
}

export default Home;
```

## Funciones como ciudadanos de primera: pasando lógica entre componentes:
Hasta el momento, nuestros componentes Header y Footer, contienen unos botones estupendísimos y preciosísimos que no hacen ná de ná.
Necesitamos darles un poco de vida, pero, sobre todo de lógica. 

One minute!!!!! ¿No habíais dicho que Header, Footer y Container eran componentes UI si ninguna lógica? Bingoooo!!!!! Así es, premio para
tí, pequeña padawan por estar atenta. Entonces... ¿Cómo hago para darles ese soplo de vida y espíritu y que esos botones e input sirvan para algo más que
para mostrar una interfaz bonita?

Para esos menesteres, vamos a hacer uso de una de las características más molonas de js que es que las funciones son ciudadanos de primera categoría,
oiga, nada que envidiarles a sus primos los objetos, strings, numbers ni ningún otro. Y si estos últmios, pueden venir como parámetros de una función
otra función no va a ser menos. Así, nuestros dummy components quedarían:

```js

const Header = ({ handleGoHome, handleShare, handleNext, step}) => {
  return (
    <>
      {step ===1 && <button onClikc={handleGoHome}>Home</button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}>Cancel</button>}
      {(step ===1 || step === 2) && <button onClick={handleNext}>Next</button>}
      {step === 3 && <button onClick={handleShare}>Share</button>}
    </>
  );
};
```

```js
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
```

Por supuesto, estas funciones habrán de venir definidas en algún lado. La lógica la definimos dentro de los containers.
Nosotras, hoy solo tenemos un container, Home, en el que definiremos lo que queremos que haga cada una de estas funciones:

```js
import react, { useState } from 'React';
import Header from '../../components/header/Header';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const handleGoHome = () => setState(1);
  const handleNext = () => setState(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  return (
    <div>
      <Header
        step={step}
        handleShare={handleShare}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
      />
      <Container
        step={step}
      />
      <Footer
        step={step}
        handleGoHome={handleGoHome}
        handleUploadImage={handleUploadImage}
      />
    </div>
  )
}

export default Home;
```

Hasta el momento, tenemos una app que nos permite navegar entre pantallas, y cambiar la variable de estado step. Hemos aprendido varias cositas interesantes, hemos hecho nuestros primero pinitos con jsx, con el state de un componente, con los hooks, con sus propiedades... Hemos hecho un montón de cosas
pero sinceramente, esa app, hasta aquí no es muy divertida. Stay with us, ahora vamos a entrar en la parte con más enjundia del taller!!!

## Carga inicial de los posts

Warning!!!! La carga inicial de los posts es un poco compleja!!!! Keep your eyes and ears open!!!

El componente Container será el que nos muestre el contenido de los post de nuestro IG. Por ello, como medida inicial lo primero que
haremos, será la carga de los mismos.

Posts es una variable que pasaremos como propiedad al componente Container. Puesto que nos interesa que cada vez que "post" varíe
su valor, Container se actualice, hemos de establecerla como parte del estado de Home. Esto lo hacemos de manera análoga a como hacíamos con step.
```js
const [posts, setPosts] = useState([]); 
``` 

Por otra parte hemos de incluir la petición a back. Vamos a separar este proceso en varios pasos:
1. instalación del módulo de node axios que nos va a facilitar realizar y procesar las peticiones: 
``` npm i -S axios ```
2. importaremos el módulo axios en Home:
``` import axios from 'axios ```
3. queremos que la petición se realice la primera vez que se "monta" nuestro componente, para ello usaremos el hook useEffect,
al que le pasaremos como dependencia un array vacío. El hecho de que no tenga dependencias, evita que entremos en un bucle infinito:
```js
  const getPosts = async () => {
    const res = await axios.get('http;//localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
```
Una vez obetnidos los datos, estos se pasarán a Container (componente encargado de mostrarlos) como propiedades.

Este es el código de Home y de Container en este punto del taller: 

* Home:

```js
import react, { useState } from 'React';
import axios from 'axios';
import Header from '../../components/header/Header';
import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]); 
  const handleGoHome = () => setState(1);
  const handleNext = () => setState(step + 1);
  const handleShare = () => {};
  const handleUploadImage = () => {};
  const getPosts = async () => {
    const res = await axios.get('http;//localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <Header
        step={step}
        handleShare={handleShare}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
      />
      <Container
        step={step}
        posts={posts}
      />
      <Footer
        step={step}
        handleGoHome={handleGoHome}
        handleUploadImage={handleUploadImage}
      />
    </div>
  )
}

export default Home;
```
* Container:

```js
import React from 'react';

const Container = ({ step, posts }) => {
  return (
    <>
      <h2>Container in step {step} </h2>
    </>
  );
};

export default Container;
```

## Componentes para la visualización de datos: CardPost y CardFilter
Vamos a incluir dos componente más que nos permitan ver la info bonita:

1. CardPost, para la visualización de los datos de las imágenes con su usuario, su comentario, sus likes y su canesú:

```js
import React from 'react';

const CardPost = ({post, like}) => {
  return (
    <article>
      <div>
        <img src={post.userImage} alt={post.username}/>
        <p>{post.username}</p>
      </div>
      <div>
        <img src={post.postImage} alt=""/>
        <div>
          <button onClick={() => like(post)}>
              <i className="far fa-heart fa-lg"></i>
          </button>
          <p>{post.likes}</p>
          <p>{post.caption}</p>
        </div>
      </div>
    </article>
  );
}

export default CardPost;
```

2. CardFilter, los componentes que nos mostrarán la imagen con filtros para que el postureo sea máximo ;P

```js
import React from 'react';

const CardFilter = ({filter, image, setFilter}) => {
  return (
    <div className={filter.name}>
      <p>{filter.name}</p>
      <div 
        className="img"
        id={filter.name}
        onClick={() => setFilter(filter.name)}>
          <img src={image} alt=""/>        
      </div>        
    </div>
  )
}

export default CardFilter;
```

## Dándole salsa a IG: completando nuestro componente container:
Ahora que ya tenemos los posts y nuestras "tarjetillas" que nos enseñen las fotiglios con sus filtros etc, podemos darle un pco de sabor a
nuestro componente container. Según el paso en el que estemos, container mostrará:

1. Step = 1 -> Se muestran los post gracias a las CardPost.
2. Step = 2 -> Se muestra la imagen subida y sometida a los distintos filtros, para que el usuario escoja uno.
3. Step = 3 -> Se muestra un elmento textarea para introducir un comentario.

Todo esto se traduce al código de la siguiente manera;

```js
const Container = ({step, posts, like, image, setFilter, handleCaption}) => {
  return (
    <>
      <h1>Container</h1>
      <h2>You are in step {step}</h2>
      {step ===1  && posts.map((post, index) => <CardPost key={index} post={post} like={like}/>)}
      {step === 2 &&
        <>
        <div className="filter-container">
          {filters.map(
            (filter, index) => 
              (<CardFilter
                filter={filter}
                image={image}
                key={index}
                setFilter={setFilter}
               />))}
        </div>
        </>
      }
      {step === 3 &&
      <>
        <div className="selected-image">
          <img src={image} alt=""/>
        </div>
        <div className="caption-container">
          <textarea 
            className="caption-input"
            type="text"
            placeholder="Write a caption..."
            onChange={(ev) => handleCaption(ev.target.value)}
          ></textarea>
        </div>
        </>
      }
    </>
  );
};
```

## Manejo del estado de los componentes para el seteo de los datos


## Peticiones a la api
  ### Actualización de posts

  ### Subida del nuevo post