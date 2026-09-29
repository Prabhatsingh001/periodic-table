import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const Electron = ({ radius, speed, angleOffset, color }) => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angleOffset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * (radius * 0.2); 
  });

  return (
    <Trail width={1} length={4} color={color} attenuation={(t) => t * t}>
      <Sphere ref={ref} args={[0.1, 16, 16]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Sphere>
    </Trail>
  );
};

const Nucleus = ({ color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.5;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={ref} args={[0.5, 32, 32]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={1.5}
        wireframe={true} 
      />
    </Sphere>
  );
};

const AtomSystem = ({ atomicNumber, color }) => {
  const electronCount = Math.min(atomicNumber, 30);
  
  const electrons = useMemo(() => {
    return Array.from({ length: electronCount }).map((_, i) => ({
      radius: 1.5 + (i % 3) * 0.5 + Math.random() * 0.2,
      speed: 1 + Math.random() * 1.5,
      angleOffset: (i / electronCount) * Math.PI * 2,
    }));
  }, [electronCount]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Nucleus color={color} />
      {electrons.map((e, i) => (
        <Electron key={i} {...e} color={color} />
      ))}
    </group>
  );
};

const Atom3D = ({ atomicNumber, color = "#b87333" }) => {
  const { isDark } = useTheme();
  const canvasBg = isDark ? '#100c06' : '#f0e8d8';

  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] 2xl:h-[500px] cursor-grab active:cursor-grabbing rounded-xl sm:rounded-2xl overflow-hidden glass">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={[canvasBg]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        <AtomSystem atomicNumber={atomicNumber} color={color} />
      </Canvas>
    </div>
  );
};

export default Atom3D;
