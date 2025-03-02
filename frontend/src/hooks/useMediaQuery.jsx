import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const handleChange = () => setMatches(mediaQueryList.matches);

        // Đặt giá trị ban đầu
        handleChange();

        // Lắng nghe sự thay đổi
        mediaQueryList.addEventListener('change', handleChange);

        // Cleanup khi component unmount
        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;
