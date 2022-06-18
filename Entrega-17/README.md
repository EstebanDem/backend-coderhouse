# Desafío 17

## Deploy en Heroku

### Consignas

- Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

- Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

- El servidor debe seguir funcionando en forma local.

- Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

- Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

----
### Solución

**Deploy:** https://deployentrega17.herokuapp.com

<img src="deployRutaEjemplo.png" alt="Deploy ejemplo"/>


Para poder deployar este proyecto, tuve que dejar de utilizar MongoDB local y utilizar MongoDB Atlas, por lo que las siguientes acciones fueron necesarias para que todo funcione correctamente:

1. Cambiar la key **MONGO_URI** en nuestro **.env**

```console

MONGO_URI=mongodb+srv://<USER>:<PASSWORD>q@cluster0.lmstd.mongodb.net/<DB>?retryWrites=true&w=majority

```

2. No *hard-codear* directamente el puerto.

```js
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    })
    
server.on('error', (err) => logger.error(err));
```

3. Setear el script 'start' en nuestro package.json

```json
  "scripts": {
    "start": "node ./src/server.js"
  }
```

4. Habilitar en nuestro MongoDB Atlas a todas las IPs, sino el acceso desde Heroku (y del exterior) será negado

<img src="networkAccessMongoAtlas.png" alt="MongoDB Atlas Network settings" width="700"/>