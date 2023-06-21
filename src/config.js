import dotenv from "dotenv";

dotenv.config(); // it loads the defined variables from .env

export const env = process.env.NODE_ENV || "development";

export const DB_HOST = process.env.DB_HOST || "127.0.0.1";
export const DB_NAME = process.env.DB_NAME || "adeodist_assignment";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Vip@6783";
export const USE_SSL = process.env.USE_SSL || true;
export const dbDialect = "mysql";
export const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

export const dbConnectionPool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

export const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY || "sdcnkjszcnkzdcnjzcjj";
  export const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || "uytrkjszcnkzdchgfdjj";
export const TOKEN_HEADER_KEY = process.env.JWT_SECRET_KEY || "authorization";
export const ACCESS_TOKEN_EXPIRY_IN_MIN =
  process.env.ACCESS_TOKEN_EXPIRY_IN_MIN || "10m";
export const REFRESH_TOKEN_EXPIRY_IN_MIN =
  process.env.REFRESH_TOKEN_EXPIRY_IN_MIN || "15m";
