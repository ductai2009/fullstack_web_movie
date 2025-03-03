// ScrollToTopButton.js
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-20 right-20 p-4 hover:opacity-90 animate-scaleIn rounded-full bg-blue-500 text-white shadow-lg transition-opacity ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <ArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
