export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export type Portfolio = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
  tech_stack: string[];
  created_at: string;
};

export type PortfolioInput = Omit<Portfolio, 'id' | 'created_at'>;
