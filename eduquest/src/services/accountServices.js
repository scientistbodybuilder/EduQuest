import axios from "axios"

export const getResults = async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/results/all', { userId: id})
        if (response.status >= 200 && response.status < 300) {
            const results = response.data.resultsList
            console.log('results: ',results)
            return results
        }
        return null
    } catch (err) {
        console.log('Axios error getting results: ',err)
        return null
    }
}