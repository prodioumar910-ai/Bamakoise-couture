export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'traditionnel' | 'soiree' | 'contemporain' | 'ceremonie' | 'pret-a-porter';
  categoryLabel: string;
  image: string;
  description: string;
  fabrics: string[];
  atelierNotes: string;
  priceNote: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  location: string;
  occasion: string;
  quote: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  duration: string;
}
