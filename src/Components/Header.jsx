import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { HiMenu, HiX, HiUser, HiLogout } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { GoArrowRight } from "react-icons/go";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ButtonTwo from './ui/ButtonTwo';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, userSignOut } = use(AuthContext)
    const navigate = useNavigate()
    const handleSignOut = () => {
        userSignOut()
            .then(() => console.log("Sign Out Successfully"))
            .catch((err) => console.warn(err))
        navigate("/")
    }

    const navLinks = [
        <Link className='text-white text-[16px] font-medium mr-8 hover:text-indigo-400 duration-500' to="/">
            Home
        </Link>,
        <Link className='text-white text-[16px] font-medium hover:text-indigo-400 duration-500' to="/products">
            Products
        </Link>
    ]

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-indigo-950 py-3">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <h2 className="font-bold text-[35px] text-white">Tech<span className='text-indigo-500'>Vault</span></h2>
                        </Link>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className="hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {
                                    navLinks.map((item,index) => (
                                        <NavigationMenuItem key={index}>
                                            {item}
                                        </NavigationMenuItem>
                                    ))
                                }
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!user ? (
                            <>
                                <ButtonTwo targetLink={"/login"}>
                                    Login
                                </ButtonTwo>
                                <ButtonTwo targetLink={"/register"}>
                                    Register
                                </ButtonTwo>

                            </>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} alt={user.displayName} />
                                            <AvatarFallback className="bg-indigo-500 text-white text-[17px]">
                                                {user?.displayName?.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-60 bg-white border border-gray-200" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-lg font-medium leading-none text-black">{user.displayName}</p>
                                            <p className="text-sm leading-none text-gray-600">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-gray-200" />
                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard" className="flex items-center text-black hover:bg-gray-100">
                                            <MdDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-200" />
                                    <DropdownMenuItem className="text-red-600 hover:bg-gray-100">
                                        <HiLogout className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <div className="md:hidden bg-indigo-500 text-white rounded-full w-12 h-12 grid place-items-center hover:bg-white hover:text-indigo-600 duration-700 cursor-pointer">
                                    <HiMenu size={25} />
                                </div>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l border-gray-200">
                                <SheetHeader>
                                    <SheetTitle className="text-left">
                                        <Link to="/" className="flex items-center ">
                                            <h2 className="font-bold text-[35px] text-black">App<span className='text-indigo-500'>Orbit</span></h2>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col space-y-4">
                                    {/* User Section for Mobile */}
                                    {user && (
                                        <div className="flex items-center space-x-3 px-3 pb-4 border-b border-gray-200">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user.avatar} alt={user.displayName} />
                                                <AvatarFallback className="bg-indigo-500 text-white text-[17px]">
                                                    {user?.displayName?.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-lg font-medium text-black">{user.displayName}</p>
                                                <p className="text-xs text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Links */}
                                    <nav className="flex flex-col space-y-2">
                                        <Link
                                            to="/"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition-colors"
                                        >
                                            Home
                                        </Link>
                                        <div className="space-y-2">
                                            <Link to={"/products"} className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 transition-colors" onClick={closeMobileMenu}>Products</Link>
                                        </div>
                                    </nav>

                                    {/* Auth Section for Mobile */}
                                    <div className="pt-4 border-t border-gray-200">
                                        {!user ? (
                                            <div className="flex items-center gap-4 justify-center mx-auto">
                                                <ButtonTwo targetLink={"/login"}>
                                                    Login
                                                </ButtonTwo>
                                                <ButtonTwo targetLink={"/register"}>
                                                    Register
                                                </ButtonTwo>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center px-3 py-2 rounded-md text-[16px] text-black hover:bg-gray-100 transition-colors"
                                                    onClick={closeMobileMenu}
                                                >
                                                    <MdDashboard className="mr-2 h-6 w-6 text-indigo-500" />
                                                    Dashboard
                                                </Link>
                                                <button
                                                    onClick={() => { handleSignOut(); }}
                                                    className="flex items-center px-3 py-2 rounded-md text-sm text-red-600 hover:bg-gray-100 transition-colors w-full text-left"
                                                >
                                                    <HiLogout className="mr-2 h-4 w-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;