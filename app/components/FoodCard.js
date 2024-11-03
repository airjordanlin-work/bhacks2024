// FoodCard.js
"use client";
import styled from "styled-components";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

/**
 * FoodData Type
 * @typedef {Object} FoodData
 * @property {string} description - The description of the food item.
 * @property {number} gramWeight - The gram weight of the food item.
 * @property {Array<{nutrientName: string, value: number, unitName: string}>} foodNutrients - Array of nutrients.
 */

const FoodCardWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    margin: 1rem;
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
    background-color: #f9f9f9;
    overflow: hidden;
`;

const NutrientList = styled.ul`
    max-height: 150px;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

export default function FoodCard({ description, gramWeight, foodNutrients = [], onClick }) {
    return (
        <FoodCardWrapper>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {description || "Unknown Food"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Gram Weight: {gramWeight || "N/A"} g
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Nutritional Information (per 100g)
                    </Typography>
                    <NutrientList>
                        {foodNutrients.length > 0 ? (
                            foodNutrients.map((nutrient, index) => (
                                <li key={index}>
                                    <Typography variant="body2">
                                        {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                                    </Typography>
                                </li>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No nutritional information available.
                            </Typography>
                        )}
                    </NutrientList>
                </CardContent>
            </CardActionArea>
        </FoodCardWrapper>
    );
}
