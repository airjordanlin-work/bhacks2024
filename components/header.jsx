"use client";

import { Typography } from "@mui/material";

export default function Header() {
    return (
        <Typography
            variant="h2"
            sx={{
                color: "orange",
                textAlign: "center",
                width: "100%",
                marginTop: 2, // Adjust margin as needed
                fontWeight: "bold" // Optional: add more styles as needed
            }}
        >
            Plan-It
        </Typography>
    );
}
