export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: string;
  location: string;
  price: string;
  color: 'peach' | 'sage' | 'blue' | 'lavender';
  initials: string;
  services: string[];
}
