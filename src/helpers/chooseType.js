import {
        generateRandomInteger,
        generateRandomNumber, 
        generateRandomString,
        generateRandomBoolean,
        generateRandomArray,
        generateRandomAnyOfItem,
        generateRandomEnum,
        generateRandomObject,
    } from "./generateRandomValues";

export const chooseType = (type, anyOf, property, schemaAsObject) => {
    if (!!type) {

        switch (type) {
          case "string":
            return generateRandomString()
            break;
          case "number":
            return generateRandomNumber()      
            break;
          case "integer":
            return generateRandomInteger()
            break;
          case "object":
            return generateRandomObject(property)
          case "array":
            return generateRandomArray(property.items, schemaAsObject)
          case "boolean":
            return generateRandomBoolean()
          default:
            return null
        }
      } else if (anyOf) {
        return generateRandomAnyOfItem(anyOf)
      } else { // enum
        return generateRandomEnum(property)
      }
}