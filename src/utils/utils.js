export const freeze = (payload) => {
    return JSON.parse(JSON.stringify(payload))
}