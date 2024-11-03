// FoodPage.js
"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import FoodCard from "../components/FoodCard";
import styled from "styled-components";
import { Grid, Typography } from "@mui/material";

const FoodContentWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
    background-color: aquamarine;
`;

export default function FoodPage() {
    const params = useParams();
    const food = params.food; // The food parameter from the URL

    // Fetch data from the USDA API using the food name
    const { data, error } = useSWR(`/api/usda-search?query=${params.query}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    if (error) return <Typography variant="h6" color="error">Failed to load</Typography>;
    if (!data) return <Typography variant="h6">Loading...</Typography>;

    const foods = data?.foods || [];

    return (
        <FoodContentWrapper>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                {food ? `Nutrition Info for ${food}` : "Nutrition Information"}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {foods.length > 0 ? (
                    foods.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <FoodCard
                                description={item.description}
                                gramWeight={item.gramWeight}
                                foodNutrients={item.foodNutrients}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No data found for &quot;{food}&quot;
                    </Typography>
                )}
            </Grid>
        </FoodContentWrapper>
    );
}
