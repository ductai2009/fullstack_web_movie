import request, { request_local } from '../utils/httpRequest';

const apiHome = async (link = '/v1/api/home', params = {}) => {
    try {
        const result = await request.get(link, {
            params: params,
        });
        return result.data;
    } catch (error) {
        console.error('Error call api search:', error);
    }
};

export const apiPostService = async (link = '', params = {}, data = {}) => {
    try {
        const result = await request_local.post(link, data, {
            params,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return result.data;
    } catch (error) {
        console.error('Error call api apiPostService:', error.response ? error.response.data : error.message);
        if (error.response.data) return error.response.data;
        throw error;
    }
};
export const apiGetAuth = async (link = '', params = {}) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Nếu cần gửi cookie
        };

        // Nếu có params thì thêm vào request
        if (params && Object.keys(params).length > 0) {
            config.params = params;
        }

        const result = await request_local.get(link, config);
        return result.data;
    } catch (error) {
        console.error('Error in apiGetAuth:', error.response?.data || error.message || 'Unknown error');
        throw error;
    }
};

export const apiDeleteService = async (link = '', params = {}, data = {}) => {
    try {
        const config = {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Nếu cần gửi cookie
        };

        // Nếu có params thì thêm vào request
        if (params && Object.keys(params).length > 0) {
            config.params = params;
        }

        const result = await request_local.delete(link, config);
        return result.data;
    } catch (error) {
        console.error('Error in apiGetAuth:', error.response?.data || error.message || 'Unknown error');
        throw error;
    }
};
export const apiPutService = async (link = '', params = {}, data = {}) => {
    try {
        const result = await request_local.put(link, data, {
            params,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return result.data;
    } catch (error) {
        console.error('Error call api apiPutService:', error.response ? error.response.data : error.message);
        if (error.response.data) return error.response.data;
        throw error;
    }
};

export default apiHome;
