import { useState, useEffect } from 'react';

const useFormattedTime = (timestamp) => {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const formatTime = () => {
            const date = new Date(timestamp);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) {
                // return `${diffInSeconds} giây trước`;
                return `Vừa xong`;
            } else if (diffInSeconds < 3600) {
                return `${Math.floor(diffInSeconds / 60)} phút trước`;
            } else if (diffInSeconds < 86400 && date.getDate() === now.getDate()) {
                return `${Math.floor(diffInSeconds / 3600)} tiếng trước`;
            } else {
                return date.toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
            }
        };

        setFormattedTime(formatTime());

        // Cập nhật mỗi phút để làm mới dữ liệu
        const interval = setInterval(() => {
            setFormattedTime(formatTime());
        }, 60000);

        return () => clearInterval(interval);
    }, [timestamp]);

    return formattedTime;
};
export default useFormattedTime;
