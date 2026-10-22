import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Flame, ShoppingBag, ArrowRight, PhoneCall, Award, UtensilsCrossed } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'ur';
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export const Hero3DExperience: React.FC<HeroProps> = ({
  lang,
  onExploreMenu,
  onOrderNow,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const platterCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Three.js Ambient Particle and Lighting System
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability safely
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return; // Graceful fallback
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    // Ambient light with Pakistani deep emerald tint & warm gold rim
    const ambientLight = new THREE.AmbientLight(0xF5E7C5, 0.6);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xC5A059, 2.5, 30);
    goldPointLight.position.set(5, 5, 8);
    scene.add(goldPointLight);

    const charcoalLight = new THREE.PointLight(0xFF4500, 1.2, 20);
    charcoalLight.position.set(-6, -4, 5);
    scene.add(charcoalLight);

    // Glowing ember & spice particles floating upwards
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.12 + 0.04;
      speeds[i] = Math.random() * 0.015 + 0.005;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circle shader / point material
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 185, 80, 1)');
      grad.addColorStop(0.4, 'rgba(197, 160, 89, 0.8)');
      grad.addColorStop(1, 'rgba(18, 61, 43, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.6,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic mouse tracking for camera parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 1.5;
      targetY = y * 1.2;

      goldPointLight.position.x = x * 8;
      goldPointLight.position.y = y * 6 + 2;
    };

    window.addEventListener('mousemove', handlePointerMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera dampening
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Float particles upward
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += speeds[i];
        if (y > 8) {
          y = -8;
          posAttr.setX(i, (Math.random() - 0.5) * 20);
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
      particles.rotation.y += 0.0008;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  // Card Parallax Hover Handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!platterCardRef.current) return;
    const rect = platterCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 12 deg tilt
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
    setIsInteracting(true);
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsInteracting(false);
  };

  const isRtl = lang === 'ur';

  return (
    <section 
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#123D2B] bg-jali-pattern pt-20 pb-16 lg:py-24"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Three.js Background Canvas */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        aria-hidden="true" 
      />

      {/* Radial Vignette & Atmospheric Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 60% 50%, rgba(20, 75, 52, 0.5) 0%, rgba(10, 36, 25, 0.95) 75%)'
        }}
        aria-hidden="true"
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Brand Story */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left rtl:text-right space-y-6">
          
          {/* Unboxed Metadata Trust Marker */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C5A059] tracking-wider uppercase">
            <span className="flex items-center gap-1.5 font-semibold">
              <Flame className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <span>{lang === 'en' ? 'Live Charcoal BBQ & Tandoor' : 'لائیو کوئلہ باربی کیو اور مٹی کا تندور'}</span>
            </span>
            <span aria-hidden="true" className="text-[#C5A059]/50">·</span>
            <span className="text-[#F5E7C5]/80">
              {lang === 'en' ? 'Rahim Yar Khan, Punjab' : 'رحیم یار خان، پنجاب'}
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-editorial tracking-tight text-[#F5E7C5] leading-[1.12] text-balance">
              {lang === 'en' ? (
                <>
                  A Taste of <span className="text-[#DFBE7B] italic font-serif">Tradition</span>
                </>
              ) : (
                <span className="font-urdu leading-tight">
                  روایت کا <span className="text-[#DFBE7B]">اصلی ذائقہ</span>
                </span>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-[#F5E7C5]/85 font-light leading-relaxed max-w-xl text-balance">
              {lang === 'en' 
                ? RESTAURANT_INFO.subtaglineEn 
                : RESTAURANT_INFO.subtaglineUr}
            </p>
          </div>

          {/* Social Proof Metric adjacency */}
          <div className="flex flex-wrap items-center gap-4 py-2 border-y border-[#F5E7C5]/10 text-xs sm:text-sm text-[#F5E7C5]/75">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span className="font-semibold text-[#F5E7C5] tabular-nums">4.6 / 5.0</span>
              <span>{lang === 'en' ? 'Rating on Foodpanda' : 'فوڈ پانڈا ریٹنگ'}</span>
            </div>
            <span aria-hidden="true" className="text-[#F5E7C5]/30">·</span>
            <div>
              <span className="font-semibold text-[#F5E7C5] tabular-nums">2,000+</span>{' '}
              <span>{lang === 'en' ? 'Verified Diners' : 'مطمئن کسٹمرز'}</span>
            </div>
            <span aria-hidden="true" className="text-[#F5E7C5]/30">·</span>
            <div>
              <span className="text-[#DFBE7B] font-medium">100% Halal Prime Meat</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3.5 rounded-lg bg-[#C5A059] hover:bg-[#DFBE7B] text-[#123D2B] font-semibold text-sm transition-all shadow-lg hover:shadow-[#C5A059]/20 flex items-center gap-2 group whitespace-nowrap active:scale-95"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>{lang === 'en' ? 'Explore Our Menu' : 'ہمارا مینو دیکھیں'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            <a
              href={RESTAURANT_INFO.foodpandaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg border border-[#D70F64]/40 hover:border-[#D70F64] bg-[#D70F64]/10 hover:bg-[#D70F64]/20 text-[#FFF] font-semibold text-sm transition-all flex items-center gap-2 group whitespace-nowrap active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#D70F64]" />
              <span>{lang === 'en' ? 'Order on Foodpanda' : 'فوڈ پانڈا پر آرڈر کریں'}</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phonePrimary}`}
              className="px-4 py-3.5 text-[#F5E7C5]/80 hover:text-[#DFBE7B] text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-[#C5A059]" />
              <span className="tabular-nums">{RESTAURANT_INFO.phonePrimary}</span>
            </a>
          </div>

          {/* Quick Notice */}
          <p className="text-xs text-[#F5E7C5]/50">
            {lang === 'en' 
              ? 'Serving daily from 12:00 PM to 01:00 AM • Dine-in, Takeaway & Home Delivery across Rahim Yar Khan' 
              : 'دوپہر 12 بجے تا رات 1 بجے تک • ڈائن ان، ٹیک اوے اور پورے رحیم یار خان میں ہوم ڈیلیوری'}
          </p>
        </div>

        {/* Right Column: 3D Layered Cinematic Food Platter */}
        <div className="lg:col-span-6 flex justify-center items-center relative perspective-[1200px]">
          
          {/* Subtle Ambient Backing Halo */}
          <div 
            className="absolute -inset-4 bg-gradient-to-tr from-[#C5A059]/15 via-[#184c36]/40 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true" 
          />

          {/* 3D Interactive Tilting Platter Card */}
          <div
            ref={platterCardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isInteracting ? 1.02 : 1})`,
              transition: isInteracting ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-[560px] aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#C5A059]/25 shadow-2xl shadow-black/80 bg-[#0A2419] cursor-grab active:cursor-grabbing group select-none"
          >
            {/* The High-Fidelity Photorealistic Platter Image */}
            <img
              src="/src/assets/images/hero_kabab_platter_1791650384918.jpg"
              alt="Al Kabab Special Mixed BBQ Platter with Seekh Kababs and Chicken Tikka"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="eager"
            />

            {/* Cinematic Gradient Scrim for Contrast & Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2419]/90 via-[#0A2419]/25 to-transparent pointer-events-none" />

            {/* Animated Sizzling Steam Wisps */}
            <div className="absolute inset-x-0 bottom-1/3 flex justify-center pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="w-16 h-28 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full animate-steam" />
              <div className="w-20 h-32 bg-gradient-to-t from-white/20 to-transparent blur-lg rounded-full animate-steam-delay-1 -ml-4" />
              <div className="w-14 h-24 bg-gradient-to-t from-white/25 to-transparent blur-md rounded-full animate-steam-delay-2 ml-3" />
            </div>

            {/* Depth Overlay Elements (Float on Z-Axis) */}
            <div 
              style={{ transform: 'translateZ(35px)' }} 
              className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none"
            >
              <div className="bg-[#123D2B]/90 backdrop-blur-md border border-[#C5A059]/30 rounded-lg p-3 text-left rtl:text-right max-w-xs shadow-lg">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold block">
                  {lang === 'en' ? "Chef's Signature Feast" : 'شیف کا شاہی پلیٹر'}
                </span>
                <h2 className="text-sm sm:text-base font-semibold text-[#F5E7C5] leading-tight">
                  {lang === 'en' ? 'Special Mixed BBQ Platter' : 'الکباب اسپیشل مکس باربی کیو'}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#F5E7C5]/75">
                  <span className="font-semibold text-[#DFBE7B] tabular-nums">Rs. 2,450</span>
                  <span aria-hidden="true">·</span>
                  <span>{lang === 'en' ? 'Serves 3-4' : '3-4 افراد کے لیے'}</span>
                </div>
              </div>

              <div 
                style={{ transform: 'translateZ(45px)' }}
                className="hidden sm:flex items-center gap-1.5 bg-[#C5A059] text-[#123D2B] px-3 py-1.5 rounded-md text-xs font-bold shadow-md uppercase tracking-wider pointer-events-auto cursor-pointer hover:bg-[#DFBE7B] transition-colors"
                onClick={onOrderNow}
              >
                <span>{lang === 'en' ? 'Quick Add' : 'آرڈر کریں'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </div>
            </div>

            {/* Interactive 3D Tilt Hint */}
            <div 
              style={{ transform: 'translateZ(20px)' }}
              className="absolute top-3 right-3 bg-[#0A2419]/70 backdrop-blur-sm border border-[#C5A059]/20 rounded-full px-2.5 py-1 text-[10px] text-[#F5E7C5]/70 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span>{lang === 'en' ? '3D Interactive View' : 'تھری ڈی نظارہ'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Editorial Chapter Strip Below Hero */}
      <div className="absolute bottom-2 inset-x-0 hidden md:flex justify-center items-center pointer-events-none">
        <span className="text-[11px] uppercase tracking-widest text-[#F5E7C5]/40 font-medium">
          {lang === 'en' ? 'Scroll to explore the royal menu & live grill' : 'نیچے اسکرول کر کے مینو اور لائیو باربی کیو ملاحظہ فرمائیں'}
        </span>
      </div>
    </section>
  );
};
