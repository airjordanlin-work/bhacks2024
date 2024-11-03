"use client";

import { useState, useRef, useEffect } from 'react';
import { Modal, Typography, IconButton, Grid } from "@mui/material";
import styled from 'styled-components';
import { Close as CloseIcon } from '@mui/icons-material';
import * as THREE from 'three';
// Import images
import ZorgonImage from '@/app/public/images/zorgon.png';
import XyloImage from '@/app/public/images/xylo.webp';

// Alien data with images included
const aliens = [
    { id: 1, name: 'Zorgon', description: 'A powerful warlord from the Andromeda Galaxy.', image: ZorgonImage },
    { id: 2, name: 'Xylo', description: 'A mysterious being with psychic abilities.', image: XyloImage },
];

// Styled components for gallery
const GalleryWrapper = styled.div`
    background: #1a1a2e;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    text-align: center;
`;

const AlienGrid = styled(Grid)`
    max-width: 1200px;
    margin-top: 2rem;
    gap: 1rem;
`;

const ModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0f3460;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    max-width: 90%;
    text-align: center;
`;

const ModalTitle = styled(Typography)`
    color: #00e676;
`;

// Plain Three.js Rotating Cube Component with Images
function RotatingCube() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const loader = new THREE.TextureLoader();
        const textures = [
            loader.load(ZorgonImage),
            loader.load(ZorgonImage),
            loader.load(ZorgonImage),
            loader.load(ZorgonImage)
        ];

        const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}
export default function AlienGallery() {
    const [open, setOpen] = useState(false);
    const [selectedAlien, setSelectedAlien] = useState(null);

    const handleOpen = (alien) => {
        setSelectedAlien(alien);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedAlien(null);
        setOpen(false);
    };

    return (
        <GalleryWrapper>
            <Typography variant="h2" style={{ color: "#00e676", textShadow: "0px 0px 8px #00e676" }}>
                Alien Gallery
            </Typography>
            <Typography variant="h6" style={{ color: "#bdbdbd", marginTop: "1rem" }}>
                Click on an alien to learn more about them.
            </Typography>

            {/* Display Alien Names */}
            <AlienGrid container spacing={3} justifyContent="center">
                {aliens.map((alien) => (
                    <Grid item xs={12} sm={6} md={4} key={alien.id}>
                        <div onClick={() => handleOpen(alien)} style={{ cursor: 'pointer', color: "#00e676" }}>
                            {alien.name}
                        </div>
                    </Grid>
                ))}
            </AlienGrid>

            {/* Modal to show details */}
            <Modal open={open} onClose={handleClose}>
                <ModalContent>
                    <IconButton
                        onClick={handleClose}
                        style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedAlien && (
                        <>
                            <ModalTitle variant="h4">{selectedAlien.name}</ModalTitle>
                            <Typography variant="body1" style={{ color: "#ffffff", marginTop: "1rem" }}>
                                {selectedAlien.description}
                            </Typography>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* 3D Rotating Cube */}
            <RotatingCube />
        </GalleryWrapper>
    );
}
