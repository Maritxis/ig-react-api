# Taller IG con React NodeGirlsMadrid 29F
Bienvenidas!!!!

> 👉 Las slides de la primera parte [las puedes ver aquí](https://slides.com/yunevk/taller-react-nodegirls/live#/).

## ¿Qué vamos a hacer?

## Pasos

## Inicializar el proyecto
1. Instala `create-react-app` con el comando `npm install -g create-react-app`.
2. Inicializa el proyecto con el comando: `npm create-react-app ig-ngm`.
3. Cambia a la capeta que contiene el código y abre tu IDE.

> :warning: **¿Tienes algún problema con Git/Node y no puedes seguir estos pasos?** ¡No te preocupes! Hemos creado este repo de [Codesandbox](https://codesandbox.io/s/create-react-app-0q9nn?fontsize=14) para que no te pierdas nada del taller. Así puedes seguirlo, y cuando termine vemos cómo podemos arreglar esos problemas. :wink:

## Arquitectura del proyecto
Como vemos `create-react-app` nos ha creado una estructura básica del proyecto. La magia la vamos a hacer dentro de la capeta `src` y vamos a dividir nuestro código entre los componentes de UI o _dummies_ y los compoenents que se responsabilizan de las 
acciones o _containers_.

En nuestro caso, solo tendremos un componente _container_ que le vamos a llama `Home.jsx` y el resto serán componentes de UI. 

Como primer paso, vamos a crear la estructura de carpetas que necesitaremos:

%%%%Imagen estructura de carpetas containers, data, components

## Montando los componentes básicos: Header, Container y Footer
Vamos a tener tres componentes básicos en nuestra página (a parte de dos más que nos permitirán tener el código separado por responsabilidades independientes). Estos son:
* **Header**
* **Container** (que va a ser la parte principal de la aplicación)
* **Footer**

Vamos a crear la estructura básica de un componente en React:

```js
import React from 'react';

const Component = () => ({});

export default Component;
```
Este paso lo repetiremos para cada uno de los componentes con sus correspondientes nombres.

## Montando el componente principal: Home
Estos tres componentes han de ir embebidos en el componente principal: `Home`, que será el que contenga toda la lógica de nuestra aplicación. Creamos el archivo `Home.jsx` dentro de la carpeta containers y le damos la estructura básica que ha de tener cualquier componente de React.

A continuación vamos a incluir nuestros tres componentes ya creados, de tal forma que el componente `Home` nos va a quedar:

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
Para que podamos visualizar `Home`, hay que incluirlo dentro de la página principal de la aplicación: `App`. El archivo `App.js` quedaría así:

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
Ahora ya podemos arrancar nuestra aplicación y ver los componentes visuales.

## Dando contenido a nuestros _dummy components_
Vamos a ver qué va a hacer cada uno de nuestros componentes y a añadirles el código que necesitan.

### Header
Este componente debe permitirnos navegar entre pantallas cuando estemos cargando la imagen y deberá permitirnos cancelar el post. Para ello vamos a incluir condicionalmente cuatro botones que estarán o no estarán dependiendo del paso en el que estemos.

Y nuestro componente `Header` quedaría así:

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

  * `step`: es el paso del flujo de carga de imágenes.
  * `hadleGoHome`: es la función que nos va a permitir navegar hasta la primera pantalla.
  * `handleNextStep`: es la función que nos permitirá navegar hasta a siguiente pantalla.
  * `handleSharePost`: es una función que navegará a home y lanzará la petición post con los datos.

### Footer
Este es el componente que nos va a permitir subir las imágenes. Para ello, incluiremos un botón que permita navegar a la pantalla de inicio y un input para seleccionar el archivo que queremos subir.

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
Donde `step` y `handleGoHome` son los mismos elementos definidos para el componente `Header`, `handleUploadImage` va ser la función que suba imágenes y el `input` va a estar deshabilitado en cualquier pantalla que no sea la inicial.

### Container
De momento, inicializaremos este componente e una forma muy básica, simplemente vamos a hacer que nos muestre el paso en el que nos encotramos. Así, `Container` nos queda tal que:

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
## Step, nuestra primera variable de estado, nuestro primer hook

Vemos que nuestros tres componentes dependen de la variable step que les pasamos como propiedad. Esta propiedad, `step` debe venir y ser manejada en el componente `Home`, pero ¿cómo? ¿como variable de estado? ¿porquéééeéééé motivooooo? :scream:

Bueno, el motivo no es especialmente sencillo, vamos a intentar explicarlo aquí, aunque seguramente, si estás haciendo el taller en vivo la explicación sea mejor. Cuando pasamos una propiedad a un componente hijo, este solo se va a actualizar si forma parte o bien de las propiedades o bien del estado del padre. Cualquier otro tipo de variable dentro del scope del componente padre que mute su valor, no se vería reflejada en el hijo.

Dicho lo cual, veamos cómo se traduce esto en código: necesitamos utilizar el método `useState` de React. Este método nos devuelve un array con dos valores, el primero, el de nuestra variable de estado y el segundo, el de la función que hemos de invocar cada vez que necesitemos mutar dicha variable, en otras palabras: 

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

## Funciones como ciudadanos de primera: pasando lógica entre componentes
Hasta el momento, nuestros componentes `Header` y `Footer`, contienen unos botones estupendísimos y preciosísimos que no hacen ná de ná. Necesitamos darles un poco de vida, pero, sobre todo de lógica. 

> :hand: One minute!!!!! ¿No habíais dicho que `Header`, `Footer` y `Container` eran componentes UI si ninguna lógica? Bingoooo!!!!! :tada: Así es, premio para tí, pequeña padawan por estar atenta. Entonces... ¿Cómo hago para darles ese soplo de vida y espíritu y que esos botones e input sirvan para algo más que para mostrar una interfaz bonita?

Para esos menesteres, vamos a hacer uso de una de las características más molonas de js que es que las funciones son ciudadanos de primera categoría, oiga, nada que envidiarles a sus primos los objetos, strings, numbers ni ningún otro. Y si estos últimos, pueden venir como parámetros de una función otra función no va a ser menos. Así, nuestros _dummy components_ quedarían:

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

Por supuesto, estas funciones habrán de venir definidas en algún lado. La lógica la definimos dentro de los _containers_. Nosotras, hoy solo tenemos un _container_, `Home`, en el que definiremos lo que queremos que haga cada una de estas funciones:

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

Hasta el momento, tenemos una app que nos permite navegar entre pantallas, y cambiar la variable de estado `step`. Hemos aprendido varias cositas interesantes, hemos hecho nuestros primero pinitos con _jsx_, con el _state_ de un componente, con los hooks, con sus propiedades... Hemos hecho un montón de cosas pero sinceramente, esa app, hasta aquí no es muy divertida. _Stay with us_, ahora vamos a entrar en la parte con más enjundia del taller!!! :mag:

## Carga inicial de los posts

> :warning: **Warning!!!!** La carga inicial de los posts es un poco compleja!!!! Keep your eyes :eyes: and ears :ear: open!!!

El componente `Container` será el que nos muestre el contenido de los post de nuestro IG. Por ello, como medida inicial lo primero que haremos, será la carga de los mismos.

Posts es una variable que pasaremos como propiedad al componente Container. Puesto que nos interesa que cada vez que `post` varíe su valor, `Container` se actualice, hemos de establecerla como parte del estado de` Home`. Esto lo hacemos de manera análoga a como hacíamos con `step`.
```js
const [posts, setPosts] = useState([]); 
```

Por otra parte hemos de incluir la petición a back. Vamos a separar este proceso en varios pasos:
1. **instalación del módulo de node axios** que nos va a facilitar realizar y procesar las peticiones: 
``` npm i -S axios ```
2. **Importaremos el módulo** axios en `Home`:
``` import axios from 'axios ```
3. Queremos que la petición se realice la primera vez que se "monta" nuestro componente, para ello usaremos el _hook_ `useEffect`, al que le pasaremos como dependencia un array vacío. El hecho de que no tenga dependencias, evita que entremos en un bucle infinito:
```js
  const getPosts = async () => {
    const res = await axios.get('http;//localhost:3000/api/posts');
    setPosts(res.data);
  } 
  useEffect(() => {
    getPosts();
  }, []);
```
Una vez obtenidos los datos, estos se pasarán a `Container` (componente encargado de mostrarlos) como propiedades.

Este es el código de `Home` y de `Container` en este punto del taller: 

* **Home**:

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
* **Container**:

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

1. `CardPost`, para la visualización de los datos de las imágenes con su usuario, su comentario, sus likes y su canesú:

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

2. `CardFilter`, los componentes que nos mostrarán la imagen con filtros para que el postureo sea máximo ;P

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
Ahora que ya tenemos los posts y nuestras "tarjetillas" que nos enseñen las fotiglios con sus filtros etc, podemos darle un pco de sabor a nuestro componente _container_. Según el paso en el que estemos, container mostrará:

1. `Step = 1` :arrow_right: Se muestran los post gracias a las `CardPost`.
2. `Step = 2` :arrow_right: Se muestra la imagen subida y sometida a los distintos filtros, para que el usuario escoja uno.
3. `Step = 3` :arrow_right: Se muestra un elmento _textarea_ para introducir un comentario.

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

## ¡Enhorabuena! ¡Has completado el taller! :tada:

Esperamos que hayas aprendido mucho y te hayas quedado con ganas de seguir trasteando. :wink: ¡Eso es lo importante!

<p align="center">
  <img alt="Despedida" width="500" src="https://media.giphy.com/media/26u4exk4zsAqPcq08/giphy.gif">
</p>

Ahora tienes un mundo abierto de posibilidades: puedes tratar de mejorar tu aplicación, añadir nuevas funcionalidades, seguir estudiando, practicando, ¡lo que tú quieras!

Si quieres seguir ampliando información, recuerda que tienes varios enlaces en las slides para seguir aprendiendo. ¡Pero tómatelo con calma! ¡Ahora toca celebrarlo! :beers:

## ¡Pero esto no termina aquí!

¡No ha hecho más que empezar!

Si tienes cualquier duda o sugerencia, puedes dejarla en un `issue` de este repo, o incluso hacer una `pull request` encuentras algún error o quieres añadir algo. 🤗

<p align="center">
  <img alt="Despedida" width="500" src="https://media.giphy.com/media/m9eG1qVjvN56H0MXt8/giphy.gif">
</p>