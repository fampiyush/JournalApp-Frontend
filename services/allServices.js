import authApi from './authApi'
import collectionApi from './collectionApi';
import service from './ApiService'

const authService = authApi(service);
const collectionService = collectionApi(service)

export {authService, collectionService}