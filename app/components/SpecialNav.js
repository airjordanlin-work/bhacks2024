"use client";

import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function SpecialNav() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#ff7926" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" component={Link} href="/">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, ml: 2,}}>
                    Plan-It
                </Typography>
                <Button color="inherit" component={Link} href="/webcam">
                    Productivity
                </Button>
                <Button color="inherit" component={Link} href="/gallery">
                    Gallery
                </Button>
                <Button color="inherit" component={Link} href="/foodcard">
                    Nutrition
                </Button>
                <Button color="inherit" component={Link} href="/journal">
                    Journal
                </Button>
                <Button color="inherit" component={Link} href="/meditation">
                    Meditate
                </Button>
            </Toolbar>
        </AppBar>
    );
}
