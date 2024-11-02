"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

import Header from "./components/header";
import Navbar from "./components/navbar";
import NutritionApp from "./components/FoodCard"; // Assuming NutritionApp is the main component for the food search

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
    const [food, setFood] = useState("");

    return (
        <>
            <Header />
            <Navbar />
            <StyledDiv>
                <h1>Find Nutrition Information for Any Food!</h1>
                <p>Enter a food name below to get nutrition information</p>
                <input
                    type="text"
                    value={food}
                    placeholder="Food name"
                    onChange={(e) => setFood(e.target.value)}
                />
                <Link href={`/${food}`}>Get Nutrition Info</Link>
                <NutritionApp />
            </StyledDiv>
        </>
    );
}
