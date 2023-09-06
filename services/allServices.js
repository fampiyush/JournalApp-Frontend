import authApi from './authApi'
import service from './ApiService'

const authService = authApi(service);

export {authService}