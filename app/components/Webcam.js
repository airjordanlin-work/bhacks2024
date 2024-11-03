"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import TimeGraph from '@/app/(with-nav)/webcam/TimeGraph';

const WebcamWithBoundingBoxes = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [timeInBoxes, setTimeInBoxes] = useState([0, 0, 0]); // Track time for each bounding box
    const isCountingRef = useRef([false, false, false]); // Use ref to avoid dependency issues

    const boundingBoxes = [
        { id: 0, x: 150, y: 150, width: 100, height: 250 },
        { id: 1, x: 275, y: 150, width: 100, height: 250 },
        { id: 2, x: 400, y: 150, width: 100, height: 250 },
    ];

    useEffect(() => {
        const loadModel = async () => {
            const tf = await import('@tensorflow/tfjs');
            const cocoSsd = await import('@tensorflow-models/coco-ssd');
            const loadedModel = await cocoSsd.load();
            setModel(loadedModel);
        };

        const enableWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    const { videoWidth, videoHeight } = videoRef.current;
                    canvasRef.current.width = videoWidth;
                    canvasRef.current.height = videoHeight;
                };
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        loadModel();
        enableWebcam();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        const detectObjects = async () => {
            if (videoRef.current.readyState === 4 && model) {
                const predictions = await model.detect(videoRef.current);
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                boundingBoxes.forEach(box => {
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(box.x, box.y, box.width, box.height);
                });

                const newIsCounting = Array(boundingBoxes.length).fill(false);

                predictions.forEach(prediction => {
                    if (prediction.class === 'person') {
                        const [x, y, width, height] = prediction.bbox;
                        const personBox = {
                            x: x + width * 0.3,
                            y: y + height * 0.3,
                            width: width * 0.4,
                            height: height * 0.4,
                        };

                        // Draw the red box around the detected person
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(personBox.x, personBox.y, personBox.width, personBox.height);

                        boundingBoxes.forEach((box, index) => {
                            if (checkOverlap(personBox, box)) {
                                newIsCounting[index] = true;
                            }
                        });
                    }
                });

                isCountingRef.current = newIsCounting;
            }
        };

        const checkOverlap = (rect1, rect2) => (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );

        const intervalId = setInterval(detectObjects, 100);
        return () => clearInterval(intervalId);
    }, [model]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeInBoxes(prevTimes => {
                return prevTimes.map((time, index) => (
                    isCountingRef.current[index] ? time + 0.1 : time
                ));
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <video ref={videoRef} autoPlay playsInline></video>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
            <TimeGraph timeInBoxes={timeInBoxes} />
        </div>
    );
};

export default WebcamWithBoundingBoxes;
