"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import FoodCard from "../components/FoodCard";
import styled from "styled-components";

const FoodContentWrapper = styled.div`
    width: 80vw;
    height: 100vh;
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
    const food = params.food; // The food parameter from the URL

    // Fetch data from the USDA API using the food name
    const { data, error } = useSWR(`/api/usda-search?query=${params.query}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const foods = data?.foods || [];

    return (
        <FoodContentWrapper>
            <FoodName>{food}</FoodName>
            <FoodCardsContainer>
                {foods.length > 0 ? (
                    foods.map((item, i) => (
                        <FoodCard
                            key={i}
                            description={item.description}
                            gramWeight={item.gramWeight}
                            foodNutrients={item.foodNutrients}
                        />
                    ))
                ) : (
                    <p>No data found for &quot;{food}&quot;</p>
                )}
            </FoodCardsContainer>
        </FoodContentWrapper>
    );
}
