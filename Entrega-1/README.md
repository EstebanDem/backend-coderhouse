# Desafío 1
## Repaso de clases(POO) en JS

### Consignas

1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:

- **nombre**: String
- **apellido**: String
- **libros**: Object[]
- **mascotas**: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias

3) Hacer que Usuario cuente con los siguientes métodos:

- **getFullName()**: String. Retorna el nombre completo del usuario. Utilizar template strings.
- **addMascota(String)**: void. Recibe un nombre de mascota y lo agrega al array de mascotas.
- **countMascotas()**: Number. Reorna la cantidad de mascotas que tiene el usuario.
- **addBook(String, String)**: void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objecto: {nombre: String, autor: String} al array de libros
- **getBookNames()**: String[]. Retorna un array con sólo los nombres del array de libros del usuario.

4) Crear un objecto llamado usuario con valores arbitrarios e invocar todos sus métodos.

### Ejemplos

- *countMascotas*: suponiendo que el usuario tiene estas mascotas: ['perro', 'gato']. usuario.countMascotas() deberá devolver 2
- *getBooks*: suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas', autor: 'William Golding'}, {nombre: 'Fundación', autor: 'Isaac Asimov'}]. usuario.getBooks() deberá devolver: ['El señor de las Moscas', 'Fundación'].
- *getFullName*: suponiendo que el usuario tiene nombre 'Elon' y apellido 'Musk'. usuario.getFullName() deberá devolver 'Elon Musk'.