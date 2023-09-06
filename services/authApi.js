export default (api) => {
    
    const loginUrl = '/users/login'
    const signUpUrl = '/users/register'
    const getUserUrl = '/users/me'


    const getAuthAxiosConfig = (token) => {
        return {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "application/x-www-form-urlencoded",
                },
        }
    }

    const loginUser = (data) => {
        return api.post(
            loginUrl,
            data,
            getAuthAxiosConfig()
        )
    }

    const registerUser = (data) => {
        return api.post(
            signUpUrl,
            data,
            getAuthAxiosConfig()
        )
    }

    const getUser = (token) => {
        return api.get(
            getUserUrl,
            getAuthAxiosConfig(token)
        )
    }

    return {loginUser, registerUser, getUser}
}