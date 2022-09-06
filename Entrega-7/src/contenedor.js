const fs = require("fs");

class Contenedor {
  constructor(fileName, keys) {
    this._filename = fileName;
    this._keys = [...keys, "id"];
    this._readFileOrCreateNewOne();
  }
  
  _validateKeysExist(newData) {
    
    const objectKeys = Object.keys(newData);
    let exists = true;
    
    objectKeys.forEach((key) => {
      if(!this._keys.includes(key)) {
        exists = false;
      }
    })
    return exists;
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
    if(this._validateKeysExist(newData)){
      try {
        id = Number(id);
        const data = await this.getData();
        const parsedData = JSON.parse(data);
        const objectIdToBeUpdated = parsedData.find(
          (producto) => producto.id === id
        );
        if (objectIdToBeUpdated) {
          const index = parsedData.indexOf(objectIdToBeUpdated);
          
          objectKeys.forEach( (key) => {
            parsedData[index][key] = newData[key];
          })
          
          
          await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
          return true;
        } else {
          console.log(`ID ${id} does not exist in the file`);
          return null;
        }
  
      } catch (error) {
        `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
      }
    } else {
      return false;
    }
  
    
  }
  
  async addToArrayById(id, objectToAdd) {
    if(this._validateKeysExist(objectToAdd)) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      if (objectIdToBeUpdated) {      
        const index = parsedData.indexOf(objectIdToBeUpdated);
        const valorActual = parsedData[index];
        const currentProducts = valorActual['products']
        currentProducts.push(objectToAdd.products)
        
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
    }
    } else {
      return false;
    }
  }

  async removeFromArrayById(id, objectToRemoveId, keyName) {
    try {
      id = Number(id);
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      
      const objectIdToBeUpdated = parsedData.find(
        (producto) => producto.id === id
      );
      
      if (objectIdToBeUpdated) {
        const index = parsedData.indexOf(objectIdToBeUpdated);
        
        const valorActual = parsedData[index][keyName];
        let indexToBeRemoved = -1;
        valorActual.forEach((element, indexE) => {
          if(element.id == objectToRemoveId) {
            indexToBeRemoved = indexE
          }
        })
        const newArray = [...valorActual];
        
        if (indexToBeRemoved>-1) {
          console.log(indexToBeRemoved)
          newArray.splice(indexToBeRemoved,1)
        }
    
        parsedData[index][keyName] = newArray;
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
        return true;
      } else {
        console.log(`ID ${id} does not exist in the file`);
        return false;
      }

    } catch (error) {
      `Error Code: ${error.code} | There was an error when trying to update an element by its ID (${id})`
    }
  
  }

  async save(object) {    
    if(this._validateKeysExist(object)) {
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
    } else {
      return false;
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
