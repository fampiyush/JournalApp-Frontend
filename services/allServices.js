import authApi from './authApi'
import collectionApi from './collectionApi';
import slideApi from './slideApi';
import service from './ApiService'

const authService = authApi(service);
const collectionService = collectionApi(service)
const slideService = slideApi(service)

export {authService, collectionService, slideService}