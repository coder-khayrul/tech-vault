import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Trophy, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import communityImage from "@/assets/image/community.jpg";

const CommunitySection = () => {
  const stats = [
    { icon: Users, label: "Active Makers", value: "10,000+", color: "text-blue-500" },
    { icon: Rocket, label: "Products Launched", value: "2,500+", color: "text-green-500" },
    { icon: MessageSquare, label: "Reviews Written", value: "50,000+", color: "text-purple-500" },
    { icon: Trophy, label: "Awards Given", value: "1,200+", color: "text-orange-500" },
  ];


  return (
    <section className="py-20 bg-gradient-to-br from-indigo-700/5 via-background to-indigo-500/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,_rgba(99,102,241,0.3)_1px,_transparent_0)] bg-[size:50px_50px]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join Our Thriving
                <span className="block text-indigo-500">Maker Community</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with thousands of innovative makers, developers, and entrepreneurs who are 
                building the future of technology. Share your creations, get feedback, and discover 
                amazing products from creators around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-500/90 font-semibold px-8">
                Join Community
              </Button>
              <Button variant="outline" size="lg" className="font-semibold px-8">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image Side */}
          <motion.div 
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={communityImage} 
                alt="Community of makers and developers"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-indigo-700/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">+127 new products today</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-indigo-700/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-700 rounded-full" />
                <span className="text-sm font-medium">5.2K votes cast this week</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;