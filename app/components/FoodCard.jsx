
"use client"
import styled from "styled-components";
/**
 * FoodData Type
 * @typedef {Object} FoodData
 * @property {string} description - The description of the food item.
 * @property {number} gramWeight - The gram weight of the food item.
 * @property {Array<{nutrientName: string, value: number, unitName: string}>} foodNutrients - Array of nutrients.
 */

const FoodCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    border: 1px solid black;
    margin: 1rem;
    width: 250px;
    border-radius: 10px;
    background-color: #f9f9f9;
`;

export default function FoodCard({ description, gramWeight, foodNutrients = [] }) {
    return (
        <FoodCardWrapper className="food-card">
            <h2>{description}</h2>
            <p>Gram Weight: {gramWeight || "N/A"} g</p>
            <h4>Nutritional Information (per 100g)</h4>
            <ul>
                {foodNutrients.length > 0 ? (
                    foodNutrients.map((nutrient, index) => (
                        <li key={index}>
                            {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                        </li>
                    ))
                ) : (
                    <p>No nutritional information available.</p>
                )}
            </ul>
        </FoodCardWrapper>
    );
}
