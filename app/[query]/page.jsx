"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import FoodCard from "../components/NutritionApp";
import styled from "styled-components";

const FoodContentWrapper = styled.main`
    width: 80vw;
    margin: auto;
    background-color: aquamarine;
`;

const FoodName = styled.h1`
    color: blueviolet;
`;

const FoodCardsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border: gold 5px solid;
`;

export default function FoodPage() {
    const params = useParams();

    // Fetch data from the USDA API route, using the "name" parameter
    const { data, error } = useSWR(`/api/usda-search?query=${params.query}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    // The "foods" array from the USDA response
    const foods = data?.foods || [];

    return (
        <FoodContentWrapper>
            <FoodName>{params.name}</FoodName>
            <FoodCardsContainer>
                {foods.map((food, i) => (
                    <FoodCard
                        key={i}
                        description={food.description}
                        gramWeight={food.gramWeight}
                        foodNutrients={food.foodNutrients}
                    />
                ))}
            </FoodCardsContainer>
        </FoodContentWrapper>
    );
}
