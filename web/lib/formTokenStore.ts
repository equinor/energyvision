import { getAccessToken } from '@/lib/actions/getAccessToken'

let storedToken: string | null = null
let expiresAt: number | null = null

export default async function getToken(): Promise<string> {
    const now = Date.now()

    // If token exists and not expired
    if (storedToken && expiresAt && now < expiresAt) {
        return storedToken
    }
    
    // Otherwise call getAccessToken to refresh token
    const { token, expires_in } = await getAccessToken()

    storedToken = token

    // expiryTime is in seconds - convert to milliseconds
    expiresAt = now + expires_in * 1000

    return storedToken
}