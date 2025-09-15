import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { Wifi, Camera, Cpu, Usb, Zap, Cog } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingIcons = () => {
  const icons = [
    { Icon: Wifi, position: [-4, 3, -2] as [number, number, number], color: "#00ffff" },
    { Icon: Camera, position: [4, 2, -1] as [number, number, number], color: "#00ffff" },
    { Icon: Cpu, position: [-3, -2, -3] as [number, number, number], color: "#ffff00" },
    { Icon: Usb, position: [3, -1, -2] as [number, number, number], color: "#ffff00" },
    { Icon: Zap, position: [-5, 0, -1] as [number, number, number], color: "#ffff00" },
    { Icon: Cog, position: [5, 1, -3] as [number, number, number], color: "#ffff00" },
  ];

  return (
    <>
      {icons.map(({ Icon, position, color }, index) => (
        <Float key={index} speed={1.5 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={position}>
            <boxGeometry args={[0.2, 0.2, 0.05]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={0.3}
              transparent 
              opacity={0.8} 
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const AnimatedTitle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !logoRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0, rotation: 0 });
    gsap.set(textRef.current, { clipPath: 'inset(0 0 0 0)' });

    // Animation sequence
    tl
      // Wait for initial display
      .to({}, { duration: 2 })
      
      // Clip the text from left to right (making it disappear)
      .to(textRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 2,
        ease: 'power2.inOut'
      })
      
      // Show logo with scale animation
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      
      // Wait with logo visible
      .to({}, { duration: 2 })
      
      // Hide logo
      .to(logoRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 720,
        duration: 0.5,
        ease: 'back.in(1.7)'
      })
      
      // Reveal text back from right to left
      .to(textRef.current, {
        clipPath: 'inset(0 0 0 0)',
        duration: 2,
        ease: 'power2.inOut'
      }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block w-full max-w-4xl mx-auto">
      {/* Main Text - Exactly matching the image */}
      <div ref={textRef} className="relative z-10">
        <div className="mb-8 text-center">
          <div className="text-[12rem] md:text-[16rem] font-black leading-none tracking-wider font-sans"
               style={{
                 color: '#00ffff',
                 textShadow: `
                   0 0 10px #00ffff,
                   0 0 20px #00ffff,
                   0 0 40px #00ffff,
                   0 0 80px #00ffff,
                   0 0 120px #00ffff
                 `,
                 filter: 'brightness(1.2)',
               }}>
            IOT
          </div>
          
          <div className="text-[12rem] md:text-[16rem] font-black leading-none tracking-wider font-sans -mt-8"
               style={{
                 color: '#00ffff',
                 textShadow: `
                   0 0 10px #00ffff,
                   0 0 20px #00ffff,
                   0 0 40px #00ffff,
                   0 0 80px #00ffff,
                   0 0 120px #00ffff
                 `,
                 filter: 'brightness(1.2)',
               }}>
            CLUB
          </div>
        </div>
      </div>

      {/* Logo - Made smaller */}
      <img
        ref={logoRef}
        src="/image.png"
        alt="IoT Club Logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 object-contain z-20 pointer-events-none rounded-full"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.6)) blur(0px)',
          background: 'radial-gradient(circle, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 70%, transparent 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
             }}>
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffff00" />
          <FloatingIcons />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `
               linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Animated IOT CLUB Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <AnimatedTitle />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-xl md:text-2xl font-light tracking-wider mb-4 mt-12 text-cyan-300"
        >
          Vishwakarma Institute of Technology, Kondhwa
        </motion.p>

        {/* Enhanced tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg md:text-xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto"
        >
          Innovating Tomorrow's Connected World Through Technology & Learning
        </motion.p>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30" />
    </section>
  );
};

export default HeroSection;