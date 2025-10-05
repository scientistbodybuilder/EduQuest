// // userController.js handles custom user data (game related not from oauth)
// import { getUserByUid, updateUserByUid } from '../services/supabaseService.js';

// export async function getUserData(req, res) {
//     // call service function to get user data
//     try {
//         const userData = await getUserByUid(req.user.sub);

//         if (!userData) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(userData);
//     } 
//     catch (error) {
//         console.error("Error getting user profile:", error.message);
//         res.status(500).json({ error: "Failed to get user profile" });
//     }

// }

// export async function updateUserData(req, res) {
//     try {
//         const { body } = req;
//         const updatedUser = await updateUserByUid(req.user.sub, body);
//         if (!updatedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(updatedUser);
//     }
//     catch (error) {
//         console.error("Error updating user profile:", error.message);
//         res.status(500).json({ error: "Failed to update user profile" });
//     }
    

// }


