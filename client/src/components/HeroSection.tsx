import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, TrendingUp, Shield } from "lucide-react";

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(252, 80, 0, ${particle.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(252, 80, 0, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resize();
    window.addEventListener("resize", resize);
    drawParticles();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <AnimatedBackground />
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/90">
                25+ Years of Ad Tech Expertise
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Maximize Your
              <span className="block text-primary mt-2">Ad Revenue</span>
              with Header Bidding
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              HBDR delivers enterprise-grade ad monetization solutions that help publishers 
              increase revenue by up to 50%. Let our experts handle the complexity while 
              you focus on content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-lg px-8 gap-2 group"
                onClick={scrollToContact}
                data-testid="button-hero-get-started"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 gap-2 text-white border-white/30 hover:bg-white/10"
                onClick={scrollToContact}
                data-testid="button-hero-demo"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { icon: TrendingUp, label: "50%+ Revenue Increase", value: "Average" },
                { icon: Shield, label: "Publishers Trust Us", value: "500+" },
                { icon: Zap, label: "Daily Impressions", value: "1B+" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <stat.icon className="w-6 h-6 text-primary mx-auto lg:mx-0 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-2xl transform rotate-3" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Revenue Dashboard</span>
                    <span className="text-primary text-sm font-medium">Live</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Today's Revenue", value: "$12,847", change: "+23%" },
                      { label: "Fill Rate", value: "94.2%", change: "+5.1%" },
                      { label: "eCPM", value: "$4.82", change: "+18%" },
                      { label: "Impressions", value: "2.7M", change: "+31%" },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4"
                      >
                        <div className="text-white/50 text-xs mb-1">{metric.label}</div>
                        <div className="text-white text-xl font-bold">{metric.value}</div>
                        <div className="text-green-400 text-xs mt-1">{metric.change}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="h-32 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
