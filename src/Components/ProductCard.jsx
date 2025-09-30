import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiUpvote } from "react-icons/bi";
import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
const ProductCard = ({ product }) => {
  const {
    _id,
    productName,
    description,
    image,
    tags,
    ownerEmail,
    isOwner = false,
    upvotes
  } = product
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [voteCount, setVoteCount] = useState(upvotes ? parseInt(upvotes) : 0);

 const handleVoteCount = () => {
  if (!user) {
    navigate('/login');
    return;
  }

  if (ownerEmail === user.email) {
    Swal.fire({
      icon: "info",
      title: "Oops!",
      text: "You cannot vote for your own product.",
    });
    return;
  }

  axios.patch(`https://app-orbit-server-zeta.vercel.app/products/${_id}`, {
    userEmail: user.email
  }, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (res.data.modifiedCount) {
      setVoteCount(voteCount + 1);
    }
  })
  .catch(error => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response?.data?.message}`,
    });
  });
};


  return (
    <div className="relative clip-diagonal p-[1px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-indigo-900 rounded-lg ">
      <Card
        className="group relative overflow-h_idden clip-diagonal bg-indigo-950 hover:bg-indigo-00 cursor-pointer duration-700 "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/8 via-transparent to-indigo-400-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <CardContent className="p-2 relative">
          <div className="overflow-h_idden flex justify-between items-baseline p-5">
            <img
              src={image}
              alt={productName}
              className="w-20 h-20 object-cover rounded-full ring-3 ring-indigo-400 transition-transform duration-300 ring-offset-2 group-hover:scale-105"
            />
            <Button
              size="sm"
              onClick={handleVoteCount}
              className={`flex items-center gap-1 font-medium transition-all duration-200 border border-transparent hover:border-indigo-400 ${isOwner
                ? 'opacity-50 cursor-not-allowed'

                : 'bg-indigo-400 hover:bg-indigo-950 text-white hover:text-indigo-400 hover:scale-105'
                }`}
            >
              <BiUpvote className={`h-4 w-4 transition-transform`} />
              {voteCount}
            </Button>
          </div>
          <div className="px-5 pb-3">
            <div className="mb-3">
              <Link to={`/products/${_id}`}>
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1 duration-700">
                  {productName}
                </h3>
              </Link>
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
                <Badge className="text-xs text-indigo-400 border border-indigo-400 ">
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