import axiosWithAuth from '../utils/axiosWithAuth'

const fetchColors = () => {
    return axiosWithAuth()
            .get(`/colors`)
            .then(res => {
                return res
            })
            .catch(err => {
                console.log(err)
                return err
            })
}

export default fetchColors