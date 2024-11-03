"use client"
import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NutritionApp from '/app/components/FoodCard';

const NutritionAppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

export default function Food({ initialNutritionData = [] }) {
    const [food, setFood] = useState('');
    const [nutritionData, setNutritionData] = useState(initialNutritionData);

    return (
        <NutritionAppWrapper>
            <h1>Find Nutrition Information for Any Food!</h1>
            <p>Enter a food name below to get nutrition information</p>
            <input
                type="text"
                value={food}
                placeholder="Food name"
                onChange={(e) => setFood(e.target.value)}
            />
            <Link href={`/${food}`}>
                <button>Get Nutrition Info</button>
            </Link>
            <NutritionApp foodNutrients={nutritionData} />
        </NutritionAppWrapper>
    );
}
