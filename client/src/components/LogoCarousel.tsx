import { motion } from "framer-motion";

const partners = [
  { name: "TechMedia", initials: "TM" },
  { name: "AdVantage", initials: "AV" },
  { name: "MediaFlow", initials: "MF" },
  { name: "PubGrowth", initials: "PG" },
  { name: "StreamAds", initials: "SA" },
  { name: "ContentPro", initials: "CP" },
  { name: "AdRevenue", initials: "AR" },
  { name: "MediaMax", initials: "MM" },
  { name: "PubTech", initials: "PT" },
  { name: "AdSphere", initials: "AS" },
];

export function LogoCarousel() {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden" data-testid="logo-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm font-medium uppercase tracking-wider"
        >
          Trusted by Leading Publishers Worldwide
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />

        <div className="flex animate-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="w-32 h-16 flex items-center justify-center bg-background rounded-lg border border-border px-4 py-2 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {partner.initials}
                  </div>
                  <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
