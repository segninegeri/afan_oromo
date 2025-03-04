import { forwardRef } from "react";
import FeatureCard from "@/components/FeatureCard";
import {
  BookOpen,
  Headphones,
  MessageSquare,
  Globe,
  Users,
  Award,
} from "lucide-react";

const FeaturesSection = forwardRef<HTMLDivElement>((props, ref) => {
  const features = [
    {
      icon: BookOpen,
      title: "Free PDF Book",
      description:
        "Download our comprehensive Afan Oromo learning book for free. Perfect for offline learning and practice.",
      items: [
        "Colorful illustrations designed for children",
        "Progressive learning path from basics to advanced",
        "Interactive exercises with answer keys",
      ],
    },
    {
      icon: Headphones,
      title: "Premium Audio",
      description:
        "Access high-quality audio recordings by native speakers to perfect your pronunciation and listening skills.",
      items: [
        "Native speaker recordings with clear pronunciation",
        "Vocabulary practice with audio flashcards",
        "Downloadable MP3 files for offline practice",
      ],
    },
    {
      icon: MessageSquare,
      title: "Interactive Learning",
      description:
        "Engage with interactive exercises and games designed to make learning Afan Oromo fun and effective.",
      items: [
        "Gamified learning with points and rewards",
        "Interactive quizzes to test knowledge",
        "Progress tracking to monitor improvement",
      ],
    },
    {
      icon: Globe,
      title: "Cultural Context",
      description:
        "Learn Afan Oromo within its rich cultural context, understanding traditions and customs.",
      items: [
        "Cultural stories and folktales",
        "Traditional songs with translations",
        "Cultural etiquette and customs",
      ],
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Connect with other learners and practice your Afan Oromo skills in a supportive environment.",
      items: [
        "Monthly virtual meetups for practice",
        "Discussion forums for questions",
        "Peer learning and language exchange",
      ],
    },
    {
      icon: Award,
      title: "Achievement System",
      description:
        "Stay motivated with our achievement system that rewards consistent learning and progress.",
      items: [
        "Digital badges for completed lessons",
        "Level progression with certificates",
        "Monthly challenges with special rewards",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 smooth-scroll">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Learning Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";
export default FeaturesSection;
