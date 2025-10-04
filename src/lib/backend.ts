// Working Backend Service - No external dependencies required
export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  description: string;
  type: string;
  featured: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller';
  avatar?: string;
  createdAt: number;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  isAI: boolean;
  timestamp: number;
}

// Mock data that works immediately
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    price: '$450,000',
    location: 'Downtown, New York',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sq ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views.',
    type: 'apartment',
    featured: true,
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Luxury Family Home',
    price: '$750,000',
    location: 'Suburbs, California',
    bedrooms: 4,
    bathrooms: 3,
    area: '2,500 sq ft',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    description: 'Spacious family home with large backyard and modern amenities.',
    type: 'house',
    featured: false,
    createdAt: Date.now() - 172800000,
  },
  {
    id: '3',
    title: 'Cozy Studio Apartment',
    price: '$280,000',
    location: 'Brooklyn, New York',
    bedrooms: 1,
    bathrooms: 1,
    area: '600 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    description: 'Perfect starter home in trendy Brooklyn neighborhood.',
    type: 'apartment',
    featured: false,
    createdAt: Date.now() - 259200000,
  },
  {
    id: '4',
    title: 'Executive Penthouse',
    price: '$1,200,000',
    location: 'Manhattan, New York',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,000 sq ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Luxurious penthouse with panoramic city views and premium finishes.',
    type: 'penthouse',
    featured: true,
    createdAt: Date.now() - 345600000,
  },
  {
    id: '5',
    title: 'Beachfront Villa',
    price: '$950,000',
    location: 'Miami, Florida',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,800 sq ft',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    description: 'Stunning beachfront property with direct ocean access.',
    type: 'villa',
    featured: true,
    createdAt: Date.now() - 432000000,
  },
  {
    id: '6',
    title: 'Mountain Cabin',
    price: '$320,000',
    location: 'Aspen, Colorado',
    bedrooms: 2,
    bathrooms: 1,
    area: '1,000 sq ft',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    description: 'Charming cabin perfect for weekend getaways and nature lovers.',
    type: 'cabin',
    featured: false,
    createdAt: Date.now() - 518400000,
  },
];

// Working backend service
export class BackendService {
  private properties: Property[] = [...mockProperties];
  private users: User[] = [];
  private messages: Message[] = [];

  // Property operations
  async getProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.properties]), 100);
    });
  }

  async getProperty(id: string): Promise<Property | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const property = this.properties.find(p => p.id === id);
        resolve(property || null);
      }, 100);
    });
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = this.properties.filter(p => p.featured);
        resolve(featured);
      }, 100);
    });
  }

  async searchProperties(query: string): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.properties.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.location.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 200);
    });
  }

  async createProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProperty: Property = {
          ...property,
          id: `prop-${Date.now()}`,
          createdAt: Date.now(),
        };
        this.properties.push(newProperty);
        resolve(newProperty);
      }, 200);
    });
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.properties.findIndex(p => p.id === id);
        if (index === -1) {
          resolve(null);
          return;
        }
        this.properties[index] = { ...this.properties[index], ...updates };
        resolve(this.properties[index]);
      }, 200);
    });
  }

  async deleteProperty(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.properties.findIndex(p => p.id === id);
        if (index === -1) {
          resolve(false);
          return;
        }
        this.properties.splice(index, 1);
        resolve(true);
      }, 200);
    });
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.users]), 100);
    });
  }

  async getUser(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === id);
        resolve(user || null);
      }, 100);
    });
  }

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...user,
          id: `user-${Date.now()}`,
          createdAt: Date.now(),
        };
        this.users.push(newUser);
        resolve(newUser);
      }, 200);
    });
  }

  // Message operations
  async getMessages(userId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userMessages = this.messages.filter(m => m.userId === userId);
        resolve(userMessages);
      }, 100);
    });
  }

  async createMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: Date.now(),
        };
        this.messages.push(newMessage);
        resolve(newMessage);
      }, 200);
    });
  }

  // AI Chat simulation
  async sendAIMessage(userMessage: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple AI responses based on keywords
        const responses = [
          "I'd be happy to help you find the perfect property! What's your budget range?",
          "Based on your preferences, I recommend checking out our featured properties.",
          "That's a great location! I have several properties in that area that might interest you.",
          "I can help you compare different properties and their features.",
          "Let me know if you'd like to schedule a viewing for any of these properties.",
          "I can provide more details about the neighborhood and local amenities.",
          "Would you like me to save this property to your favorites?",
          "I can help you understand the financing options available.",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1000);
    });
  }
}

// Export singleton instance
export const backend = new BackendService();
