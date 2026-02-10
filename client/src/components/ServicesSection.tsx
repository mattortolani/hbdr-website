import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Layers, 
  Smartphone, 
  Tv, 
  Video, 
  BarChart3, 
  Globe,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Header Bidding",
    description: "Advanced header bidding implementation that creates open auctions, allowing multiple advertisers to bid simultaneously on your inventory.",
    features: ["Real-time bidding", "Premium demand", "Higher CPMs"],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Globe,
    title: "Display Advertising",
    description: "Website and display ad monetization with optimal layouts designed to maximize revenue while maintaining user experience.",
    features: ["Smart layouts", "Viewability optimization", "Brand safety"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Smartphone,
    title: "In-App Monetization",
    description: "Mobile app advertising solutions including banner, native, video, and app open ads with Google AdX integration.",
    features: ["Native formats", "Rewarded video", "Open bidding"],
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Tv,
    title: "CTV Monetization",
    description: "Connected-TV advertising solutions to capture the growing streaming audience with premium video inventory.",
    features: ["SSAI support", "Premium buyers", "Cross-platform"],
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Video,
    title: "Video Ad Solutions",
    description: "Comprehensive in-app and web video ad solutions including instream, outstream, and interactive formats.",
    features: ["VAST/VPAID", "High viewability", "Engagement metrics"],
    color: "from-rose-500/20 to-rose-500/5",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed metrics on partner-level performance, auction data, and A/B testing capabilities for optimization.",
    features: ["Real-time data", "Custom reports", "Revenue insights"],
    color: "from-amber-500/20 to-amber-500/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesSection() {
  return (
    <section id="solutions" className="py-24 bg-background" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete Ad Monetization
            <span className="block text-primary mt-2">Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From header bidding to CTV, we provide end-to-end solutions to maximize 
            your advertising revenue across all platforms and formats.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className="group h-full border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
