import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "HBDR has been the behind-the-scenes engine powering billions of monthly impressions across our sites. I never have to worry about scaling or downtime issues — it just works flawlessly.",
    author: "Sarah Chen",
    title: "VP of Revenue Operations",
    company: "TechMedia Group",
    initials: "SC",
  },
  {
    quote: "Working with HBDR has been a game-changer for us. We managed to boost our RPMs by 56%, and it's been a huge lifesaver for our ad operations team.",
    author: "Michael Torres",
    title: "Director of Ad Monetization",
    company: "Digital Publishing Co",
    initials: "MT",
  },
  {
    quote: "Considering HBDR? Know this: Their team is committed to delivering the best results for your organization, actively working to continually enhance performance.",
    author: "Emily Richardson",
    title: "Head of Publisher Solutions",
    company: "Content Network Inc",
    initials: "ER",
  },
  {
    quote: "Working with HBDR has been an eye-opener for our business. Not only has performance substantially improved, but our understanding of the marketplace has as well.",
    author: "David Park",
    title: "CEO",
    company: "Mobile Media Labs",
    initials: "DP",
  },
  {
    quote: "Working with HBDR has been the single most impactful decision I've ever made for my business. There isn't a single company that wouldn't benefit from working with them.",
    author: "Jessica Martinez",
    title: "Founder",
    company: "Gaming Publishers United",
    initials: "JM",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-background" data-testid="testimonials-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Publishers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our partners have to say 
            about working with HBDR.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden py-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Card className="border border-border" data-testid="testimonial-card">
                  <CardContent className="p-8 sm:p-12">
                    <Quote className="w-12 h-12 text-primary/20 mb-6" />
                    
                    <blockquote className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonials[currentIndex].initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonials[currentIndex].author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].title}
                        </div>
                        <div className="text-sm text-primary">
                          {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "w-8 bg-primary" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
