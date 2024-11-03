// dailylog/index.js
"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DailyLogWrapper = styled.div`
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
    left: 16px;
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

export default function DailyLog() {
    const router = useRouter();
    const [dailyLog, setDailyLog] = useState([]);

    useEffect(() => {
        const savedLog = JSON.parse(localStorage.getItem("dailyLog")) || [];
        setDailyLog(savedLog);
    }, []);

    const handleRemoveFromDailyLog = (index) => {
        const updatedLog = dailyLog.filter((_, i) => i !== index);
        setDailyLog(updatedLog);
        localStorage.setItem("dailyLog", JSON.stringify(updatedLog));
    };

    const handleClearLog = () => {
        setDailyLog([]);
        localStorage.removeItem("dailyLog");
    };

    const nutrientTypes = dailyLog.reduce((types, item) => {
        item.foodNutrients.forEach(nutrient => {
            if (!types.includes(nutrient.nutrientName)) types.push(nutrient.nutrientName);
        });
        return types;
    }, []);

    return (
        <DailyLogWrapper>
            <BackButton onClick={() => router.back()}>
                <ArrowBackIcon />
            </BackButton>
            <Typography variant="h4" align="center" gutterBottom style={{ color: "#e94560" }}>
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
        </DailyLogWrapper>
    );
}
