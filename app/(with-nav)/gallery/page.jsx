"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Modal, Typography, IconButton, Grid } from "@mui/material";
import styled from 'styled-components';
import { Close as CloseIcon } from '@mui/icons-material';
import Image from 'next/image';
import * as THREE from 'three';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import images for aliens
import zorgonImage from "@/app/public/zorgon.png";
import xylonImage from "@/app/public/xylo.webp";

// Alien data with images included
const aliens = [
    { id: 1, name: 'Zorgon', description: 'Zorgon is a formidable creature hailing from the distant Andromeda Galaxy, known for its powerful physique and intense gaze. Resembling an alligator from Earth, Zorgon combines the fierce, predatory features of a reptile with an otherworldly intelligence and resilience that make it a force to be reckoned with across the cosmos. Its body is covered in tough, armored scales that range in color from deep emerald green to iridescent black, providing natural camouflage in its swamp-like home planet, Narkos IV.', image: zorgonImage },
    { id: 2, name: 'Xylo', description: 'Xylo is a mysterious and enigmatic being with powerful psychic abilities, originating from the ethereal Nebulon Star Cluster, a remote region of the galaxy known for producing some of the universe’s most gifted telepaths. Xylon’s appearance is mesmerizing; it possesses a slender, humanoid form cloaked in a shimmering aura that fluctuates between shades of deep indigo, silver, and midnight blue. Its body seems to blur at the edges, almost as if it exists partially out of phase with the physical world, adding to its otherworldly presence. Xylon’s piercing, crystalline eyes, often glowing with an eerie lavender light, are said to see beyond the material realm into the minds and emotions of others.\n' +
            '\n', image: xylonImage },
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

// Three.js Rotating Cube Component with Alien Image Textures
function RotatingCube() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Load images as textures for the cube
        const loader = new THREE.TextureLoader();
        const textures = [
            loader.load(zorgonImage.src),
            loader.load(xylonImage.src),
            loader.load(zorgonImage.src),
            loader.load(xylonImage.src),
            loader.load(zorgonImage.src),
            loader.load(xylonImage.src),
        ];

        const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Clean up function to remove renderer on component unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []); // Run only once when the component mounts

    return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}


export default function AlienGallery() {
    const [open, setOpen] = useState(false);
    const [selectedAlien, setSelectedAlien] = useState(null);
    const router = useRouter();


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

            {/* Display Alien Names and Images */}
            <AlienGrid container spacing={3} justifyContent="center">
                {aliens.map((alien) => (
                    <Grid item xs={12} sm={6} md={4} key={alien.id} onClick={() => handleOpen(alien)}>
                        <div style={{ cursor: 'pointer', color: "#00e676", textAlign: 'center' }}>
                            <Typography variant="h5">{alien.name}</Typography>
                            <Image
                                src={alien.image}
                                alt={alien.name}
                                width={150}
                                height={150}
                                unoptimized
                            />
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
                            <Image
                                src={selectedAlien.image}
                                alt={selectedAlien.name}
                                width={300}
                                height={300}
                                unoptimized
                            />
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* 3D Rotating Cube */}
            <RotatingCube />
        </GalleryWrapper>
    );
}
