const isProductionEnv = process.env.NODE_ENV === "production"

const config = {
    corsUrl: isProductionEnv ? "https://cors.zenno.moe" : "https://cors.zenno.moe",
    isProductionEnv,
}

export default config