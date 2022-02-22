class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._libros = libros;
        this._mascotas = mascotas;;
    }

    getFullName() {
        return `${this._nombre} ${this._apellido}`;
    }

    addMascota(nombreMascota) {
        this._mascotas.push(nombreMascota);
    }

    countMascotas() {
        return this._mascotas.length;
    }

    addBook(titulo, nombreAutor) {
        this._libros.push({nombre: titulo, autor: nombreAutor})
    }

    getBookNames() {
        return this._libros.map( (libro) => libro.nombre)
    }
}

const libros = [
    {
        nombre: "Rebelión en la granja",
        autor: "George Orwell"
    },
    {
        nombre: "Sin blanca en Paris y Londres",
        autor: "George Orwell"
    }

]

const randomGuy = new Usuario("Juan", "Perez", libros ,["Perro", "Gato"])

console.log(randomGuy.getFullName()); // Juan Perez

console.log(randomGuy.getBookNames()); // 'Rebelión en la granja', 'Sin blanca en Paris y Londres'
randomGuy.addBook("Arte abstracto y arte figurativo", "SALVAT")
console.log(randomGuy.getBookNames()); // 'Rebelión en la granja', 'Sin blanca en Paris y Londres', 'Arte abstracto y arte figurativo'

console.log(randomGuy.countMascotas()); // 2
randomGuy.addMascota('Canario');
console.log(randomGuy.countMascotas()); // 3