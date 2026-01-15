import { Shield, Barcode, Heart, Database, Cloud, Target } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "All data stays on your device. No account required, no data uploads to servers.",
  },
  {
    icon: Target,
    title: "Reach Your Goals",
    description: "Set your goal to lose, maintain, or gain weight. Intake calculates your daily calorie limit.",
  },
  {
    icon: Database,
    title: "3+ Million Foods",
    description: "Huge database of food items. Search, scan barcodes, or create your own entries.",
  },
  {
    icon: Barcode,
    title: "Barcode Scanner",
    description: "Quickly log foods by scanning barcodes. Fast and accurate tracking.",
  },
  {
    icon: Heart,
    title: "Apple Health Sync",
    description: "Seamlessly sync your data with Apple Health for a complete health overview.",
  },
  {
    icon: Cloud,
    title: "iCloud Sync",
    description: "Your data syncs across all your devices via iCloud. Always up to date.",
  },
];

const Features = () => {
  return (
    <section className="section-gradient py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need.{" "}
            <span className="gradient-text">Nothing you don't.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A focused calorie counter that helps you reach your goals without the bloat.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="feature-card animate-fade-in opacity-0"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
