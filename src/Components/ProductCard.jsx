import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiUpvote } from "react-icons/bi";
import { useState } from "react";
import TechOne from "../assets/image/tech-1.jpg"
const ProductCard = ({
  id,
  name,
  description,
  image,
  tags,
  votes,
  isOwner = false,
  hasVoted = false,
  onVote,
}) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [userHasVoted, setUserHasVoted] = useState(hasVoted);

  const handleVote = () => {
    if (isOwner || userHasVoted) return;

    setCurrentVotes(prev => prev + 1);
    setUserHasVoted(true);
    onVote?.(id);
  };



  return (
    <div className="relative clip-diagonal p-[1px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-indigo-900 rounded-lg ">
      <Card
        className="group relative overflow-hidden clip-diagonal bg-indigo-950 hover:bg-indigo-00 cursor-pointer duration-700 "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/8 via-transparent to-indigo-400-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <CardContent className="p-2 relative">
          <div className="overflow-hidden flex justify-between items-baseline p-5">
            <img
              src={TechOne}
              alt={name}
              className="w-20 h-20 object-cover rounded-full ring-3 ring-indigo-400 transition-transform duration-300 ring-offset-2 group-hover:scale-105"
            />
            <Button
              variant={userHasVoted ? "default" : "border"}
              size="sm"
              className={`flex items-center gap-1 font-medium transition-all duration-200 border border-transparent hover:border-indigo-400 ${isOwner
                ? 'opacity-50 cursor-not-allowed'
                : userHasVoted
                  ? 'bg-indigo-400 text-white'
                  : 'bg-indigo-400 hover:bg-indigo-950 text-white hover:text-indigo-400 hover:scale-105'
                }`}
            >
              <BiUpvote className={`h-4 w-4 transition-transform ${!isOwner && !userHasVoted ? 'scale-110' : ''}`} />
              {currentVotes}
            </Button>
          </div>
          <div className="px-5 pb-3">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1 duration-700">
                {name}
              </h3>
            </div>

            <p className="text-indigo-200 text-sm mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags?.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium bg-indigo-900 text-indigo-400 hover:bg-indigo-400/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  );
};

export default ProductCard;