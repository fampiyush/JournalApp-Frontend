export default(api) => {
    const loginUrl = '/users/login'
    const signUpUrl = '/users/register'

    const getAuthAxiosConfig = () => {
        return {
            headers: {
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

    return {loginUser, registerUser}
}