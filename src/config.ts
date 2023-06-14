const isProductionEnv = process.env.NODE_ENV === "production"

const config = {
    corsUrl: isProductionEnv ? "https://cors.zenno.moe" : "http://localhost:8000",
    isProductionEnv,
}

export default config