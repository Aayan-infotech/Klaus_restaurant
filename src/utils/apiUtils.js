export const apiUrl = (endpoint) => {
    const baseUrl = process.env.KLAUS_WEB_API_BASE_URL;
    return `${baseUrl}/${endpoint}`;
};
