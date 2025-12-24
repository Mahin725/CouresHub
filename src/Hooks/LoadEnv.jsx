const LoadEnv = () => {
    return {
        BASE_URL: import.meta.env.VITE_API_BASE_URL,
    };
};

export default LoadEnv;
