import DestinationCard from '@/components/DestinationCard'
import ProfileNavbar from '@/components/ProfileNavbar'
import React from 'react'

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

    return (
        <>
            <ProfileNavbar />
            <div className='px-20 text-3xl font-bold'>
                <h1>All Bookings</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20 py-10">
                {upcomingBookings.map((booking, index) => (
                    <DestinationCard key={index} point={booking} />
                ))}
            </div>
        </>
    )
}

export default page