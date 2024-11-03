"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Modal, Typography, IconButton, Grid, Tooltip } from "@mui/material";
import styled from 'styled-components';
import { Close as CloseIcon } from '@mui/icons-material';
import Image from 'next/image';
import * as THREE from 'three';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Import images for aliens
import zorgonImage from "@/app/public/zorgon.png";
import xylonImage from "@/app/public/xylo.webp";
import glorpImage from "@/app/public/glorpglop.jpg";
import grimbleImage from "@/app/public/grimblegleep.jpg";
import nogginImage from "@/app/public/noodlenoggin.jpg";
import skulldozerImage from "@/app/public/skulldozer.jpg";

// Alien data with images included
const aliens = [
    {
        id: 1,
        name: 'Zorgon',
        description: 'Zorgon is a formidable creature hailing from the distant Andromeda Galaxy, known for its powerful physique and intense gaze. Resembling an alligator from Earth, Zorgon combines the fierce, predatory features of a reptile with an otherworldly intelligence and resilience that make it a force to be reckoned with across the cosmos. Its body is covered in tough, armored scales that range in color from deep emerald green to iridescent black, providing natural camouflage in its swamp-like home planet, Narkos IV.',
        image: zorgonImage
    },
    {
        id: 2,
        name: 'Xylo',
        description: 'Xylo is a mysterious and enigmatic being with powerful psychic abilities, originating from the ethereal Nebulon Star Cluster, a remote region of the galaxy known for producing some of the universe’s most gifted telepaths. Xylon’s appearance is mesmerizing; it possesses a slender, humanoid form cloaked in a shimmering aura that fluctuates between shades of deep indigo, silver, and midnight blue. Its body seems to blur at the edges, almost as if it exists partially out of phase with the physical world, adding to its otherworldly presence. Xylon’s piercing, crystalline eyes, often glowing with an eerie lavender light, are said to see beyond the material realm into the minds and emotions of others.',
        image: xylonImage
    },
    {
        id: 3,
        name: 'Glorp Glop',
        description: 'Glorp Glop is a hilariously odd creature from a distant, eccentric planet where gravity is optional, and so are eyebrows. Standing at a wobbly three feet tall, Glorp Glop\'s entire body looks like a cross between a lime-green jellybean and a half-deflated beach ball. Their skin is semi-translucent and slightly gooey, making them look like they\'re perpetually melting on a hot day, though Glorp Glop insists this is just how they radiate charm. Their eyes—yes, there are three—are large, round, and positioned at wildly different angles on their face. The top eye always looks a bit sleepy, the left one has a tendency to drift around as if it’s daydreaming, and the right one is laser-focused, constantly twitching as if in search of danger... or snacks.',
        image: glorpImage
    },
    {
        id: 4,
        name: 'Grimble Gleep',
        description: 'Grimble Gleep is an eccentric alien from the planet Nerbtok-9, known for its love of obscure trivia and intergalactic gossip. With his elongated, wrinkly gray-green face and huge, unblinking eyes, Grimble looks like he’s always in a state of intense concentration—though most of the time, he\'s just trying to figure out the latest cryptic Earth crossword puzzle. Grimble dresses in his signature lime-green robe, which he believes makes him look “incredibly stylish” by Earth standards. He has a habit of carrying around an old Earth newspaper, holding it up in front of him like he\'s deeply invested in human affairs. The truth is, he doesn’t really understand half of what he’s reading but finds Earth humor and headlines fascinatingly absurd.',
        image: grimbleImage
    },
    {
        id: 5,
        name: 'Noodle Noggin',
        description: 'Noodle Noggin is a quirky alien from the distant, eccentric planet of Spaghettiara-9. True to his name, Noodle Noggin’s head is a wobbly mass of what looks like tangled noodles—thick, twisted strands that bobble as he walks. His oversized head gives him a unique look that’s both funny and endearing. Noodle Noggin has huge, expressive eyes that seem to bulge with curiosity, always looking in different directions as he takes in the world around him. His goofy smile adds to his charm, making him look like he’s constantly on the brink of laughter.',
        image: nogginImage
    },
    {
        id: 6,
        name: 'Skulldozer Gloopjaw',
        description: 'This unusual alien could be called Skulldozer Gloopjaw, the heavy-headed wanderer from the barren moon of Fossilara IV. Skulldozer sports a massive, hollowed-out bone structure on its head that gives it an intimidating yet strangely comical look. It uses its oversized, skull-like cranium to bulldoze through obstacles—or simply to balance its wobbly purple orb perched on the back.\n' +
            '\n' +
            'With a body resembling an elephant’s trunk, supported by stubby, wrinkly legs, Skulldozer has a droopy mouth that seems forever caught in a state of sleepy surprise. Despite its heavy appearance, Skulldozer is surprisingly gentle, known for gently nudging small creatures out of its way with its skull-head and collecting shiny rocks that it carefully stores inside its bony cranium. This endearing alien might look fierce, but it\'s a curious, lovable lug with a knack for stumbling upon trouble in the most hilarious ways.',
        image: skulldozerImage
    },
];

// Styled components for gallery
const GalleryWrapper = styled.div`
    background: radial-gradient(circle, #000428, #004e92);
    color: #e0f7fa;
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

const NeonText = styled(Typography)`
    color: #00e676;
    text-shadow: 0 0 8px #00e676, 0 0 16px #00e676;
`;

const ModalContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(15, 52, 96, 0.95);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    max-width: 90%;
    text-align: center;
`;

const ModalTitle = styled(Typography)`
    color: #00e676;
    text-shadow: 0 0 8px #00e676, 0 0 16px #00e676;
`;

// Three.js Rotating Cube Component with Alien Image Textures and Enhanced Functionality
function RotatingCube() {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const cubeRef = useRef(null);

    useEffect(() => {
        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 7;

        if (!rendererRef.current) {
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;
        }

        // Load images as textures for the cube
        const loader = new THREE.TextureLoader();
        const textures = [
            loader.load(zorgonImage.src),
            loader.load(xylonImage.src),
            loader.load(glorpImage.src),
            loader.load(grimbleImage.src),
            loader.load(nogginImage.src),
            loader.load(skulldozerImage.src),
        ];

        const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const cube = new THREE.Mesh(geometry, materials);
        cubeRef.current = cube;
        scene.add(cube);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            rendererRef.current.render(scene, camera);
        };
        animate();

        // Mouse movement to rotate the cube
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const rotationX = (clientY / window.innerHeight) * Math.PI - Math.PI / 2;
            const rotationY = (clientX / window.innerWidth) * Math.PI - Math.PI / 2;
            cube.rotation.x = rotationX;
            cube.rotation.y = rotationY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Clean up on component unmount
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current.domElement.remove();
                rendererRef.current = null;
            }
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
            <NeonText variant="h2">
                Alien Gallery
            </NeonText>
            <Typography variant="h6" style={{ color: "#bdbdbd", marginTop: "1rem" }}>
                Click on an alien to learn more about them.
            </Typography>

            <AlienGrid container spacing={3} justifyContent="center">
                {aliens.map((alien) => (
                    <Grid item xs={12} sm={6} md={4} key={alien.id} onClick={() => handleOpen(alien)}>
                        <Tooltip title={`Meet ${alien.name}`} arrow>
                            <div style={{ cursor: 'pointer', color: "#00e676", textAlign: 'center' }}>
                                <Typography variant="h5" style={{ textShadow: "0px 0px 8px #00e676" }}>{alien.name}</Typography>
                                <Image
                                    src={alien.image}
                                    alt={alien.name}
                                    width={150}
                                    height={150}
                                    unoptimized
                                />
                            </div>
                        </Tooltip>
                    </Grid>
                ))}
            </AlienGrid>

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

            <RotatingCube />
        </GalleryWrapper>
    );
}
