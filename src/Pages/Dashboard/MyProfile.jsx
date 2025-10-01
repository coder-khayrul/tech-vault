import React, { use } from 'react';
import { MdVerified } from "react-icons/md";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
 import { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
 import { useEffect } from 'react';
 import axios from 'axios';


export default function MyProfile() {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
 const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://app-orbit-server-zeta.vercel.app/api/user/${user.email}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data)
        })
        .catch((err) => console.error(err));
    }
  }, [user]);


  const handleSubscribe = () => {
    navigate("/dashboard/payment/subscription");
  }


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle><span className="relative after:content-[''] after:block after:w-1/8 after:h-[2px] after:mt-1 after:bg-indigo-500">
            Profile Information
          </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className='flex items-start gap-5'>
            <div className="flex items-center gap-6">
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  {user.displayName}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>

              </div>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div onClick={handleSubscribe} className={`flex items-center gap-2 px-5 py-3 rounded-[50px] border-1 cursor-pointer border-sky-400 ${profile ? "bg-sky-100" : "bg-white"} `}>
                <b>{profile ? "Subscribed " : "Subscribe Now"}</b>
                <MdVerified className='text-sky-500' size={23} />
              </div>
            </motion.div>

          </div>


          {/* <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Membership Status</h3>

            {user.isSubscribed ? (
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-green-500">
                  Status: Verified
                </Badge>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Upgrade to premium membership to access exclusive features.
                </p>

                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Subscribe Now - $9.99/month
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Premium Membership Payment</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Pay $9.99
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
