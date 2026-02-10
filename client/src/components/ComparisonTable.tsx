import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { name: "Header Bidding Implementation", hbdr: true, competitorA: true, competitorB: false },
  { name: "Managed Prebid Server", hbdr: true, competitorA: false, competitorB: false },
  { name: "In-App SDK (Desktop & Mobile)", hbdr: true, competitorA: "partial", competitorB: false },
  { name: "Real-Time Analytics Dashboard", hbdr: true, competitorA: true, competitorB: true },
  { name: "Dynamic Floor Pricing", hbdr: true, competitorA: false, competitorB: false },
  { name: "Custom Video Player", hbdr: true, competitorA: "partial", competitorB: false },
  { name: "CTV & OTT Support", hbdr: true, competitorA: false, competitorB: false },
  { name: "24/7 Technical Support", hbdr: true, competitorA: true, competitorB: "partial" },
  { name: "Dedicated Account Manager", hbdr: true, competitorA: false, competitorB: false },
  { name: "Revenue Guarantee", hbdr: true, competitorA: false, competitorB: false },
];

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
        <Check className="w-4 h-4 text-green-500" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
        <X className="w-4 h-4 text-destructive" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
      <Minus className="w-4 h-4 text-amber-500" />
    </div>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-24 bg-muted/30" data-testid="comparison-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why HBDR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            The HBDR Advantage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our comprehensive platform compares to other solutions in the market.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border border-border" data-testid="comparison-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-semibold text-foreground">Features</th>
                    <th className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold">
                        HBDR
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <span className="text-muted-foreground font-medium">Competitor A</span>
                    </th>
                    <th className="p-4 text-center">
                      <span className="text-muted-foreground font-medium">Competitor B</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-t border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                      data-testid={`comparison-row-${index}`}
                    >
                      <td className="p-4 font-medium text-foreground">{feature.name}</td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureIcon value={feature.hbdr} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureIcon value={feature.competitorA} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <FeatureIcon value={feature.competitorB} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
