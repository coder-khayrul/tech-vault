import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Sparkles, Bell, Gift } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const benefits = [
    {
      icon: Bell,
      title: "Weekly Digest",
      description: "Get the top products and trends delivered to your inbox"
    },
    {
      icon: Sparkles,
      title: "Exclusive Access",
      description: "Early access to new features and premium content"
    },
    {
      icon: Gift,
      title: "Special Offers",
      description: "Exclusive discounts and promotions from our partners"
    }
  ];

  const handleSubscribe =  (e) => {
    e.preventDefault();
    
   

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
     
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#4051b5] to-[#5b71f1] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Mail className="h-10 w-10" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Stay in the Loop
              </h2>
            </div>
            
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join over 25,000 makers and tech enthusiasts who get our weekly digest 
              of the most innovative products and industry insights.
            </p>
          </div>
          
          {/* Newsletter Form */}
          <div className="animate-slide-up bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white text-lg py-6"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-6 text-lg whitespace-nowrap"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="text-sm text-indigo-200 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-8 w-8 mx-auto mb-4 text-white" />
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-indigo-100 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;