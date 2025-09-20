// "use client";
// import SingleLineHeading from "@/components/common/SingleLineHeading";
// import DeleteProfileModal from '@/components/modals/DeleteProfileModal';
// import EditProfileModal from '@/components/modals/EditProfileModal';
// import LogoutModal from "@/components/modals/LogoutModal";
// import { useTheme } from "@/context/ThemeContext";
// import { ChevronDown, ChevronRight, Heart, Navigation, Search, SlidersHorizontal, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import React, { useEffect, useRef, useState, Suspense } from "react";
// import PopoverComponent from '../components/common/Popover';

// // Create a separate component for the content that uses useSearchParams
// const AppHeaderContent: React.FC = () => {
//   const [showMeScreen, setShowMeScreen] = useState(false);
//   const [mainDropdownAnchorEl, setMainDropdownAnchorEl] = useState<HTMLDivElement | null>(null);
//   const [themeAnchorEl, setThemeAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [aboutusAnchorEl, setAboutusAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [accountSettingAnchorEl, setAccountSettingAnchorEl] = useState<HTMLButtonElement | null>(null);
//   const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
//   const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
//   const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  
//   const profileName = 'content';
//   const searchParams = useSearchParams();

//   const isMenuOpen = searchParams.get("menu") === "true";

//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
//   }, [isMenuOpen]);

//   const { theme, setTheme } = useTheme();
//   const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">(theme);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === "k") {
//         event.preventDefault();
//         inputRef.current?.focus();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     const getThemeFromLocalStorage = () => {
//       try {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
//           return savedTheme as "light" | "dark" | "system";
//         }
//       } catch (error) {
//         console.warn('Failed to read theme from localStorage:', error);
//       }
//       return 'system';
//     };

//     const initialTheme = getThemeFromLocalStorage();
//     setSelectedTheme(initialTheme);
//     setTheme(initialTheme);
//   }, [setTheme]);

//   useEffect(() => {
//     if (showMeScreen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showMeScreen]);

//   useEffect(() => {
//     setMainDropdownAnchorEl(null);
//   }, [pathname]);

//   const handleMainDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     setMainDropdownAnchorEl(mainDropdownAnchorEl ? null : event.currentTarget);
//   };
//   const closeMainDropdown = () => {
//     setMainDropdownAnchorEl(null);
//   };

//   const handleNestedAction = (action: () => void) => {
//     action();
//     closeMainDropdown();
//   };

//   console.log("ismenuope",isMenuOpen);

//   return (
//     <header className="top-0 z-50 flex w-full flex-col relative">
//       {/* Me Screen Modal */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-[9999]">
//           <div className="absolute inset-0 bg-[#000]/20 transition-opacity duration-500 opacity-100" onClick={() => setShowMeScreen(false)} />
//           <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#F5F6FA] rounded-l-2xl shadow-xl transition-transform duration-500 ease-in-out ${showMeScreen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto max-h-full`}
//             style={{ minWidth: '320px' }}
//           >
//             <button className="absolute top-3 right-3 z-10" onClick={() => setShowMeScreen(false)}>
//               <X size={24} />
//             </button>
//             <button className="absolute top-3 right-16 bg-[#2563eb] text-white text-xs px-3 py-1 rounded-full">Help</button>
            
//             {/* Profile Card */}
//             <div className="flex items-center gap-3 bg-white rounded-xl p-3 mt-6 mb-4">
//               <Image src="/images/user/user-01.jpg" alt="User" width={48} height={48} className="rounded-full border-2 border-white" />
//               <div>
//                 <div className="font-bold text-lg text-[#000] leading-tight dark:text-white">Dhruv Bhatia</div>
//                 <div className="text-xs text-[#888] font-medium">+91 9812918237</div>
//               </div>
//               <button className="ml-auto">
//                 <Image src="/images/icons/account-settings.svg" alt="edit" width={20} height={20} />
//               </button>
//             </div>
            
//             {/* My Bookings */}
//             <div className="text-center text-xs font-bold text-[#888] tracking-widest mb-2 mt-4">MY BOOKINGS</div>
//             <div className="bg-white rounded-xl flex flex-col gap-1 mb-4">
//               {[
//                 { label: 'Table Booking', icon: '/images/icons/table-booking.svg', link: '/table-booking' },
//                 { label: 'Salon Booking', icon: '/images/icons/salon-booking.svg', link: '/salon-booking' },
//                 { label: 'Event Booking', icon: '/images/icons/event-booking.svg', link: '/event-booking' },
//                 { label: 'Spa Booking', icon: '/images/icons/spa-booking.svg', link: '/spa-booking' },
//               ].map((item) => (
//                 <Link href={item.link} key={item.label} className="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-lg">
//                   <Image src={item.icon} alt={item.label} width={22} height={22} />
//                   <span className="ml-3 text-base font-semibold text-[#000] flex-1">{item.label}</span>
//                   <ChevronRight size={18} />
//                 </Link>
//               ))}
//             </div>
            
//             {/* Rewards */}
//             <div className="text-center text-xs font-bold text-[#888] tracking-widest mb-2 mt-4">REWARDS</div>
//             <div className="bg-white rounded-xl p-2 flex flex-col gap-1 mb-4">
//               {[
//                 { label: 'Scratch Cards', icon: '/images/icons/scratch-cards.svg' },
//                 { label: 'Cashbacks', icon: '/images/icons/cashbacks.svg' },
//               ].map((item) => (
//                 <div key={item.label} className="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-lg">
//                   <Image src={item.icon} alt={item.label} width={22} height={22} />
//                   <span className="ml-3 text-base font-semibold text-[#000] flex-1">{item.label}</span>
//                   <ChevronRight size={18} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <EditProfileModal
//         isOpen={editProfileModalOpen}
//         onClose={() => setEditProfileModalOpen(false)}
//         initialProfileName={profileName}
//       />
//       <DeleteProfileModal
//         isOpen={deleteAccountModalOpen}
//         onClose={() => setDeleteAccountModalOpen(false)}
//         onDelete={() => {console.log("Account deleted")}}
//       />
//       <LogoutModal
//         isOpen={logoutModalOpen}
//         onClose={() => setLogoutModalOpen(false)}
//         onLogout={() => console.log("Log out")}
//       />

//       {/* Desktop Header */}
//       <div className="hidden lg:flex w-full items-center justify-between px-4 py-3 lg:px-6 bg-white dark:bg-[#000]">
//         {/* Left Section */}
//         <div className="flex items-center gap-4">
//           <Link href="/">
//             <Image
//               width={154}
//               height={32}
//               className="dark:hidden"
//               src="/images/common/logo.svg"
//               alt="Logo"
//             />
//             <Image
//               width={154}
//               height={32}
//               className="hidden dark:block"
//               src="/images/common/logo.svg"
//               alt="Logo"
//             />
//           </Link>
//           <div className="hidden h-6 w-[1px] rotate-180 bg-[#000] dark:bg-white lg:block" />
//           <div className="location hidden items-center gap-2 lg:flex">
//             <Navigation className="fill-[#000] dark:fill-white" />
//             <div>
//               <div className="flex items-center gap-2 text-base">
//                 <p className="text-nowrap font-bold text-[#000] dark:text-white">Noida UP</p>
//                 <p className="text-gray-500 dark:text-gray-300">
//                   <ChevronDown className="dark:text-white" />
//                 </p>
//               </div>
//               <p className="text-nowrap text-sm text-[#000] opacity-60 dark:text-white dark:opacity-60">
//                 DLF Mall, Noida Sector 18
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Center Section - Navigation */}
//         <div className="hidden lg:block">
//           <nav>
//             <ul className="flex items-center gap-8 text-base text-[#000] dark:text-white">
//               <li><Link href="/">Home</Link></li>
//               <li><Link href="/about">About us</Link></li>
//               <li><Link href="/contact">Contact</Link></li>
//               <li><Link href="/about">How it works</Link></li>
//               <li><Link href="/brands">Brands</Link></li>
//             </ul>
//           </nav>
//         </div>

//         {/* Right Section - Search and Profile */}
//         <div className="hidden items-center gap-4 lg:flex">
//           <div className="search relative">
//             <input
//               ref={inputRef}
//               type="search"
//               placeholder="Search"
//               className="rounded-full border-2 border-[#999999] dark:border-[#999999] py-2 px-10 pl-12 bg-white dark:bg-[#000] text-[#000] dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
//             />
//             <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#999999] dark:text-gray-400 ml-3" size={18} />
//             <button>
//               <SlidersHorizontal className="absolute right-2 top-1/2 -translate-y-1/2 text-[#999999] dark:text-gray-400 mr-3" size={18} />
//             </button>
//           </div>

//           {/* Profile Section with Main Dropdown */}
//           <div className="flex items-center gap-x-2 relative">
//             <div className="profile h-8 w-8 rounded-full border relative overflow-hidden">
//               <Image src={"/images/gallery/gallery-1.svg"} fill className="object-cover" alt="profile-pic" />
//             </div>
//             <div className="name cursor-pointer" onClick={handleMainDropdownClick}>
//               <p className="font-bold text-xs dark:text-white">Hello Dhruv</p>
//               <div className="flex items-center gap-x-2">
//                 <p className="font-normal text-sm dark:text-white">Your Account</p>
//                 <ChevronDown size={17} className="fill-[#000] dark:fill-white" />
//               </div>
//             </div>

//             {/* Main Dropdown using PopoverComponent */}
//             <PopoverComponent
//               open={Boolean(mainDropdownAnchorEl)}
//               anchorEl={mainDropdownAnchorEl}
//               onClose={closeMainDropdown}
//             >
//               <div className="bg-white border border-[#E4E4E4] dark:border-[#555] dark:bg-[#232323] w-[364px] rounded-xl shadow-lg z-50 p-5 max-h-[90vh] overflow-y-auto hide-scrollbar">
//                 {/* My Bookings */}
//                 <div className="flex flex-col gap-y-4">
//                   <SingleLineHeading title="My Bookings" />
//                   <div className="menu flex flex-col gap-y-4 rounded-2xl">
//                     {[
//                       { href: "/table-booking", icon: "/images/icons/table-booking.svg", darkIcon: "/images/icons/dark/table-booking.svg", label: "Table Booking" },
//                       { href: "/salon-booking", icon: "/images/icons/salon-booking.svg", darkIcon: "/images/icons/dark/salon-booking.svg", label: "Salon Booking" },
//                       { href: "/event-booking", icon: "/images/icons/event-booking.svg", darkIcon: "/images/icons/dark/event-booking.svg", label: "Event Booking" },
//                       { href: "/spa-booking", icon: "/images/icons/spa-booking.svg", darkIcon: "/images/icons/dark/spa-booking.svg", label: "Spa Booking" }
//                     ].map((item) => (
//                       <div key={item.label} className="flex items-center justify-between">
//                         <Link href={item.href} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                           <div className="icon dark:hidden">
//                             <Image src={item.icon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src={item.darkIcon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">{item.label}</p>
//                           </div>
//                         </Link>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Rewards */}
//                 <div className="flex flex-col gap-y-4 mt-8">
//                   <SingleLineHeading title="Rewards" />
//                   <div className="menu flex flex-col gap-y-4 rounded-2xl">
//                     {[
//                       { href: "/", icon: "/images/icons/scratch-cards.svg", darkIcon: "/images/icons/dark/scratch-card.svg", label: "Scratch Cards" },
//                       { href: "/", icon: "/images/icons/cashbacks.svg", darkIcon: "/images/icons/dark/cashback.svg", label: "Cashbacks" }
//                     ].map((item) => (
//                       <div key={item.label} className="flex items-center justify-between">
//                         <Link href={item.href} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                           <div className="icon dark:hidden">
//                             <Image src={item.icon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src={item.darkIcon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">{item.label}</p>
//                           </div>
//                         </Link>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Transactions */}
//                 <div className="flex flex-col mt-8 gap-y-4">
//                   <SingleLineHeading title="Transactions" />
//                   <div className="menu rounded-2xl">
//                     <div className="flex items-center justify-between">
//                       <Link href={"/my-transaction"} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                         <div className="icon dark:hidden">
//                           <Image src="/images/icons/my-transaction.svg" alt="my transaction icon" height={24} width={24} />
//                         </div>
//                         <div className="icon hidden dark:block">
//                           <Image src="/images/icons/dark/transaction.svg" alt="my transaction icon" height={24} width={24} />
//                         </div>
//                         <div className="menu-label">
//                           <p className="font-bold text-base text-[#555555] dark:text-[#999999]">My Transactions</p>
//                         </div>
//                       </Link>
//                       <ChevronRight className="dark:text-[#999999]" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Manage */}
//                 <div className="flex flex-col mt-8 gap-y-4">
//                   <SingleLineHeading title="Manage" />
//                   <div className="menu flex flex-col gap-y-4 rounded-2xl">
//                     {/* Wishlist */}
//                     <div className="flex items-center justify-between">
//                       <Link href={"/my-wishlist"} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                         <Heart className="dark:text-[#999] text-[#555]" size={22}/>
//                         <div className="menu-label">
//                           <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Wishlist</p>
//                         </div>
//                       </Link>
//                       <ChevronRight className="dark:text-[#999999]" />
//                     </div>
                    
//                     {/* Reviews */}
//                     <div className="flex items-center justify-between">
//                       <Link href={"/my-reviews"} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                         <div className="icon dark:hidden">
//                           <Image src="/images/icons/reviews.svg" alt="reviews icon" height={24} width={24} />
//                         </div>
//                         <div className="icon hidden dark:block">
//                           <Image src="/images/icons/dark/review-star.svg" alt="reviews icon" height={24} width={24} />
//                         </div>
//                         <div className="menu-label">
//                           <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Reviews</p>
//                         </div>
//                       </Link>
//                       <ChevronRight className="dark:text-[#999999]" />
//                     </div>
                    
//                     {/* Theme Dropdown */}
//                     <div className="relative">
//                       <button
//                         className="flex items-center justify-between w-full"
//                         onClick={e => setThemeAnchorEl(e.currentTarget)}
//                         type="button"
//                       >
//                         <div className="flex items-center gap-x-2">
//                           <div className="icon dark:hidden">
//                             <Image src="/images/icons/theme.svg" alt="theme icon" height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src="/images/icons/dark/theme.svg" alt="theme icon" height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Theme</p>
//                           </div>
//                         </div>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </button>
//                       <PopoverComponent
//                         open={Boolean(themeAnchorEl)}
//                         anchorEl={themeAnchorEl}
//                         onClose={() => setThemeAnchorEl(null)}
//                       >
//                         <div className="w-64 bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg dark:shadow-xl z-50 p-4">
//                           {(["light", "dark", "system"] as ("light" | "dark" | "system")[]).map((option) => (
//                             <button
//                               key={option}
//                               className="flex items-center justify-between w-full py-2 text-left"
//                               onClick={() => {
//                                 setTheme(option);
//                                 setSelectedTheme(option);
//                                 setThemeAnchorEl(null);
//                               }}
//                             >
//                               <span className="font-medium text-[#444] dark:text-[#F5F5F5]">
//                                 {option === "light" && "Light Theme"}
//                                 {option === "dark" && "Dark Theme"}
//                                 {option === "system" && "Default to device theme"}
//                               </span>
//                               <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full border-gray-400 dark:border-[#888]">
//                                 {selectedTheme === option && (
//                                   <span className="w-3 h-3 bg-[#000] dark:bg-white rounded-full block" />
//                                 )}
//                               </span>
//                             </button>
//                           ))}
//                         </div>
//                       </PopoverComponent>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Support */}
//                 <div className="flex flex-col mt-8 gap-y-4">
//                   <SingleLineHeading title="Support" />
//                   <div className="menu flex flex-col gap-y-4 rounded-2xl">
//                     {[
//                       { href: "/faq", icon: "/images/icons/frequently-asked-question.svg", darkIcon: "/images/icons/dark/faq.svg", label: "Frequently Asked Questions" },
//                       { href: "/chat", icon: "/images/icons/chat.svg", darkIcon: "/images/icons/dark/chat.svg", label: "Chat With Us" }
//                     ].map((item) => (
//                       <div key={item.label} className="flex items-center justify-between">
//                         <Link href={item.href} className="flex items-center gap-x-2" onClick={closeMainDropdown}>
//                           <div className="icon dark:hidden">
//                             <Image src={item.icon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src={item.darkIcon} alt={`${item.label} icon`} height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">{item.label}</p>
//                           </div>
//                         </Link>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* More */}
//                 <div className="flex flex-col mt-8 gap-y-4">
//                   <SingleLineHeading title="More" />
//                   <div className="menu flex flex-col gap-y-4 rounded-2xl">
//                     {/* Account Settings Dropdown */}
//                     <div className="relative">
//                       <button
//                         className="flex items-center justify-between w-full"
//                         onClick={e => setAccountSettingAnchorEl(e.currentTarget)}
//                         type="button"
//                       >
//                         <div className="flex items-center gap-x-2">
//                           <div className="icon dark:hidden">
//                             <Image src="/images/icons/account-settings.svg" alt="account settings icon" height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src="/images/icons/dark/account-settings.svg" alt="account settings icon" height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Account Setting</p>
//                           </div>
//                         </div>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </button>
//                       <PopoverComponent
//                         open={Boolean(accountSettingAnchorEl)}
//                         anchorEl={accountSettingAnchorEl}
//                         onClose={() => setAccountSettingAnchorEl(null)}
//                       >
//                         <div className="w-64 bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg dark:shadow-xl z-50 p-4 flex flex-col gap-y-2">
//                           <button 
//                             className="flex items-center justify-between w-full text-left" 
//                             onClick={() => handleNestedAction(() => setEditProfileModalOpen(true))}
//                           >
//                             <span className="font-bold text-base text-[#555] dark:text-[#999]">Edit Profile</span>
//                             <ChevronRight className="dark:text-[#999]" />
//                           </button>
//                           <button 
//                             className="flex items-center justify-between w-full text-left" 
//                             onClick={() => handleNestedAction(() => setDeleteAccountModalOpen(true))}
//                           >
//                             <span className="font-bold text-base text-[#555] dark:text-[#999]">Delete Account</span>
//                             <ChevronRight className="dark:text-[#999]" />
//                           </button>
//                         </div>
//                       </PopoverComponent>
//                     </div>
                    
//                     {/* About Us Dropdown */}
//                     <div className="relative">
//                       <button
//                         className="flex items-center justify-between w-full"
//                         onClick={e => setAboutusAnchorEl(e.currentTarget)}
//                         type="button"
//                       >
//                         <div className="flex items-center gap-x-2">
//                           <div className="icon dark:hidden">
//                             <Image src={"/images/icons/about-us.svg"} alt="about icon" height={24} width={24} />
//                           </div>
//                           <div className="icon hidden dark:block">
//                             <Image src="/images/icons/dark/about.svg" alt="about icon" height={24} width={24} />
//                           </div>
//                           <div className="menu-label">
//                             <p className="font-bold text-base text-[#555555] dark:text-[#999999]">About us</p>
//                           </div>
//                         </div>
//                         <ChevronRight className="dark:text-[#999999]" />
//                       </button>
//                       <PopoverComponent
//                         open={Boolean(aboutusAnchorEl)}
//                         anchorEl={aboutusAnchorEl}
//                         onClose={() => setAboutusAnchorEl(null)}
//                       >
//                         <div className="w-64 bg-white dark:bg-[#232323] border border-gray-200 dark:border-[#444] rounded-xl shadow-lg dark:shadow-xl z-50 p-4 flex flex-col gap-y-2">
//                           <Link href={"/company/terms-condition"} className="flex items-center justify-between" onClick={closeMainDropdown}>
//                             <span className="font-bold text-base text-[#555] dark:text-[#999]">Terms & Condition</span>
//                             <ChevronRight className="dark:text-[#999]" />
//                           </Link>
//                           <Link href={"/company/privacy-policy"} className="flex items-center justify-between" onClick={closeMainDropdown}>
//                             <span className="font-bold text-base text-[#555] dark:text-[#999]">Privacy Policy</span>
//                             <ChevronRight className="dark:text-[#999]" />
//                           </Link>
//                         </div>
//                       </PopoverComponent>
//                     </div>
                    
//                     {/* Logout */}
//                     <div className="flex items-center justify-between">
//                       <button 
//                         className="flex items-center gap-x-2 w-full text-left" 
//                         onClick={() => handleNestedAction(() => setLogoutModalOpen(true))}
//                       >
//                         <div className="icon dark:hidden">
//                           <Image src="/images/icons/logout.svg" alt="logout icon" height={24} width={24} />
//                         </div>
//                         <div className="icon hidden dark:block">
//                           <Image src="/images/icons/dark/logout.svg" alt="logout icon" height={24} width={24} />
//                         </div>
//                         <div className="menu-label">
//                           <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Logout</p>
//                         </div>
//                       </button>
//                       <ChevronRight className="dark:text-[#999999]" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </PopoverComponent>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Loading component for Suspense fallback
// const HeaderLoadingFallback = () => (
//   <header className="top-0 z-50 flex w-full flex-col relative">
//     <div className="hidden lg:flex w-full items-center justify-between px-4 py-3 lg:px-6 bg-white dark:bg-[#000]">
//       <div className="flex items-center gap-4">
//         <div className="w-[154px] h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//         <div className="hidden h-6 w-[1px] rotate-180 bg-gray-200 dark:bg-gray-700 lg:block" />
//         <div className="hidden items-center gap-2 lg:flex">
//           <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           <div>
//             <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
//             <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </div>
//         </div>
//       </div>
//       <div className="hidden lg:block">
//         <div className="flex items-center gap-8">
//           {[1,2,3,4,5].map(i => (
//             <div key={i} className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           ))}
//         </div>
//       </div>
//       <div className="hidden items-center gap-4 lg:flex">
//         <div className="w-48 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
//         <div className="flex items-center gap-x-2">
//           <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
//           <div>
//             <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
//             <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// // Main AppHeader component wrapped with Suspense
// const AppHeader: React.FC = () => {
//   return (
//     <Suspense fallback={<HeaderLoadingFallback />}>
//       <AppHeaderContent />
//     </Suspense>
//   );
// };

// export default AppHeader;

import React from 'react'
import { Bell, MessageCircle } from 'lucide-react'

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-theme-blue">Cloutsy</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} className="text-black" />
        </button>
        <button className="hover:bg-gray-100 rounded-full transition-colors">
          <MessageCircle size={20} className="text-black" />
        </button>
      </div>
    </header>
  )
}

export default AppHeader