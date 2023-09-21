export default (api) => {

    const uploadUrl = '/slide/upload'
    const getAllUrl = '/slide/getall'
    const deleteSlideUrl = '/slide/delete'

    const getAuthAxiosConfig = (token) => {
        return {
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "application/x-www-form-urlencoded",
                },
        }
    }

    const uploadSlide = (token,data) => {
        return api.post(
            uploadUrl,
            data,
            getAuthAxiosConfig(token)
        )
    }

    const getAllSlide = (token, data) => {
        return api.post(
            getAllUrl,
            data,
            getAuthAxiosConfig(token)
        )
    }

    const deleteSlide = (token, data) => {
        return api.post(
            deleteSlideUrl,
            data,
            getAuthAxiosConfig(token)
        )
    }

    return {uploadSlide, getAllSlide, deleteSlide}
}