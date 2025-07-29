import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import Swal from 'sweetalert2';

export default function MyProfile() {
  const { user } = useAuth();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsPaymentOpen(false);
    Swal.fire({
      title: 'Payment Successful!',
      text: 'Your membership has been activated.',
      icon: 'success',
      confirmButtonText: 'Great!',
    });
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {user.name}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge
                variant={
                  user.role === 'admin'
                    ? 'default'
                    : user.role === 'moderator'
                    ? 'secondary'
                    : 'outline'
                }
              >
                {user.role.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="border-t pt-6">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
