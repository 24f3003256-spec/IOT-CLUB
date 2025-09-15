import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Environment } from '@react-three/drei';
import { ChevronDown, Wifi, Camera, Cpu, Usb, Zap, Cog } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const FloatingIcons = () => {
  const icons = [
    { Icon: Wifi, position: [-4, 3, -2] as [number, number, number] },
    { Icon: Camera, position: [4, 2, -1] as [number, number, number] },
    { Icon: Cpu, position: [-3, -2, -3] as [number, number, number] },
    { Icon: Usb, position: [3, -1, -2] as [number, number, number] },
    { Icon: Zap, position: [-5, 0, -1] as [number, number, number] },
    { Icon: Cog, position: [5, 1, -3] as [number, number, number] },
  ];

  return (
    <>
      {icons.map(({ Icon, position }, index) => (
        <Float key={index} speed={1.5 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={position}>
            <boxGeometry args={[0.3, 0.3, 0.1]} />
            <meshStandardMaterial 
              color="#00ffff" 
              emissive="#004444" 
              transparent 
              opacity={0.6} 
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
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !logoRef.current || !maskRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0, rotation: 0 });
    gsap.set(textRef.current, { clipPath: 'inset(0 0 0 0)' });
    gsap.set(maskRef.current, { x: '-100%' });

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
      {/* Main Text */}
      <div ref={textRef} className="relative z-10">
        <div className="mb-4 flex justify-center items-center space-x-4">
          {['I', 'o', 'T'].map((letter, index) => (
            <span
              key={index}
              className="text-8xl md:text-9xl font-paradox font-black text-transparent bg-clip-text bg-gradient-to-b from-iot-teal via-iot-glow to-iot-yellow glow-primary"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        
        <div className="flex justify-center items-center space-x-4">
          {['C', 'L', 'U', 'B'].map((letter, index) => (
            <span
              key={index}
              className="text-8xl md:text-9xl font-paradox font-black text-transparent bg-clip-text bg-gradient-to-b from-iot-teal via-iot-glow to-iot-yellow glow-primary"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))',
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Logo */}
      <img
        ref={logoRef}
        src="/image.png"
        alt="IoT Club Logo"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 object-contain z-20 pointer-events-none rounded-full"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.6)) blur(0px)',
          background: 'radial-gradient(circle, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 70%, transparent 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Hidden mask element (kept for reference but not used) */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
      />
    </div>
  );
};

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 10 
      }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center text-iot-glow text-center"
      >
        <span className="text-sm font-light mb-2 tracking-wide font-paradox whitespace-nowrap">Scroll to Explore</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-primary overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
          <FloatingIcons />
          <Environment preset="night" />
        </Canvas>
      </div>

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
          className="text-xl md:text-2xl font-paradox text-iot-glow font-light tracking-wider mb-4 mt-8"
        >
          Vishwakarma Institute of Technology, Kondhwa
        </motion.p>

        {/* Enhanced tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto"
        >
          Innovating Tomorrow's Connected World Through Technology & Learning
        </motion.p>
      </div>

      {/* Fixed Scroll Indicator */}
      <ScrollIndicator />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;