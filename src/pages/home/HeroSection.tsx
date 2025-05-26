import React, { useEffect, useRef, useState } from "react";

const PHOENIX_POINTS = 150;
// Utility to sample points along an SVG path
function sampleSVGPath(numPoints: number, width: number, height: number) {
    // The path below is the main gold/orange wing from the SVG
    const rawPath = "M0 0 C1.58984375 1.5546875 1.58984375 1.5546875 1.96484375 4.6171875 C1.58984375 7.5546875 1.58984375 7.5546875 -0.41015625 9.5546875 C-5.34252375 10.01138819 -9.16188554 9.4196536 -13.91015625 8.0546875 C-30.54180158 3.6878359 -47.72252883 7.05105119 -62.4375 15.56640625 C-67.23555897 18.77562046 -71.35803041 22.45811421 -75.41015625 26.5546875 C-75.96058594 27.07160156 -76.51101562 27.58851562 -77.078125 28.12109375 C-87.95447628 39.28903622 -91.78207357 54.72938263 -91.71142578 69.75585938 C-91.33292154 85.92770445 -84.69176676 100.30658461 -73.24609375 111.7109375 C-59.87138228 124.02854119 -43.21869422 130.17747594 -24.97265625 129.4296875 C-9.87571348 128.10214448 3.15907199 122.38001379 14.58984375 112.5546875 C15.19570312 112.05582031 15.8015625 111.55695313 16.42578125 111.04296875 C28.73098043 99.99056134 33.3713249 83.19191657 35.09765625 67.35546875 C35.58984375 64.5546875 35.58984375 64.5546875 37.58984375 62.5546875 C41.08984375 62.3046875 41.08984375 62.3046875 44.58984375 62.5546875 C47.4513012 65.41614495 46.89008709 67.43401484 46.90234375 71.4296875 C46.7271418 88.13957317 39.84828282 104.19200921 28.58984375 116.5546875 C27.57470703 117.68970703 27.57470703 117.68970703 26.5390625 118.84765625 C15.66860344 130.37459063 -0.60004711 139.75567822 -16.6628418 140.75756836 C-20.49749106 140.85988351 -24.32420296 140.87662636 -28.16015625 140.8671875 C-29.454375 140.88330078 -30.74859375 140.89941406 -32.08203125 140.91601562 C-43.42534744 140.92173302 -53.44482709 139.13607431 -63.53515625 133.8671875 C-64.2118335 133.52051025 -64.88851074 133.17383301 -65.58569336 132.81665039 C-71.44293866 129.72002923 -76.51206868 126.02327858 -81.41015625 121.5546875 C-82.01859375 121.03777344 -82.62703125 120.52085937 -83.25390625 119.98828125 C-96.72483302 107.77259993 -103.6097827 89.51834748 -104.62890625 71.73828125 C-105.26786196 51.79753846 -99.05588582 32.71484882 -85.34936523 17.97119141 C-65.43781557 -2.46800947 -26.64599355 -15.97895886 0 0 Z";
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d');
    const path = new Path2D(rawPath);
    // Get path length by drawing and measuring
    // We'll use a simple approach: walk t from 0 to 1 and find points
    // (For more accuracy, use a library like svg-path-properties)
    // Here, we use a fixed bounding box and scale/center
    // The path below is the main gold/orange wing from the SVG
    // (extracted from your SVG)
    // Path is scaled to fit nicely in the canvas
    const points = [];
    // The path below is the main gold/orange wing from the SVG
    // The path is in its own coordinate system, so we need to scale and center it
    // We'll use a simple bounding box for the path
    // These values are estimated from the SVG
    const minX = -105, maxX = 47, minY = -16, maxY = 141;
    const pathWidth = maxX - minX;
    const pathHeight = maxY - minY;
    const scale = 0.8 * Math.min(width / pathWidth, height / pathHeight); // 0.8 to leave margin
    const offsetX = width / 2 - ((minX + maxX) / 2) * scale;
    const offsetY = height / 2 - ((minY + maxY) / 2) * scale;
    // We'll use a simple approach: walk t from 0 to 1 and use ctx.getPointAtLength if available
    // But Path2D does not support getPointAtLength, so we use a polyfill
    // We'll use a library if available, otherwise fallback to a circle
    // For now, fallback to a circle if not in browser
    if (typeof window === 'undefined' || !ctx) {
        // SSR fallback
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const t = i / numPoints * Math.PI * 2;
            points.push({
                x: width / 2 + Math.cos(t) * width * 0.3,
                y: height / 2 + Math.sin(t) * height * 0.3,
            });
        }
        return points;
    }
    // Use svg-path-properties if available
    try {
        // @ts-ignore
        const SVGPathProperties = require('svg-path-properties');
        const properties = new SVGPathProperties(rawPath);
        const totalLength = properties.getTotalLength();
        for (let i = 0; i < numPoints; i++) {
            const len = (i / numPoints) * totalLength;
            const { x, y } = properties.getPointAtLength(len);
            points.push({
                x: x * scale + offsetX,
                y: y * scale + offsetY,
            });
        }
        return points;
    } catch (e) {
        // Fallback: sample points by drawing the path
        for (let i = 0; i < numPoints; i++) {
            const t = i / numPoints;
            // Just use a circle fallback
            points.push({
                x: width / 2 + Math.cos(t * Math.PI * 2) * width * 0.3,
                y: height / 2 + Math.sin(t * Math.PI * 2) * height * 0.3,
            });
        }
        return points;
    }
}

function getPhoenixShape(width: number, height: number) {
    return sampleSVGPath(PHOENIX_POINTS, width, height);
}

const HeroSection = () => {
    const [phoenixForming, setPhoenixForming] = useState(false);
    const [phoenixFormed, setPhoenixFormed] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    type Particle = {
        x: number;
        y: number;
        targetX: number;
        targetY: number;
        phoenixX: number;
        phoenixY: number;
        size: number;
        opacity: number;
        speed: number;
    };
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Lock/unlock scroll
    useEffect(() => {
        if (phoenixForming && !phoenixFormed) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [phoenixForming, phoenixFormed]);

    // Listen for scroll to trigger phoenix formation
    useEffect(() => {
        if (phoenixForming || phoenixFormed) return;
        const onScroll = (e: Event) => {
            setPhoenixForming(true);
            window.scrollTo({ top: 0 });
        };
        window.addEventListener("scroll", onScroll, { passive: false });
        return () => window.removeEventListener("scroll", onScroll);
    }, [phoenixForming, phoenixFormed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const COUNT = PHOENIX_POINTS;
        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        // Initialize particles
        const phoenixShape = getPhoenixShape(canvas.width, canvas.height);
        const particles: Particle[] = [];
        for (let i = 0; i < COUNT; i++) {
            const p = phoenixShape[i % phoenixShape.length];
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: Math.random() * canvas.width,
                targetY: Math.random() * canvas.height,
                phoenixX: p.x,
                phoenixY: p.y,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.02 + 0.01,
            });
        }
        particlesRef.current = particles;
        // Animation loop
        const animateParticles = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Create gradient background effect
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 2,
            );
            gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.3)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let allArrived = true;
            particles.forEach((particle, i) => {
                // Determine target
                let targetX = particle.targetX;
                let targetY = particle.targetY;
                let speed = particle.speed;
                // Exponential speed-up during phoenix formation
                if (phoenixForming && !phoenixFormed) {
                    // Progress: average distance to phoenix for all particles
                    let totalDist = 0;
                    for (let j = 0; j < particles.length; j++) {
                        const dx = particles[j].x - particles[j].phoenixX;
                        const dy = particles[j].y - particles[j].phoenixY;
                        totalDist += Math.sqrt(dx * dx + dy * dy);
                    }
                    const avgDist = totalDist / particles.length;
                    // The closer avgDist is to 0, the further along the animation is
                    // We'll use a progress value from 0 (start) to 1 (almost done)
                    const progress = 1 - Math.min(avgDist / 300, 1); // 300 px is a rough max distance
                    // Slightly slower at start/middle, extremely fast at end
                    // base speed * (1.2 + 30 * progress^8)
                    speed = particle.speed * (1.2 + 30 * Math.pow(progress, 8));
                }
                if (phoenixForming || phoenixFormed) {
                    targetX = particle.phoenixX;
                    targetY = particle.phoenixY;
                }
                // Smooth movement towards target
                particle.x += (targetX - particle.x) * speed;
                particle.y += (targetY - particle.y) * speed;
                // Add floating motion (only before phoenix forms)
                if (!phoenixForming && !phoenixFormed) {
                    particle.x += Math.sin(time * 0.001 + i * 0.1) * 0.5;
                    particle.y += Math.cos(time * 0.0005 + i * 0.1) * 0.3;
                    // Mouse repulsion effect
                    const dx = mouseRef.current.x - particle.x;
                    const dy = mouseRef.current.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        particle.x -= dx * force * 0.1;
                        particle.y -= dy * force * 0.1;
                    }
                }
                // Draw particle with glow effect
                ctx.save();
                ctx.globalAlpha = phoenixForming || phoenixFormed ? 1 : particle.opacity;
                ctx.fillStyle = phoenixForming || phoenixFormed ? "#f97316" : "#3b82f6";
                ctx.shadowColor = phoenixForming || phoenixFormed ? "#f97316" : "#3b82f6";
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                // Draw connections for phoenix formation
                if ((phoenixForming || phoenixFormed) && i < particles.length - 1) {
                    const next = particles[i + 1];
                    const dist = Math.sqrt(
                        (particle.x - next.x) ** 2 + (particle.y - next.y) ** 2,
                    );
                    if (dist < 80) {
                        ctx.save();
                        ctx.globalAlpha = 0.3;
                        ctx.strokeStyle = "#f97316";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(next.x, next.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                // Check if particle is close to phoenix target
                if ((phoenixForming || phoenixFormed) && allArrived) {
                    const dx = particle.x - particle.phoenixX;
                    const dy = particle.y - particle.phoenixY;
                    if (Math.sqrt(dx * dx + dy * dy) > 2) {
                        allArrived = false;
                    }
                }
            });
            // If all particles have arrived, mark phoenix as formed
            if (phoenixForming && !phoenixFormed) {
                let totalDist = 0;
                for (let j = 0; j < particles.length; j++) {
                    const dx = particles[j].x - particles[j].phoenixX;
                    const dy = particles[j].y - particles[j].phoenixY;
                    totalDist += Math.sqrt(dx * dx + dy * dy);
                }
                const avgDist = totalDist / particles.length;
                if (avgDist < 10) {
                    setTimeout(() => setPhoenixFormed(true), 200); // allow a moment for effect
                }
            }
            animationRef.current = requestAnimationFrame(animateParticles);
        };
        animateParticles(0);
        // Mouse tracking (optional, for future effects)
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [phoenixForming, phoenixFormed]);

    // Remove hover logic, keep tilt effect
    const animateHeroTilt = (tiltRef: HTMLDivElement) => {
        if (!tiltRef) return;
        let currentRotateX = 0;
        let currentRotateY = 0;
        let currentScale = 1;
        let animationFrame: number | null = null;
        const maxRotate = 18;
        const maxScale = 1.035;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let targetScale = 1;
        const tiltRangeX = window.innerWidth / 1.2;
        const tiltRangeY = window.innerHeight / 1.2;
        const animate = () => {
            currentRotateX = lerp(currentRotateX, targetRotateX, 0.2);
            currentRotateY = lerp(currentRotateY, targetRotateY, 0.2);
            currentScale = lerp(currentScale, targetScale, 0.2);
            tiltRef.style.transform =
                `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale(${currentScale})`;
            if (
                Math.abs(currentRotateX - targetRotateX) > 0.1 ||
                Math.abs(currentRotateY - targetRotateY) > 0.1 ||
                Math.abs(currentScale - targetScale) > 0.001
            ) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                animationFrame = null;
            }
        };
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const normX = (e.clientX - centerX) / tiltRangeX;
            const normY = (e.clientY - centerY) / tiltRangeY;
            const dist = Math.sqrt(normX * normX + normY * normY);
            const intensity = Math.max(0, 1 - dist);
            if (intensity <= 0) {
                targetRotateX = 0;
                targetRotateY = 0;
                targetScale = 1;
            } else {
                targetRotateX = normY * -maxRotate * intensity;
                targetRotateY = normX * maxRotate * intensity;
                targetScale = 1 + (maxScale - 1) * intensity;
            }
            if (!animationFrame) {
                animate();
            }
        };
        const handleMouseLeave = () => {
            targetRotateX = 0;
            targetRotateY = 0;
            targetScale = 1;
            if (!animationFrame) {
                animate();
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        tiltRef.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            tiltRef.removeEventListener("mouseleave", handleMouseLeave);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    };

    return (
        <section
            id="hero-section"
            className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black"
        >
            {/* Animated background canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center perspective-[1000px]">
                <div
                    className="transform transition-transform duration-100 ease-out p-50"
                    ref={animateHeroTilt}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                            Igniting Impact,
                        </span>
                        <br />
                        <span className="text-white drop-shadow-2xl">
                            One Line of Code at a Time
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
                        Student-powered digital solutions for nonprofits.
                        <br />
                        <span className="text-lg text-gray-400 mt-2 block">
                            Where innovation meets purpose, and code creates
                            change.
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform">
                            <span className="flex items-center gap-2">
                                View Our Work
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </button>
                        <button className="group px-8 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all duration-300 text-white font-semibold text-lg backdrop-blur-sm transform">
                            <span className="flex items-center gap-2">
                                Get Started
                                <svg
                                    className="w-5 h-5 group-hover:rotate-45 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 right-10 w-16 h-16 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-500" />
        </section>
    );
};

export default HeroSection;
