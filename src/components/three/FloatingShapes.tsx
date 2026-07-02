"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function WireOrb({ position, scale, speed, color }: { position: [number, number, number]; scale: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function HoloRing({ position, rotation, radius, color }: { position: [number, number, number]; rotation: [number, number, number]; radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[radius, 0.015, 12, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  return (
    <>
      <WireOrb position={[3, 1.5, -2]} scale={1.1} speed={1.5} color="#8b5cf6" />
      <WireOrb position={[-3, -1, -1]} scale={0.6} speed={2} color="#06b6d4" />

      <HoloRing position={[2.5, 0.5, -1.5]} rotation={[Math.PI / 3, 0, 0]} radius={1.6} color="#8b5cf6" />
      <HoloRing position={[-2, 1, -2]} rotation={[Math.PI / 4, Math.PI / 6, 0]} radius={1.1} color="#06b6d4" />
    </>
  );
}
