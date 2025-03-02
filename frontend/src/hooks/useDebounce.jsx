import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeDebounce = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeDebounce);
    }, [value]);
    return debouncedValue;
}

export default useDebounce;
