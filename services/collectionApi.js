export default (api) => {

    const uploadUrl = '/collection/upload'
    const getAllUrl = '/collection/getall'
    const deleteCollectionUrl = '/collection/delete'

    const getAuthAxiosConfig = (token) => {
        return {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "application/x-www-form-urlencoded",
                },
        }
    }

    const uploadCollection = (token,data) => {
        return api.post(
            uploadUrl,
            data,
            getAuthAxiosConfig(token)
        )
    }

    const getAllCollection = (token) => {
        return api.get(
            getAllUrl,
            getAuthAxiosConfig(token)
        )
    }

    const deleteCollection = (token, data) => {
        return api.post(
            deleteCollectionUrl,
            data,
            getAuthAxiosConfig(token)
        )
    }

    return {uploadCollection, getAllCollection, deleteCollection}
}