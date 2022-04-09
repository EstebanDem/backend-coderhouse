# Desafío 8
## Nuestra primera base de datos

### Consignas

- Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 6, y

    - cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
    - cambiar la persistencia de los productos de memoria a base de datos MariaDB.

- Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

*Notas:*
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce

## Resolución

Se plantea el siguiente esquema para que cada Carrito pueda tener productos, solo si el carrito y el producto existen. Además, si se borra un producto o un carrito se borra en cascada en la tabla de relaciones.

![Diagrama básico tablas](https://raw.githubusercontent.com/EstebanDem/backend-coderhouse/master/Entrega-8/currentSchema.png)

### Crear Tablas y rows vía script

Con SQLite y/o MySQL configurados, solo se debe lanzar el siguiente comando por terminal y las tablas se crearán y rellenarán automáticamente.

```console
.../Entrega-8 $ npm run rebuildDB

    > entrega-8@1.0.0 rebuildDB
    > node ./src/dao/start/RebuildDB.js

    🟢 La tabla <producto> ha sido creada
    🟢 La tabla <carrito> ha sido creada
    🟢 La tabla <productoCarrito> ha sido creada
    🧪 Se agregaron Productos a la tabla
    🛒 Se agregaron Carritos a la tabla
    🛒<->🧪 Se agregaron relaciones a la tabla

```

### Ejemplo de las rows de cada tabla

```console
SELECT * FROM producto;
+----+---------------------+----------------+-------+--------------------------+------+-------------------+-------+
| id | timestamp           | title          | price | description              | code | image             | stock |
+----+---------------------+----------------+-------+--------------------------+------+-------------------+-------+
| 1  | 2022-04-09 00:31:53 | Some Product 1 | 100.0 | Some dummy description 1 | XY-1 | someDummyUrl1.com | 150   |
| 2  | 2022-04-09 00:31:53 | Some Product 2 | 200.0 | Some dummy description 2 | XY-2 | someDummyUrl2.com | 250   |
| 3  | 2022-04-09 00:31:53 | Some Product 3 | 300.0 | Some dummy description 3 | XY-3 | someDummyUrl3.com | 350   |
+----+---------------------+----------------+-------+--------------------------+------+-------------------+-------+
```

```console
SELECT * FROM carrito;
+----+---------------------+
| id | timestamp           |
+----+---------------------+
| 1  | 2022-04-09 01:33:37 |
| 2  | 2022-04-09 01:34:00 |
| 6  | 2022-04-09 01:36:02 |
| 7  | 2022-04-09 01:36:03 |
+----+---------------------+
```

```console
SELECT * FROM productoCarrito;
+----+-----------+------------+
| id | carritoId | productoId |
+----+-----------+------------+
| 8  | 7         | 2          |
| 9  | 7         | 1          |
| 10 | 7         | 3          |
+----+-----------+------------+

El carrito de id (7) tiene dentro producto 1, 2 y 3

```