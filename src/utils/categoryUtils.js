import {
  Stethoscope,
  Building2,
  Cpu,
  Brain,
  Car,
  Sprout,
  ShieldCheck,
  Dna,
  Banknote,
  Briefcase,
  Building,
  Utensils,
  Zap,
  Truck,
  Laptop,
  GraduationCap,
  Coins,
  Atom,
  TreePine,
  MessageSquare,
} from "lucide-react"

export function getCategoryIcon(categoryName) {
  const iconMap = {
    "Healthcare Technology": Stethoscope,
    "Sustainable Design": Building2,
    "Emerging Technologies": Cpu,
    "Mental Health": Brain,
    "Automotive Technology": Car,
    "Urban Agriculture": Sprout,
    Cybersecurity: ShieldCheck,
    Biotechnology: Dna,
    Fintech: Banknote,
    "Future of Work": Briefcase,
    "Smart Cities": Building,
    "Food Technology": Utensils,
    "Clean Energy": Zap,
    "Supply Chain Innovation": Truck,
    "Edge Computing": Laptop,
    "Educational Technology": GraduationCap,
    "Financial Technology": Coins,
    "Quantum Technology": Atom,
    "Environmental Technology": TreePine,
    "Artificial Intelligence": MessageSquare,
  }

  return iconMap[categoryName] || MessageSquare // Default to MessageSquare if category not found
}

export function getCategoryColor(categoryName) {
  const colorMap = {
    "Healthcare Technology": "#FF6B6B",
    "Sustainable Design": "#4ECDC4",
    "Emerging Technologies": "#45B7D1",
    "Mental Health": "#FFAD5A",
    "Automotive Technology": "#FF8C42",
    "Urban Agriculture": "#6BCB77",
    Cybersecurity: "#4D96FF",
    Biotechnology: "#9B59B6",
    Fintech: "#5D5FEF",
    "Future of Work": "#00B8A9",
    "Smart Cities": "#F8A488",
    "Food Technology": "#F7C59F",
    "Clean Energy": "#97C1A9",
    "Supply Chain Innovation": "#FCB1A6",
    "Edge Computing": "#5C7AEA",
    "Educational Technology": "#FFD93D",
    "Financial Technology": "#6155A6",
    "Quantum Technology": "#A685E2",
    "Environmental Technology": "#6ECB63",
    "Artificial Intelligence": "#FF9A8B",
  }

  return colorMap[categoryName] || "#718096" // Default to a neutral color if category not found
}

