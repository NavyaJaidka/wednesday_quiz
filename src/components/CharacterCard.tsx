import { motion } from "framer-motion";
import { Character } from "@/data/quizData";
import wednesdayImg from "@/assets/wednesday.jpg";
import morticiaImg from "@/assets/morticia.jpg";
import gomezImg from "@/assets/gomez.jpg";
import festerImg from "@/assets/fester.jpg";
import pugsleyImg from "@/assets/pugsley.jpg";
import thingImg from "@/assets/thing.jpg";
import lurchImg from "@/assets/lurch.jpg";
import grandmamaImg from "@/assets/grandmama.jpg";

interface CharacterCardProps {
  character: Character;
  index: number;
}

const imageMap: Record<string, string> = {
  wednesday: wednesdayImg,
  morticia: morticiaImg,
  gomez: gomezImg,
  fester: festerImg,
  pugsley: pugsleyImg,
  thing: thingImg,
  lurch: lurchImg,
  grandmama: grandmamaImg,
};

export default function CharacterCard({ character, index }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-lg border-2 border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imageMap[character.image]}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-foreground mb-2">{character.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{character.description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex flex-wrap gap-2">
          {character.traits.map((trait, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
