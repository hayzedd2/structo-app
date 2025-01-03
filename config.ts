const config = {
  development: {
    apiUrl: "http://localhost:8080",
  },
  production: {
    apiUrl: "https://structo.onrender.com",
  },
};

const environment = process.env.NODE_ENV || "development";
export const apiUrl = config[environment as keyof typeof config].apiUrl;