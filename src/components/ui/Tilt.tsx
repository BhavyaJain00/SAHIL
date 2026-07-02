"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number; // Maximum rotation angle in degrees
};

/**
 * 3D Hover Card Tilt effect.
 * Maps pointer coordinates relative to the bounding box of the element
 * into rotational motion around the X and Y axes, smoothed by an
 * underdamped spring oscillator system.
 */
export function Tilt({ children, className, maxRotate = 10 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinate offsets ranging from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Interpolate coordinate offsets into rotation angles.
  // Note: horizontal mouse translation (x) rotates around Y-axis,
  // vertical mouse translation (y) rotates around X-axis.
  const rotateX = useTransform(y, [-0.5, 0.5], [maxRotate, -maxRotate]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxRotate, maxRotate]);

  // Underdamped spring physics: snappy initial track with gentle settling bounce
  const springX = useSpring(rotateX, { stiffness: 120, damping: 15, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 15, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Normalised coordinates between [-0.5, 0.5]
    const normX = px / rect.width - 0.5;
    const normY = py / rect.height - 0.5;

    x.set(normX);
    y.set(normY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
