// FoodPage.js
"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import FoodCard from "../components/FoodCard";
import styled from "styled-components";
import { Grid, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";

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

    // State to manage daily log
    const [dailyLog, setDailyLog] = useState([]);

    // Fetch data from the USDA API using the food name
    const { data, error } = useSWR(`/api/usda-search?query=${params.query}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    useEffect(() => {
        // Load daily log from localStorage on mount
        const savedLog = JSON.parse(localStorage.getItem("dailyLog")) || [];
        setDailyLog(savedLog);
    }, []);

    const handleAddToDailyLog = (foodItem) => {
        const updatedLog = [...dailyLog, foodItem];
        setDailyLog(updatedLog);
        localStorage.setItem("dailyLog", JSON.stringify(updatedLog));
    };

    const handleClearLog = () => {
        setDailyLog([]);
        localStorage.removeItem("dailyLog");
    };

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
                                onClick={() => handleAddToDailyLog(item)} // Save item on click
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No data found for &quot;{food}&quot;
                    </Typography>
                )}
            </Grid>

            {/* Display daily log */}
            <Typography variant="h5" align="center" color="secondary" gutterBottom style={{ marginTop: "2rem" }}>
                Daily Log
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {dailyLog.length > 0 ? (
                    dailyLog.map((item, i) => (
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
                        No items saved in the daily log.
                    </Typography>
                )}
            </Grid>

            {/* Button to clear daily log */}
            {dailyLog.length > 0 && (
                <Button variant="contained" color="secondary" onClick={handleClearLog} style={{ marginTop: "1rem" }}>
                    Clear Daily Log
                </Button>
            )}
        </FoodContentWrapper>
    );
}
