import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, FileText, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Discovery Call",
    description: "We start with a comprehensive discovery call to understand your current setup, goals, and challenges. Our team will showcase relevant solutions and assess integration requirements.",
    details: [
      "Analyze current ad stack",
      "Identify optimization opportunities",
      "Discuss revenue goals",
    ],
  },
  {
    icon: FileText,
    step: "02",
    title: "Customized Proposal",
    description: "Based on our discovery, we create a tailored proposal including revenue forecasts, advertising layout plans, business model, and a detailed implementation roadmap.",
    details: [
      "Revenue projection report",
      "Ad placement strategy",
      "Implementation timeline",
    ],
  },
  {
    icon: Code,
    step: "03",
    title: "Technical Implementation",
    description: "Our expert team handles the complete technical integration. We configure your accounts, implement code across all platforms, and ensure everything runs smoothly.",
    details: [
      "Code implementation",
      "Platform configuration",
      "Performance monitoring",
    ],
  },
];

export function HowItWorksSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-background" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with HBDR is simple. Our streamlined process gets you 
            monetizing faster with minimal effort on your part.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                data-testid={`step-card-${index}`}
              >
                <Card className="relative h-full border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-7 h-7" />
                    </div>
                  </div>
                  
                  <CardContent className="pt-16 pb-6 px-6">
                    <div className="text-center mb-6">
                      <span className="text-5xl font-bold text-muted-foreground/20">{step.step}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-2">{step.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="gap-2 group"
            onClick={scrollToContact}
            data-testid="button-start-journey"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
