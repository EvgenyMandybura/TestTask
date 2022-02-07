import { chooseType } from "./chooseType";

export const generateRandomString = () =>  Math.random().toString(36).substring(7);

export const generateRandomNumber = (min=-10, max=100) => Math.random() * (max - min) + min;

export const generateRandomInteger = (min=-10, max=100) => Math.floor(Math.random() * (max - min)) + min; 

export const generateRandomBoolean = () => Math.random() < 0.5;

export const getRandomArrayElement = (items) => items[Math.floor(Math.random()*items.length)];

export const generateRandomArray = (items, schemaAsObject) => {
    let randomArray = [];
    if (!items) {
        for ( let i=0; i<3; i++) {
            randomArray.push(generateRandomString())
        }
        return randomArray
    }
    if( "$ref" in items){
        let resultDataTest = {}
        let property = items["$ref"].substr(1);
        for (let key in schemaAsObject.definitions[property].properties) { 
            resultDataTest[property]  = chooseType(schemaAsObject.definitions[property].properties.type, schemaAsObject.definitions[property].properties.anyOf, schemaAsObject.definitions[property].properties[key], schemaAsObject.definitions[property])
        }
        return resultDataTest;
    }
}

export const generateRandomAnyOfItem = (arrayOfTypes) => {
    let randomElementType = getRandomArrayElement(arrayOfTypes)
    return chooseType(randomElementType.type)
}

export const generateRandomEnum = (property) => {
    return getRandomArrayElement(property)
}

export const generateRandomObject = (object) => {
    if (!object.properties) return {};
    let resultData = {}
    for (let key in object.properties) {
      let property = object.properties[key]
      resultData[key]  = chooseType(property.type, property.anyOf, property, object)
    }
    return resultData;
}