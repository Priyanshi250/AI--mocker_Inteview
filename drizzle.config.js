/** @type {import('drizzle-kit').Config} */
export default {
    schema: "./utils/schema.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    },
};