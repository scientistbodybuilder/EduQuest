import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'

export const getQuizzes = async (id) => {
    try {   
        const response = await axios.post(`${API_URL}/api/getQuizzes`, { userId: id})
        if (response.status >= 200 && response.status < 300) {
            const data = response.data
            console.log('quiz data: ', data.quizzes)
            return data.quizzes
        } else {
            return null
        }
    } catch (err) {
        console.log('Error getting quizzes for user: ',err)
        return null
    }
}