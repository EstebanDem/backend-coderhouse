# Desafío 7
## Nuestra primera base de datos

### Consignas

- Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 6, y

    - cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
    - cambiar la persistencia de los productos de memoria a base de datos MariaDB.

- Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

*Notas:*
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce
