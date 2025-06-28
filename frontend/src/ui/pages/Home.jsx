import React from 'react';
import {Link} from 'react-router-dom';
import PathDrawing from '../components/animations/PathDrawing';

const Home = () => {
    return (
        <div className="h-[90vh]  flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 md:px-16">

            {/* Left: Hero */}
            <div className="text-center md:text-left md:w-1/2 max-w-xl space-y-4">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    Welcome to <span className="text-amber-700">DayStride</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Track your goals, master your habits, and stay on top of your day with elegance.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-block bg-amber-700 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-amber-800 transition-all duration-200"
                >
                    Get Started
                </Link>
            </div>

            {/* Right: Animation */}
            <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
                <div className="rounded-3xl shadow-xl bg-white/50 p-6 scale-75">
                    <PathDrawing/>
                </div>
            </div>
        </div>
    );
};

export default Home;
