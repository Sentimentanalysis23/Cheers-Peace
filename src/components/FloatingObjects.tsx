"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Torus */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <torusGeometry args={[1, 0.4, 32, 100]} />
          <MeshDistortMaterial 
            color="#ccff00" // Acid Green
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Floating Icosahedron */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[4, -2, -3]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial 
            color="#ff00ff" // Hot Pink
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
      
      {/* Floating Sphere */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[1, 3, -4]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial 
            color="#00ffff" // Electric Blue
            envMapIntensity={1.5}
            clearcoat={1}
            metalness={1}
            roughness={0}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingObjects() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[#09090b]">
      <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ccff00" />
        <Environment preset="city" />
        <GeometricShapes />
      </Canvas>
    </div>
  );
}
