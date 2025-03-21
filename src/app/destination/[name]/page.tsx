/* eslint-disable @next/next/no-img-element */
"use client"

import React,{ useState } from "react";
import { destinations } from "@/constants";
import { Filter } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";
// import { useRouter } from "next/navigation";

const categories = [
    "All",
    "Historical",
    "Religious",
    "Nature",
    "Adventure",
    "Cultural",
];

const Destination = ({ params }) => {

    // const router = useRouter();

    const { name } = React.use(params) as { name: string };
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<"rating" | "duration">("rating");

    const destination = destinations.find(
        (dest) => dest.link === `/${name}`
    );

    const filteredPoints = destination?.touristPoints
        ?.filter(
            (point) => selectedCategory === "All" || point.category === selectedCategory
        )
        .sort((a, b) =>
            sortBy === "rating" ? b.rating - a.rating : a.duration.localeCompare(b.duration)
        );

    return (
        <div>
            {destination ? (
                <div className="w-full min-h-screen">
                    {/* Hero Section */}
                    <div className="relative w-full h-[60vh]">
                        <img
                            src={destination.image}
                            className="w-full h-full object-cover"
                            alt={destination.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <h1 className="text-white text-5xl font-bold mb-4">
                                    {destination.name}
                                </h1>
                                <p className="text-white/90 text-xl max-w-3xl">
                                    {destination.description ||
                                        "Discover the beauty and culture of this amazing destination."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto py-8">
                        <div className="flex gap-8">
                            {/* Sidebar Filters */}
                            <div className="w-64 flex-shrink-0">
                                <div className="bg-white rounded-lg shadow-lg py-6 px-4 sticky top-8">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Filter className="w-5 h-5" />
                                        <h2 className="text-lg font-semibold">Filters</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">Categories</h3>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => setSelectedCategory(category)}
                                                        className={`block w-full cursor-pointer text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                                                            ? "bg-blue-500 text-white"
                                                            : "hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2">Sort By</h3>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => setSortBy("rating")}
                                                    className={`block w-full cursor-pointer text-left px-3 py-2 rounded-md transition-colors ${sortBy === "rating"
                                                        ? "bg-blue-500 text-white"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    Rating
                                                </button>
                                                <button
                                                    onClick={() => setSortBy("duration")}
                                                    className={`block w-full cursor-pointer text-left px-3 py-2 rounded-md transition-colors ${sortBy === "duration"
                                                        ? "bg-blue-500 text-white"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    Duration
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tourist Points Grid */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredPoints?.map((point) => (
                                        <DestinationCard key={point.name} point={point} />
                                    ))}
                                </div>

                                {(!destination.touristPoints ||
                                    destination.touristPoints.length === 0) && (
                                        <div className="text-center py-12">
                                            <p className="text-gray-500">
                                                Tourist points information coming soon!
                                            </p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl text-gray-600">Destination not found</h1>
                </div>
            )}
        </div>
    );
};

export default Destination;
