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

Esto ya va cogiendo forma!!!! Pero todavía nos falta alguna cosilla para poder subir nuestras fotos
y presumir de lo bien que lo estamos pasando. Antes de subir nuestras imángenes, necesitaremos que Home
esté al tanto de la imagen, así como del comentario y del filtro... vamos, de la info que compone nuestro 
modelo de datos.

Seguro que antes de que os digamos nada, ya sabéis cómo hacemos esto... (breves segundos dramáticos).

Efectívamente, estableciéndolas como variables de estado y pasando la función que nos permite modificar su valor
como propiedad a Container.

## Peticiones a la api
  ### Subida del nuevo post
  Una vez hemos recogido toda la info necesaria, is time to upload y que comienze el postureo. Para ello, vamos a meter en Home el código que nos permita subir el post:

  ```js
  const postPost = async (post) => {
    const config = {
      method: 'post',
      url: `http://localhost:3000/api/posts`,
      data: post,
    }
    const res = await axios(config);
    console.log(res);
  }
  ```

  Esta primera función, es la responsable de enviar la info a back para que la guarde.

  ```js
  const handleSharePost = () => {
    const post = {
      username: 'nodeGirls',
      userImage: 'data:image/jpeg;base64,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',
      postImage: image,
      likes: 0,
      caption,
      filter
    }
    postPost(post);
    setStep(1);
    setTimeout(() => getPosts());
  };
  ```

  Esta segunda, recoge toda la info, para generar el objeto post y mandarlo todo ordenadito a back. Una vez hemos enviado la info y back nos devuelve una respuesta indicando que todo ha ido ok, seteamos el step a 1 y pedimos los posts actualizados. Ya tenemos subida la foto molona de nuestro último viaje

  Warnign!!!! Hemos hecho una trampilla, y es que, si hacemos la petición inmediata de los posts, puede ser que no le haya dado tiempo a actualizarse, así que le damos un "break" para que respire y se actualice, introduciendo la petición dentro de un setTimeout.

  ### Likes y dislikes, majeando actualizaciones en los posts.
  Ahora que tenemos cargados los posts y podemos subir nuestras fotos, solo nos queda un pequeño detalle que ultimar:
  
  * ¿Me gusta tu foto? ¿Sí? ¿Cómo te lo hago saber si no hay forma de darle like?
  * Me he confundidoooooo!!!!!!! Le he dado like sin querer!!!!!

  Para interaccionar con los post que estamos viendo en pantalla, vamos a trabajar con "handleLike", una función que nos permita actualizar la info del post y con una variable del objeto post, llamada "hasBeenLiked" que nos indica si ya le hemos dado a "like a esa publicación".

  La función handleLike, comprueba si ese post nos había gustado con anterioridad, en cuyo caso, resta un like, o si por el contrario, no le habíamos dado un like, sumando un like. Además cambia el valor de hasBeenLiked. Con la info actualizada, hace una petición para la actualización del post en la base de datos.  

  ```js
  const handleLike = async (post) => {
    const hasBeenLiked = !post.hasBeenLiked;
    const likes = hasBeenLiked ? post.likes + 1 : post.likes - 1;
    const config = {
      method: 'put',
      url: `http://localhost:3000/api/posts/${post.id}`,
      data: { hasBeenLiked, likes },
    }
    const res = await axios(config);
    getPosts();
  };
  ```
  Una vez más, esta lógica, hemos de enlazarla con container para que la maneje cuando hagamos click sobre el icon de likes.

  ```js
      <Container
        step={step}
        posts={posts}
        like={handleLike}
        handleCaption={setCaption}
        image={image}
        setFilter={setFilter}
      ></Container>
  ```

  Y dentro de container tendremos:

  ```js
    {step === 1 && posts.map((post, index) => <CardPost key={index} post={post} like={like} />)}
  ```

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