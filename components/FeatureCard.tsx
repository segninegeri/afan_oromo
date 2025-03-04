import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  items,
}: FeatureCardProps) {
  return (
    <div className="feature-card glass-panel p-6 rounded-xl">
      <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <Icon size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="text-sm text-gray-400 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
