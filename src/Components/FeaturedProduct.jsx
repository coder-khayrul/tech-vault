import React from 'react';
import Container from './ui/Container';
import ProductCard from './ProductCard';
import SectionHeader from './SectionHeader';

const FeaturedProduct = () => {
  const products =  [
  {
    "name": "PromptGenie AI",
    "image": "https://i.ibb.co/yNtTJk9/promptgenie.png",
    "description": "Generate powerful AI prompts for ChatGPT, Claude, and Gemini in seconds.",
    "tags": ["AI", "Productivity", "Tool"],
    "externalLink": "https://promptgenie.ai",
    "ownerName": "Alex Carter",
    "ownerEmail": "alex@example.com",
    "ownerImage": "https://i.ibb.co/2dsk5tk/user1.jpg",
    "votes": 42,
    "status": "accepted",
    "isFeatured": true,
    "timestamp": "2025-07-13T10:20:00Z"
  },
  {
    "name": "CodeHustle",
    "image": "https://i.ibb.co/gVz2bFw/codehustle.png",
    "description": "Collaborative coding environment with real-time peer reviews and project templates.",
    "tags": ["Web App", "Development", "Collaboration"],
    "externalLink": "https://codehustle.dev",
    "ownerName": "Sara Thompson",
    "ownerEmail": "sara@example.com",
    "ownerImage": "https://i.ibb.co/QNf7GfL/user2.jpg",
    "votes": 85,
    "status": "accepted",
    "isFeatured": false,
    "timestamp": "2025-07-12T14:30:00Z"
  },
  {
    "name": "SnapTask",
    "image": "https://i.ibb.co/dKRjm7h/snaptask.png",
    "description": "Simple, fast, and intuitive task manager for individuals and teams.",
    "tags": ["Productivity", "Task", "Mobile App"],
    "externalLink": "https://snaptask.io",
    "ownerName": "Michael Lee",
    "ownerEmail": "michael@example.com",
    "ownerImage": "https://i.ibb.co/VHbmz8r/user3.jpg",
    "votes": 103,
    "status": "accepted",
    "isFeatured": true,
    "timestamp": "2025-07-11T11:45:00Z"
  },
  {
    "name": "NovaLens",
    "image": "https://i.ibb.co/8rxwPtJ/novalens.png",
    "description": "Analyze your web analytics with AI-generated insights.",
    "tags": ["Analytics", "AI", "Web App"],
    "externalLink": "https://novalens.app",
    "ownerName": "Emily Zhang",
    "ownerEmail": "emily@example.com",
    "ownerImage": "https://i.ibb.co/b6D6Nmb/user4.jpg",
    "votes": 59,
    "status": "pending",
    "isFeatured": false,
    "timestamp": "2025-07-13T09:15:00Z"
  },
  {
    "name": "QuikUI",
    "image": "https://i.ibb.co/nBSyHTT/quikui.png",
    "description": "Drag-and-drop component builder for React, Vue, and Svelte.",
    "tags": ["Web App", "UI", "Dev Tool"],
    "externalLink": "https://quikui.com",
    "ownerName": "Tanvir Rahman",
    "ownerEmail": "tanvir@example.com",
    "ownerImage": "https://i.ibb.co/j6j9Hn5/user5.jpg",
    "votes": 72,
    "status": "accepted",
    "isFeatured": true,
    "timestamp": "2025-07-10T17:00:00Z"
  },
  {
    "name": "LoopMind",
    "image": "https://i.ibb.co/vvLxTfL/loopmind.png",
    "description": "Build habits, set goals, and track your personal growth with gamified rewards.",
    "tags": ["Wellness", "Mobile App", "Productivity"],
    "externalLink": "https://loopmind.app",
    "ownerName": "Priya Sharma",
    "ownerEmail": "priya@example.com",
    "ownerImage": "https://i.ibb.co/2sKn3JF/user6.jpg",
    "votes": 39,
    "status": "accepted",
    "isFeatured": false,
    "timestamp": "2025-07-09T08:40:00Z"
  },
  {
    "name": "PitchDeck AI",
    "image": "https://i.ibb.co/dKM2Vfz/pitchdeckai.png",
    "description": "Create stunning pitch decks for startups with AI-assisted content & design.",
    "tags": ["Startup", "AI", "Design Tool"],
    "externalLink": "https://pitchdeckai.com",
    "ownerName": "David Kim",
    "ownerEmail": "david@example.com",
    "ownerImage": "https://i.ibb.co/NZ2qCFh/user7.jpg",
    "votes": 97,
    "status": "pending",
    "isFeatured": false,
    "timestamp": "2025-07-08T16:20:00Z"
  },
  {
    "name": "VaultBoard",
    "image": "https://i.ibb.co/YWrGZcf/vaultboard.png",
    "description": "Secure your passwords and sensitive data with zero-knowledge encryption.",
    "tags": ["Security", "Web App", "Tool"],
    "externalLink": "https://vaultboard.io",
    "ownerName": "Fatima Noor",
    "ownerEmail": "fatima@example.com",
    "ownerImage": "https://i.ibb.co/S3gL6Q2/user8.jpg",
    "votes": 66,
    "status": "accepted",
    "isFeatured": true,
    "timestamp": "2025-07-07T12:50:00Z"
  },
  {
    "name": "FrameRater",
    "image": "https://i.ibb.co/72ZrMPK/framerater.png",
    "description": "Rate and discover trending movies & TV shows based on AI recommendations.",
    "tags": ["Entertainment", "AI", "Web App"],
    "externalLink": "https://framerater.tv",
    "ownerName": "Nashit Mahmud",
    "ownerEmail": "nashit@example.com",
    "ownerImage": "https://i.ibb.co/m5fhk2c/user9.jpg",
    "votes": 44,
    "status": "accepted",
    "isFeatured": false,
    "timestamp": "2025-07-06T19:25:00Z"
  },
  {
    "name": "DevTourney",
    "image": "https://i.ibb.co/7nLSCTh/devtourney.png",
    "description": "Compete in real-time coding tournaments and win prizes.",
    "tags": ["Developer", "Gaming", "Real-time"],
    "externalLink": "https://devtourney.com",
    "ownerName": "Ayesha Binte Hasan",
    "ownerEmail": "ayesha@example.com",
    "ownerImage": "https://i.ibb.co/F8YjgpL/user10.jpg",
    "votes": 80,
    "status": "accepted",
    "isFeatured": false,
    "timestamp": "2025-07-05T21:10:00Z"
  }
]

    return (
        <section className='py-20 bg-indigo-950'>
            <Container>
                <div>
                  <SectionHeader/>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    image={product.image}
                                    tags={product.tags}
                                    votes={product.votes}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </section>
    );
};

export default FeaturedProduct;