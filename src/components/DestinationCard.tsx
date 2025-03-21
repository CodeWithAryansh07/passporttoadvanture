/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Star, Clock, Calendar } from "lucide-react";

export interface DestinationPoint {
    name: string;
    image: string;
    category: string;
    description: string;
    rating: number;
    duration: string;
    bestTimeToVisit: string;
}


const DestinationCard = ({ point }: { point: DestinationPoint }) => {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={point.image}
                    alt={point.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                        {point.category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {point.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {point.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{point.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{point.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{point.bestTimeToVisit}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
