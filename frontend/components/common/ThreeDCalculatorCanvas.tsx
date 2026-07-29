'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDCalculatorCanvasProps {
  expression: string;
  result: string;
}

export const ThreeDCalculatorCanvas: React.FC<ThreeDCalculatorCanvasProps> = ({ expression, result }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 300;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    // 2. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(-3, 4, 3);
    scene.add(pointLight);

    // 4. THREE.JS 3D CALCULATOR MESH GROUP
    const calculatorGroup = new THREE.Group();

    // CALCULATOR BODY (OBSIDIAN DARK MESH BOX)
    const bodyGeo = new THREE.BoxGeometry(3.2, 4.2, 0.4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    calculatorGroup.add(bodyMesh);

    // CALCULATOR SCREEN BEZEL MESH
    const screenGeo = new THREE.BoxGeometry(2.8, 1.0, 0.1);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.5,
      roughness: 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.2, 0.22);
    calculatorGroup.add(screenMesh);

    // 4x4 THREE.JS KEYPAD BUTTON MESHES
    const buttonMatWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.3 });
    const buttonMatDark = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.5, roughness: 0.4 });

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const btnGeo = new THREE.BoxGeometry(0.55, 0.45, 0.15);
        const isOperator = c === 3;
        const btnMesh = new THREE.Mesh(btnGeo, isOperator ? buttonMatWhite : buttonMatDark);
        
        const x = -1.05 + c * 0.7;
        const y = 0.3 - r * 0.65;
        btnMesh.position.set(x, y, 0.23);
        calculatorGroup.add(btnMesh);
      }
    }

    // INITIAL TILT ANGLE
    calculatorGroup.rotation.x = 0.3;
    calculatorGroup.rotation.y = -0.25;
    scene.add(calculatorGroup);

    // 5. ANIMATION LOOP (CONTINUOUS 60 FPS TILT ROTATION)
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      calculatorGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative p-2">
      {/* THREE.JS CANVAS CONTAINER */}
      <div ref={mountRef} className="w-full h-[300px] flex items-center justify-center cursor-grab" />

      {/* OVERLAY DIGITAL LCD DISPLAY */}
      <div className="w-full max-w-xs -mt-10 p-4 rounded-2xl bg-[#09090B] border-2 border-white shadow-2xl text-right font-mono text-white relative z-10">
        <div className="text-[10px] text-[#A1A1AA] uppercase font-bold tracking-widest border-b border-[#27272A] pb-1 mb-1 flex justify-between">
          <span>Three.js 3D Model</span>
          <span className="text-emerald-400">60 FPS LIVE</span>
        </div>
        <div className="text-xs text-[#A1A1AA]">{expression}</div>
        <div className="text-xl font-extrabold text-white">{result}</div>
      </div>
    </div>
  );
};
