import axios from "axios"

export const uploadNote = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/create', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        })
        if (response.status >= 200 && response.status < 300) {
            console.log('upload success')
            console.log('response: ',response.data)
            return { success: true }
        }
        return { success: false }
    } catch (err) {
        console.log('Error in upload service: ',err)
        return { success: false}
    }
}