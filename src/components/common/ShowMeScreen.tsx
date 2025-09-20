import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Heart, Pencil } from 'lucide-react'
import LineHeading from './LineHeading'
import { useTheme } from '@/context/ThemeContext'
import AccountSettingScreen from './AccountSettingScreen';

interface ShowMeScreenProps {
    isOpen: boolean
    onClose: () => void
}

const ShowMeScreen: React.FC<ShowMeScreenProps> = ({ isOpen, onClose }) => {
    const [showThemeSheet, setShowThemeSheet] = React.useState(false)
    const [selectedTheme, setSelectedTheme] = React.useState<'light' | 'dark' | 'system'>('light')
    const [showLogoutSheet, setShowLogoutSheet] = React.useState(false)
    const [showAccountSetting, setShowAccountSetting] = React.useState(false);
    const {theme, setTheme } = useTheme()
    console.log(theme);

    // Prevent background scroll when ShowMeScreen or theme sheet is open
    useEffect(() => {
        if (isOpen || showThemeSheet) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen, showThemeSheet])

    useEffect(() => {
        const getThemeFromLocalStorage = () => {
            try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
                    return savedTheme as 'light' | 'dark' | 'system';
                }
            } catch (error) {
                console.warn('Failed to read theme from localStorage:', error);
            }
            return 'system'; // default fallback
        };

        const initialTheme = getThemeFromLocalStorage();
        setSelectedTheme(initialTheme);
        setTheme(initialTheme);
    }, [setTheme]);

    if (!isOpen) return null


    return (
        <>
            <div className="fixed inset-0 z-[9999]">
                {/* Backdrop with fade-in */}
                <div className="absolute inset-0 bg-[#000]/20 transition-opacity duration-500 opacity-100" onClick={onClose} />
                {/* Sliding Drawer */}
                <div className={`fixed top-0 right-0 h-full w-full dark:bg-[#1B1B1B] bg-[#F1F1F1] shadow-xl transition-transform duration-500 ease-in-out px-4 pb-5 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto max-h-full`} style={{ minWidth: '320px' }}>
                    {/* Help button */}
                    <div className='flex items-center justify-between w-full mt-5'>
                        <button onClick={onClose}>
                            <ArrowLeft className='dark:text-white' />
                        </button>
                        <div className='flex items-center gap-x-4'>
                            <div className='bg-white dark:bg-[#292929] flex items-center px-3 py-1.5 rounded-full relative'>
                                <span className='text-xs font-bold pl-2 dark:text-[#999]'>₹1,200</span>
                                <Image src={"/images/icons/money.svg"} alt="coins" width={40} height={30} className='absolute -left-5'/>
                            </div>
                            <div className='bg-white dark:bg-[#292929] flex items-center px-3 py-1.5 rounded-full relative'>
                                <span className='text-xs font-bold pl-2 dark:text-[#999]'>10,200</span>
                                <Image src={"/images/icons/coins.svg"} alt="coins" width={25} height={25} className='absolute -left-2'/>
                            </div>
                        </div>
                    </div>
                    {/* Profile Card */}
                    <div className="flex items-center gap-3 bg-white dark:bg-[#292929] rounded-2xl mt-6 mb-4 p-4">
                        <Image src="/images/user/user-01.jpg" alt="User" width={48} height={48} className="rounded-full border-2 border-white" />
                        <div>
                            <div className="font-bold text-lg text-[#000] dark:text-white leading-tight">Dhruv Bhatia</div>
                            <div className="text-xs text-[#888] dark:text-[#999999] font-medium">+91 9812918237</div>
                        </div>
                        <button className="ml-auto">
                            <Pencil size={18} className="dark:text-[#999999]" />
                        </button>
                    </div>
                    {/* My Bookings */}
                    <div className='mt-4'>
                        <div className="flex flex-col gap-y-4">
                            <LineHeading title="My Bookings" />
                            <div className="menu flex flex-col gap-y-4 border border-[#E4E4E4] dark:border-[#555] bg-white dark:bg-[#292929] p-4 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <Link href="/table-booking" className="flex items-center gap-x-2">
                                        <div className="icon dark:hidden">
                                            <Image src="/images/icons/table-booking.svg" alt="table booking icon" height={24} width={24} />
                                        </div>
                                        <div className="icon hidden dark:block">
                                            <Image src="/images/icons/dark/table-booking.svg" alt="table booking icon" height={24} width={24} />
                                        </div>
                                        <div className="menu-label">
                                            <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Table Booking</p>
                                        </div>
                                    </Link>
                                    <ChevronRight className='dark:text-[#999999]' />
                                </div>
                                <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                                <div className="flex items-center justify-between">
                                    <Link href="/salon-booking" className="flex items-center gap-x-2">
                                        <div className="icon dark:hidden">
                                            <Image src="/images/icons/salon-booking.svg" alt="salon booking icon" height={24} width={24} />
                                        </div>
                                        <div className="icon hidden dark:block">
                                            <Image src="/images/icons/dark/salon-booking.svg" alt="salon booking icon" height={24} width={24} />
                                        </div>
                                        <div className="menu-label">
                                            <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Salon Booking</p>
                                        </div>
                                    </Link>
                                    <ChevronRight className='dark:text-[#999999]' />
                                </div>
                                <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                                <div className="flex items-center justify-between">
                                    <Link href="/event-booking" className="flex items-center gap-x-2">
                                        <div className="icon dark:hidden">
                                            <Image src="/images/icons/event-booking.svg" alt="event booking icon" height={24} width={24} />
                                        </div>
                                        <div className="icon hidden dark:block">
                                            <Image src="/images/icons/dark/event-booking.svg" alt="event booking icon" height={24} width={24} />
                                        </div>
                                        <div className="menu-label">
                                            <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Event Booking</p>
                                        </div>
                                    </Link>
                                    <ChevronRight className='dark:text-[#999999]' />
                                </div>
                                <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                                <div className="flex items-center justify-between">
                                    <Link href="/spa-booking" className="flex items-center gap-x-2">
                                        <div className="icon dark:hidden">
                                            <Image src="/images/icons/spa-booking.svg" alt="spa booking icon" height={24} width={24} />
                                        </div>
                                        <div className="icon hidden dark:block">
                                            <Image src="/images/icons/dark/spa-booking.svg" alt="spa booking icon" height={24} width={24} />
                                        </div>
                                        <div className="menu-label">
                                            <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Spa Booking</p>
                                        </div>
                                    </Link>
                                    <ChevronRight className='dark:text-[#999999]' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Rewards */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <LineHeading title="Rewards" />
                        <div className="menu flex flex-col gap-y-4 border border-[#E4E4E4] dark:border-[#555] bg-white dark:bg-[#292929] p-4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/scratch-cards.svg" alt="scratch card icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/scratch-card.svg" alt="scratch card icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Scratch Cards</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/cashbacks.svg" alt="cashback icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/cashback.svg" alt="cashback icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Cashbacks</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                        </div>
                    </div>
                    {/* Transactions */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <LineHeading title="Transactions" />
                        <div className="menu bg-white border border-[#E4E4E4] dark:border-[#555] dark:bg-[#292929] p-4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <Link href="/my-transaction" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/my-transaction.svg" alt="my transaction icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/transaction.svg" alt="my transaction icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">My Transactions</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                        </div>
                    </div>
                    {/* Manage */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <LineHeading title="Manage" />
                        <div className="menu border border-[#E4E4E4] dark:border-[#555] flex flex-col gap-y-4 bg-white dark:bg-[#292929] p-4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <Link href="/my-wishlist" className="flex items-center gap-x-2">
                                    <Heart className='dark:text-[#999] text-[#999]'/>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">My Wishlist</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between">
                                <Link href="/my-reviews" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/reviews.svg" alt="reviews icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/review-star.svg" alt="reviews icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Reviews</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowThemeSheet(true)}>
                                <div className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/theme.svg" alt="theme icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/theme.svg" alt="theme icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Theme</p>
                                    </div>
                                </div>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                        </div>
                    </div>
                    {/* Support */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <LineHeading title="Support" />
                        <div className="menu border border-[#E4E4E4] dark:border-[#555] flex flex-col gap-y-4 bg-white dark:bg-[#292929] p-4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <Link href="/faq" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/frequently-asked-question.svg" alt="faq icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/faq.svg" alt="faq icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Frequently Asked Questions</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between">
                                <Link href="/chat" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/chat.svg" alt="chat icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/chat.svg" alt="chat icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Chat With Us</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                        </div>
                    </div>
                    {/* More */}
                    <div className="flex flex-col gap-y-4 mt-8">
                        <LineHeading title="More" />
                        <div className="menu border border-[#E4E4E4] dark:border-[#555] flex flex-col gap-y-4 bg-white dark:bg-[#292929] p-4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <button
                                    className="flex items-center gap-x-2 w-full text-left bg-transparent"
                                    onClick={() => setShowAccountSetting(true)}
                                >
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/account-settings.svg" alt="account settings icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/account-settings.svg" alt="account settings icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Account Setting</p>
                                    </div>
                                </button>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between">
                                <Link href="/chat" className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/about-us.svg" alt="about icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/about.svg" alt="about icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">About us</p>
                                    </div>
                                </Link>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                            <hr className='border-0.5 border-[#E4E4E4] dark:border-[#555]' />
                            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowLogoutSheet(true)}>
                                <div className="flex items-center gap-x-2">
                                    <div className="icon dark:hidden">
                                        <Image src="/images/icons/logout.svg" alt="logout icon" height={24} width={24} />
                                    </div>
                                    <div className="icon hidden dark:block">
                                        <Image src="/images/icons/dark/logout.svg" alt="logout icon" height={24} width={24} />
                                    </div>
                                    <div className="menu-label">
                                        <p className="font-bold text-base text-[#555555] dark:text-[#999999]">Logout</p>
                                    </div>
                                </div>
                                <ChevronRight className='dark:text-[#999999]' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Theme Bottom Sheet (Mobile Only) */}
            {showThemeSheet && (
                <div className="fixed inset-0 z-[99999] lg:hidden">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#000]/30 transition-opacity duration-300" onClick={() => setShowThemeSheet(false)} />
                    {/* Bottom Sheet */}
                    <div className="fixed bottom-0 left-0 w-full bg-[#E4E4E4] dark:bg-[#1B1B1B] rounded-t-2xl shadow-2xl p-4 pb-6 animate-slideUp z-10" style={{ maxWidth: '480px', margin: '0 auto' }}>
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <button onClick={() => setShowThemeSheet(false)} className="p-1 -ml-2 text-[#000] dark:text-white"><ArrowLeft size={22} /></button>
                            <span className="font-bold text-lg text-[#000] dark:text-white">Switch Theme</span>
                        </div>
                        {/* Options */}
                        <div className="flex flex-col gap-3 dark:bg-[#1B1B1B]">
                            <button onClick={() => setSelectedTheme('light')} className={`flex items-center justify-between w-full rounded-xl px-4 py-4 text-left bg-[#292929] text-[#000] dark:text-white ${selectedTheme === 'light' ? 'bg-white dark:bg-[#292929]' : 'bg-white dark:bg-[#292929]'}`}>
                                <span className="text-base font-medium text-[#000] dark:text-white">Light Theme</span>
                                <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full border-gray-400">{selectedTheme === 'light' && <span className="w-3 h-3 dark:bg-white bg-[#292929] rounded-full block" />}</span>
                            </button>
                            <button onClick={() => setSelectedTheme('dark')} className={`flex items-center justify-between w-full rounded-xl px-4 py-4 text-left bg-[#292929] text-[#000] dark:text-white ${selectedTheme === 'dark' ? 'bg-white dark:bg-[#292929]' : 'bg-white dark:bg-[#292929]'}`}>
                                <span className="text-base font-medium text-[#000] dark:text-white">Dark Theme</span>
                                <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full border-gray-400">{selectedTheme === 'dark' && <span className="w-3 h-3 dark:bg-white bg-[#292929] rounded-full block" />}</span>
                            </button>
                            <button onClick={() => setSelectedTheme('system')} className={`flex items-center justify-between w-full rounded-xl px-4 py-4 text-left bg-[#292929] text-[#000] dark:text-white ${selectedTheme === 'system' ? 'bg-white dark:bg-[#292929]' : 'bg-white dark:bg-[#292929]'}`}>
                                <span className="text-base font-medium text-[#000] dark:text-white">Default to device theme</span>
                                <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full border-gray-400">{selectedTheme === 'system' && <span className="w-3 h-3 dark:bg-white bg-[#292929] rounded-full block" />}</span>
                            </button>
                        </div>
                        {/* Set Theme Button */}
                        <button className="w-full mt-6 bg-[#2563eb] text-white font-bold py-3 rounded-xl text-base"
                            onClick={() => {
                                try {
                                    localStorage.setItem('theme', selectedTheme);
                                    setTheme(selectedTheme);
                                    setShowThemeSheet(false);
                                } catch (error) {
                                    console.warn('Failed to save theme to localStorage:', error);
                                    setTheme(selectedTheme);
                                    setShowThemeSheet(false);
                                }
                            }}
                        >Set Theme</button>
                    </div>
                    <style>{`.animate-slideUp{animation:slideUpSheet .3s cubic-bezier(.4,0,.2,1);} @keyframes slideUpSheet{from{transform:translateY(100%);}to{transform:translateY(0);}}`}</style>
                </div>
            )}

            {/* Logout Bottom Sheet (Mobile Only) */}
            {showLogoutSheet && (
                <div className="fixed inset-0 z-[99999] lg:hidden">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#000]/70 transition-opacity duration-300" onClick={() => setShowLogoutSheet(false)} />
                    {/* Bottom Sheet */}
                    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1B1B1B] rounded-t-2xl shadow-2xl p-4 pb-6 animate-slideUp z-10" style={{ maxWidth: '480px', margin: '0 auto' }}>
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4 dark:text-white">
                            <button onClick={() => setShowLogoutSheet(false)} className="p-1 -ml-2"><ArrowLeft size={22} /></button>
                            <span className="font-bold text-lg">Log Out</span>
                        </div>
                        {/* Current Device */}
                        <div className="mb-2 text-sm font-bold text-[#555] dark:text-[#999]">Current Device</div>
                        <div className="rounded-xl bg-[#F5F6FA] dark:bg-[#292929] flex items-center justify-between px-4 py-5 mb-4">
                            <span className="text-base font-medium text-[#555] dark:text-[#E4E4E4]">Device Name</span>
                        </div>
                        {/* Other Devices */}
                        <div className="mb-2 text-sm font-bold text-[#555] dark:text-[#999]">Current Device</div>
                        <div className="flex flex-col gap-3 mb-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="rounded-xl bg-[#F5F6FA] dark:bg-[#292929] flex items-center justify-between px-4 py-5">
                                    <span className="text-base font-medium text-[#555] dark:text-[#E4E4E4]">Device Name</span>
                                    <button className="text-[#FF3B30] font-medium">Logout</button>
                                </div>
                            ))}
                        </div>
                        {/* Logout All Button */}
                        <button className="w-full mt-2 bg-[#FF3B30] text-white font-bold py-3 rounded-xl text-base">Logout Current Devices</button>
                    </div>
                    <style>{`.animate-slideUp{animation:slideUpSheet .3s cubic-bezier(.4,0,.2,1);} @keyframes slideUpSheet{from{transform:translateY(100%);}to{transform:translateY(0);}}`}</style>
                </div>
            )}

            <AccountSettingScreen isOpen={showAccountSetting} onClose={() => setShowAccountSetting(false)} />
        </>
    )
}

export default ShowMeScreen
