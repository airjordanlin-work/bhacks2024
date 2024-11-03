// components/cube.jsx
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RotatingCube({ selectedAlien }) {
    const mountRef = useRef(null);
    const cubeRef = useRef(null);

    useEffect(() => {
        // Initialize the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 7;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(500, 500);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Load initial texture or placeholder
        const loader = new THREE.TextureLoader();
        const initialTexture = loader.load('/placeholder.png'); // Placeholder or default texture
        const materials = Array(6).fill(new THREE.MeshBasicMaterial({ map: initialTexture }));
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const cube = new THREE.Mesh(geometry, materials);
        cubeRef.current = cube; // Store reference to cube
        scene.add(cube);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.015;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        if (selectedAlien && cubeRef.current) {
            // Update cube textures with selected alien's image
            const loader = new THREE.TextureLoader();
            const newTexture = loader.load(selectedAlien.image);
            const newMaterials = Array(6).fill(new THREE.MeshBasicMaterial({ map: newTexture }));
            cubeRef.current.material = newMaterials;
        }
    }, [selectedAlien]);

    return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}
