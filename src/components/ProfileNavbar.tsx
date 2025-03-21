import Link from 'next/link'
import React from 'react'

const ProfileNavbar = () => {
    return (
        <div className='flex items-center justify-between py-10 '>
            <div></div>
            <div className='flex items-center px-10 text-lg font-bold'>
                <Link href="/profile" className='text-gray-600 hover:text-blue-600 transition-colors font-medium mr-6'>
                    Profile
                </Link>
                <Link href="/profile/bookings" className='text-gray-600 hover:text-blue-600 transition-colors  font-medium mr-6'>
                    Bookings
                </Link>
                <Link href="/profile/wishlist" className='text-gray-600 hover:text-blue-600 transition-colors font-medium mr-6'>
                    WishList
                </Link>
                <Link href="/profile/cart" className='text-gray-600 hover:text-blue-600 transition-colors font-medium mr-6'>
                    Cart
                </Link>
                {/* <Link href="/profile/settings" className='text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium mr-6'>
                    Settings
                </Link> */}
            </div>
        </div>
    )
}

export default ProfileNavbar