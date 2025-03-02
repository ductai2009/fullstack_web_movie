import { useNavigate } from 'react-router-dom';

// Custom hook
export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (route, state) => {
        navigate(route, { state });
    };

    return customNavigate;
};
