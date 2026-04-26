// export const BASEAPI = 'http://localhost:3001/api/v1/algocrush'
export const BASEAPI ='https://algocrush-node.onrender.com/api/v1/algocrush'


// Onboarding module 
export const GET_ROLES = '/get-roles';
export const GET_DOMAINS = '/get-domains';
export const GET_SKILLS_BY_DOMAIN ='/get-skill-by-domian';
export const GET_LOOKING_FOR ='/get-looking-for'
export const GET_BUILD_TYPES ='/get-build-types'
export  const REGISTER_USER = `${BASEAPI}/register-user`
export const AUTH_ME = `${BASEAPI}/auth/me`
export const UPDATE_USER = '/update-user'