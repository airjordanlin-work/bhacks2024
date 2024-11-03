"use client";
import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NutritionApp from '/app/components/FoodCard';
import { Typography, Button, TextField } from "@mui/material";

// Wrapper with original background
const NutritionAppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
    /* Retain the original background */
    background-color: inherit;
    color: #e0e0e0;
    text-align: center;
`;

const SpaceHeader = styled(Typography)`
    font-size: 2.5rem !important;
    font-weight: bold !important;
    color: #e0e0e0 !important;
    text-shadow: 0px 0px 8px #00e676;
    margin-bottom: 1rem !important;
`;

const SpaceDescription = styled(Typography)`
    color: #bdbdbd;
    font-size: 1.2rem !important;
    margin-bottom: 2rem !important;
`;

const SpaceInput = styled(TextField)`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin-bottom: 1rem !important;

    & .MuiOutlinedInput-root {
        color: #e0e0e0;
    }
    & .MuiOutlinedInput-notchedOutline {
        border-color: #00e676;
    }
    & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #00e676;
    }
`;

const SpaceButton = styled(Button)`
    color: #fff !important;
    background-color: #00e676 !important;
    box-shadow: 0px 0px 12px #00e676 !important;
    margin-bottom: 2rem !important;

    &:hover {
        background-color: #00c853 !important;
        box-shadow: 0px 0px 20px #00c853 !important;
    }
`;

export default function Food({ initialNutritionData = [] }) {
    const [food, setFood] = useState('');
    const [nutritionData, setNutritionData] = useState(initialNutritionData);

    return (
        <NutritionAppWrapper>
            <SpaceHeader variant="h1">Find Nutrition Information for Any Food!</SpaceHeader>
            <SpaceDescription>Enter a food name below to get nutrition information</SpaceDescription>
            <SpaceInput
                type="text"
                value={food}
                placeholder="Food name"
                onChange={(e) => setFood(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <Link href={`/${food}`}>
                <SpaceButton variant="contained">Get Nutrition Info</SpaceButton>
            </Link>
            <NutritionApp foodNutrients={nutritionData} />
        </NutritionAppWrapper>
    );
}
