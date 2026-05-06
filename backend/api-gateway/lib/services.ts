// All the backend working services with their urls
// are added in here. These are used by api-gateway
// to re-route request to the target host

export const SERVICE_MAP = {
    auth: "http://user-service:3000",
    users: "http://user-service:3000",
    ai: "http://ai-service:3000",
    orders: "http://localhost:3000",
    inventory: "http://localhost:3000",
} as const;