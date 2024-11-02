// interfaces/FoodData.js

/**
 * @typedef {Object} FoodData
 * @property {string} description - The description of the food item.
 * @property {number} fdcId - The USDA FoodData Central ID.
 * @property {FoodNutrient[]} foodNutrients - An array of nutrients for the food item.
 * @property {number} [gramWeight] - The gram weight of the food item, optional.
 * @property {string} [portionDescription] - Description of the portion, optional.
 * @property {FoodMeasure[]} [foodMeasures] - An array of measurement units for the food, optional.
 * @property {FoodAttribute[]} [foodAttributes] - Additional attributes for the food, optional.
 */

/**
 * @typedef {Object} FoodNutrient
 * @property {number} nutrientId - The nutrient ID.
 * @property {string} nutrientName - The name of the nutrient.
 * @property {string} unitName - The unit of the nutrient value (e.g., "g" for grams).
 * @property {number} value - The nutrient value.
 */

/**
 * @typedef {Object} FoodMeasure
 * @property {string} disseminationText - Text describing the measure.
 * @property {number} gramWeight - Gram weight associated with this measure.
 * @property {number} id - The ID of the measure.
 * @property {string} measureUnitName - The name of the measure unit.
 * @property {number} measureUnitId - The ID of the measure unit.
 */

/**
 * @typedef {Object} FoodAttribute
 * @property {number} id - The ID of the attribute.
 * @property {string} [query] - The name of the attribute, optional.
 * @property {string} value - The value of the attribute.
 */

// Example exports if needed
module.exports = {
    FoodData: {},
    FoodNutrient: {},
    FoodMeasure: {},
    FoodAttribute: {}
};
