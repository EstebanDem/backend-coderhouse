const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this._filename = fileName;
    this._readFileOrCreateNewOne();
  }

  async _readFileOrCreateNewOne() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this._createEmptyFile()
        : console.log(
            `Error Code: ${error.code} | There was an unexpected error when trying to read ${this._filename}`
          );
    }
  }

  async _createEmptyFile() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`File ${this._filename} was created since it didn't exist in the system`);
    });
  }

  async getById(id) {
    id = Number(id);
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);

      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to get an element by its ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeRemoved = parsedData.find(
        (producto) => producto.id === id
      );

      if (objectIdToBeRemoved) {
        const index = parsedData.indexOf(objectIdToBeRemoved);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to delete an element by its ID (${id})`
      );
    }
  }

  async updateById(id, newData) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      if (objectIdToBeUpdated) {
        const index = parsedData.indexOf(objectIdToBeUpdated);
        const {title, price, thumbnail} = newData;

        parsedData[index]['title'] = title;
        parsedData[index]['price'] = price;
        parsedData[index]['thumbnail'] = thumbnail;
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return null;
      }

    } catch (error) {
      `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
    }
  }

  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);

      object.id = parsedData.length + 1;
      parsedData.push(object);

      await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      return object.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | There was an error when trying to save an element`
      );
    }
  }

  async deleteAll() {
    try {
      await this._createEmptyFile();
    } catch (error) {
      console.log(
        `There was an error (${error.code}) when trying to delete all the objects`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}

module.exports = Contenedor;
