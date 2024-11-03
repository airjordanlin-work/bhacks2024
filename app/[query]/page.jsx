// FoodPage.js
"use client";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import FoodCard from "../components/FoodCard";
import styled from "styled-components";
import {
    Grid,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FoodContentWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
    background-color: #1a1a2e;
    color: #ffffff;
    border-radius: 8px;
    position: relative;
`;

const BackButton = styled(IconButton)`
    position: absolute;
    top: 16px;
    right: 16px;
    color: #e94560;
`;

const TableStyled = styled(TableContainer)`
    margin-top: 1rem;
    background-color: #0f3460;
    border-radius: 8px;
    max-height: 400px;
    overflow-y: auto;
`;

const TableHeaderCell = styled(TableCell)`
    font-weight: bold;
    color: #e94560;
    background-color: #162447;
`;

const TableCellStyled = styled(TableCell)`
    color: #ffffff;
    background-color: #1b1b2f;
`;

const RemoveButton = styled(IconButton)`
    color: #e94560;
    margin-right: 8px;
`;

export default function FoodPage() {
    const params = useParams();
    const router = useRouter();
    const food = params.food;

    const [dailyLog, setDailyLog] = useState([]);

    const { data, error } = useSWR(`/api/usda-search?query=${params.query}`, (url) =>
        fetch(url).then((res) => res.json())
    );

    useEffect(() => {
        const savedLog = JSON.parse(localStorage.getItem("dailyLog")) || [];
        setDailyLog(savedLog);
    }, []);

    const handleAddToDailyLog = (foodItem) => {
        const updatedLog = [...dailyLog, foodItem];
        setDailyLog(updatedLog);
        localStorage.setItem("dailyLog", JSON.stringify(updatedLog));
    };

    const handleRemoveFromDailyLog = (index) => {
        const updatedLog = dailyLog.filter((_, i) => i !== index);
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
    const nutrientTypes = dailyLog.reduce((types, item) => {
        item.foodNutrients.forEach(nutrient => {
            if (!types.includes(nutrient.nutrientName)) types.push(nutrient.nutrientName);
        });
        return types;
    }, []);

    return (
        <FoodContentWrapper>
            <BackButton onClick={() => router.back()}>
                <ArrowBackIcon />
            </BackButton>

            <Typography variant="h4" align="center" gutterBottom style={{ color: "#e94560" }}>
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
                                onClick={() => handleAddToDailyLog(item)}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No data found for &quot;{food}&quot;
                    </Typography>
                )}
            </Grid>

            <Typography variant="h5" align="center" gutterBottom style={{ color: "#e94560", marginTop: "2rem" }}>
                Daily Log
            </Typography>

            {dailyLog.length > 0 ? (
                <TableStyled component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell />
                                <TableHeaderCell>Food Name</TableHeaderCell>
                                {nutrientTypes.map((nutrient, i) => (
                                    <TableHeaderCell key={i}>{nutrient}</TableHeaderCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dailyLog.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCellStyled>
                                        <RemoveButton onClick={() => handleRemoveFromDailyLog(index)}>
                                            <DeleteIcon />
                                        </RemoveButton>
                                    </TableCellStyled>
                                    <TableCellStyled>{item.description}</TableCellStyled>
                                    {nutrientTypes.map((nutrient) => {
                                        const nutrientData = item.foodNutrients.find(n => n.nutrientName === nutrient);
                                        return (
                                            <TableCellStyled key={nutrient}>
                                                {nutrientData ? `${nutrientData.value} ${nutrientData.unitName}` : "N/A"}
                                            </TableCellStyled>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableStyled>
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                    No items saved in the daily log.
                </Typography>
            )}

            {dailyLog.length > 0 && (
                <Button variant="contained" color="secondary" onClick={handleClearLog} style={{ marginTop: "1rem" }}>
                    Clear Daily Log
                </Button>
            )}
        </FoodContentWrapper>
    );
}
