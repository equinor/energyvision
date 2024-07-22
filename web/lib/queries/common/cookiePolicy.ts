export const cookiePolicyQuery = /* groq */ `
"cookiePolicy": coalesce(select(count(cookiePolicy) != null => cookiePolicy,[cookiePolicy]), ['none'])`
