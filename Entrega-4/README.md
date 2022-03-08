# Desafío 4
## API RESTful

### Consignas

Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

- **GET** */api/productos* -> devuelve todos los productos.
- **GET** */api/productos/:id* -> devuelve un producto según su id.
- **POST** */api/productos* -> recibe y agrega un producto, y lo devuelve con su id asignado.
- **PUT** */api/productos/:id* -> recibe y actualiza un producto según su id.
- **DELETE** */api/productos/:id* -> elimina un producto según su id.

- Cada producto estará representado por un objecto con el siguiente formato

```json
{
    "title": "(nombre del producto)",
    "price": "(precio)",
    "thumbnail": "(url al logo o foto del producto)"
}
```
- Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

- Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }

- Implementar los métodos de la API en una clase separada, utilizando para la persistencia de sus productos un contenedor de los desarrollados en clases anteriores.

- Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.

- Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

- El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.

- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

## Para probar API puedes realizar lo siguiente

1. Estar en el directorio de **'Entrega-4'**

2. Instalar dependencias con: `npm install`

3. Iniciar el servidor con `npm run server`

----

### `GET | http://localhost:8080/api/productos`

✅ *Respuesta:*

```json
[
    {
        "title": "Escuadra",
        "price": 75.66,
        "thumbnail": "someUrl.com",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 72.66,
        "thumbnail": "someUrl.com",
        "id": 2
    }
]
```
### `GET | http://localhost:8080/api/productos/:id`

Para `http://localhost:8080/api/productos/3`

✅ *Respuesta:*

```json
{
    "title": "Lapicera",
    "price": 100,
    "thumbnail": "someUrl.com",
    "id": 3
}
```

Para un ID que no está presente, por ejemplo: `http://localhost:8080/api/productos/321321`

❌ *Respuesta:*

```json
{
    "error": "Producto no encontrado"
}
```

### `POST | http://localhost:8080/api/productos`

*Request:*

Body en JSON (no validados)

```json
{
    "title": "New Item",
    "price": 3100,
    "thumbnail": "someNewUrl.com",
}
```

*Respuesta:*

✅ `Producto agregado con el ID: 5`


### `PUT | http://localhost:8080/api/productos/:id`

Para `http://localhost:8080/api/productos/2`

*Request:*

Body en JSON (no validados, los 3 campos son requeridos)

```json
{
    "title": "New Updated Title",
    "price": 125,
    "thumbnail": "someUpdatedUrl.com"
}

```

*Respuesta:*

✅ `El producto de ID: 2 fue actualizado`

Para un ID que no está presente, por ejemplo: `http://localhost:8080/api/productos/321321`

*Respuesta:*

❌ `El producto no fue actualizado porque no se encontró el ID: 3123`

### `DELETE | http://localhost:8080/api/productos/:id`

Para `http://localhost:8080/api/productos/3`

*Respuesta:*

✅ `El producto de ID: 3 fue borrado`

Para un ID que no está presente, por ejemplo: `http://localhost:8080/api/productos/321321`

*Respuesta:*

❌ `El producto no fue borrado porque no se encontró el ID: 321321`