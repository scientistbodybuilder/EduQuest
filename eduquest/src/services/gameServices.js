import axios from "axios"
const API_URL = process.env.API_URL || 'http://localhost:4000'

export const getQuestions = async (quizId) => {
    try {
        const response = await axios.get(`${API_URL}/api/questions/${quizId}`)
        if (response.status >= 200 && response.status < 300) {
            console.log('successfully got questions: ',response.data.questions)
            return response.data.questions
        }
    } catch (err) {
        console.error('Error getting questions for game: ', err)
        return null
    }
}

export const submitResults = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/results/save`, data)
        if (response.status >= 200 && response.status < 300) {
            console.log('results submitted')
            return { success: true }
        } else {
            console.log('Results Submission Unsuccessfull')
            return { success : false }
        }
    } catch (err) {
        console.error('Error submitting results')
        return { success:  false }
    }
}