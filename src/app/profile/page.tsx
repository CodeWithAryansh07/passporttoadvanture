/* eslint-disable @next/next/no-img-element */
// import ProfileNavbar from '@/components/ProfileNavbar'
import DestinationCard from '@/components/DestinationCard'
import ProfileNavbar from '@/components/ProfileNavbar'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
// import Image from 'next/image'

const page = () => {

    const upcomingBookings = [
        {
            name: "Radhanagar Beach",
            description: "One of the most beautiful beaches in Asia, known for its white sand and turquoise waters.",
            image: "/assets/Radhanagar-Beach.jpg",
            category: "Nature",
            bestTimeToVisit: "October to May",
            duration: "2-3 hours",
            rating: 4.5
        },
        {
            name: "Port Blair",
            description: "The capital city of the Andaman and Nicobar Islands, known for its colonial history and natural beauty.",
            image: "/assets/Port-Blair.jpg",
            category: "Cultural",
            bestTimeToVisit: "Year-round",
            duration: "2-3 hours",
            rating: 4.6
        }
    ]

    const ProfileInfoCard = ({ title, value }: { title: string; value: string }) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-gray-600 text-sm mb-2">{title}</h2>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <Link href="/profile/bookings" className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                See all
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );

    return (
        <>
            <ProfileNavbar />
            <div className="min-h-screen bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Profile Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-50">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full ring-2 ring-white" />
                            </div>
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileInfoCard title="Username" value="John Doe" />
                                    <ProfileInfoCard title="Email" value="L8a8K@example.com" />
                                    <ProfileInfoCard
                                        title="Last Trip"
                                        value="Andaman and Nicobar Islands"
                                    />
                                    <ProfileInfoCard
                                        title="Upcoming Trip"
                                        value="Andaman and Nicobar Islands"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Bookings Section */}
                    <section className="mb-12">
                        <SectionHeader title="Upcoming Bookings" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingBookings.map((booking, index) => (
                                <DestinationCard key={index} point={booking} />
                            ))}
                        </div>
                    </section>

                    {/* Past Bookings Section */}
                    <section>
                        <SectionHeader title="Past Bookings" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {upcomingBookings.map((booking, index) => (
                                <DestinationCard key={index} point={booking} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default page