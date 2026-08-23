"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv;
    
    // Create chaotic, splashing liquid coordinates based on noise and time
    float noise1 = snoise(st * 3.0 + uTime * 0.15);
    float noise2 = snoise(st * 2.0 - uTime * 0.1);
    
    // Mouse influence (creates a swirling effect around the cursor)
    float distToMouse = distance(st, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, distToMouse);
    
    // Explosive Colors
    vec3 color1 = vec3(0.43, 0.11, 0.88);    // Deep Electric Purple
    vec3 color2 = vec3(1.00, 0.25, 0.40);    // Vibrant Pink/Magenta
    vec3 color3 = vec3(0.12, 0.53, 0.98);    // Electric Blue
    vec3 color4 = vec3(1.00, 0.65, 0.00);    // Splashing Orange
    
    // Mix the colors dynamically using complex noise patterns
    float mixRatio1 = snoise(st * 4.0 - uTime * 0.2 + mouseEffect * 2.0) * 0.5 + 0.5;
    float mixRatio2 = snoise(st * 2.5 + uTime * 0.3 - mouseEffect) * 0.5 + 0.5;
    
    vec3 baseMix = mix(color1, color2, mixRatio1);
    vec3 highlightMix = mix(color3, color4, mixRatio2);
    
    // Final splash composite
    float finalMix = snoise(st * 5.0 + uTime * 0.1 + noise1) * 0.5 + 0.5;
    vec3 finalColor = mix(baseMix, highlightMix, finalMix);
    
    // Add a glowing bright center to the splashing highlights
    finalColor += vec3(0.1, 0.1, 0.1) * smoothstep(0.8, 1.0, finalMix);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      // Speed up time slightly for a more "splashing" turbulent feel
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 1.5;
      
      const mouseX = (state.pointer.x + 1) / 2;
      const mouseY = (state.pointer.y + 1) / 2;
      
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseX, mouseY),
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <FluidPlane />
      </Canvas>
    </div>
  );
}
