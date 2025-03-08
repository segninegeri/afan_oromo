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
      title: "Kitaaba",
      description:
        "Kitaabiilee Afaan Oromoo karaa online argachuun ijoollee keessassan qaraa.",
      items: [
        "Fakkiiwwan hawwisiisoo ijoolleef qopha'an",
        "Barnoota saffisaa",
        "Gaaffiilee shaakallii deebii waliin",
      ],
    },
    {
      icon: Headphones,
      title: "Bifa sagaleen",
      description:
        "Shaakallii fi taphoota adda addaa fayyadamuun dandeetti dubbii Afaan Oromoo ijoollee keessanii guddisaa.",
      items: [
        "Namoota Afaan Oromoo afaan haadhaa isaanii ta'een sagalee waraabame",
        "Jechoota garaa garaa bifa shaakalaan kan qabate.",
        "Faaruu heedduu internet  malee (offline) dhageeffachuuf bifa toluun barattootaaf kan qopha'e.",
      ],
    },
    {
      icon: MessageSquare,
      title: "Barnoota bifa ammayyaan",
      description:
        "Barnoota fakkii, sagalee fi taphoota garaa garaa qabuun dandeettii dubbii keessanii kan cimsu.",
      items: [
        " tapha bifa hawwataa ta'een kan qabu",
        "Dandeetii dubbii Afaan Oromoo qoruuf gaffiilee heeddu kan of keessatti qabate.",
       
      ],
    },
    {
      icon: Globe,
      title: "Seenaa fi Aadaa",
      description:
        "Afaan Oromoo guddina aadaa fi seenaa isaa wajjin baradhaa, duudhaa fi safuu isaas beekaa.",
      items: [
        " Seenaa aadaa fi dur durii Oromootaa",
        "Sirboota aadaa hiika waliin",
        "Safuu fi aadaa Oromoo barachuu",
      ],
    },
    {
      icon: Users,
      title: "Barnoota waloo(waliinii)",
      description:
        "Barattoota biroo waliin wal qunnamuu fi Afaan Oromoo loogaan garaa garaa  wal  barsiisuu.",
      items: [
        "Jechoota naannoo hiikan wal-fakkaatan garuu, iddoo garaa-garaatti haala adda addaan ibsaman baradhaa.",
        "Jechamootaa fi mammaaksawwan",
      ],
    },
    {
      icon: Award,
      title: "Galma ga'iinsa afaanii",
      description:
        "Barnoota keessan gara fuulduraatti cimsuudhaan badhaasa beekumsaa argadhaa.",
      items: [
        "Ragaa dijitaalaa barnoota kan xumureef",
        "Guddina sadarkaa afaanii waliin",
        "Qormaata ji'a ji'aan badhaasa addaa qabu",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 smooth-scroll">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Barnoonni kun
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
