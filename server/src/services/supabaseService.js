import supabase from '../config/supabaseClient.js';

export async function createUserProfile(user) {

    const { id, email, user_metadata} = user;

    const { data, error } = await supabase.auth.admin.getUserById(user.sub);
    if (error) throw error;

    const createdAt = data.user.created_at;
    
    const { data: newUser, error: findError } = await supabase
        .from('profiles')
        .insert({
            id,
            email,
            full_name: user_metadata.full_name,
            created_at: createdAt,
        });

    if (findError) {
        throw findError;
    }
    return newUser;
};

// export async function setUserName(userUid, fullName) {
//     const { data, error } = await supabase
//         .from('profiles')
//         .update({ full_name: fullName })
//         .eq('id', userUid)
//         .select() // to return updated row
//         .single();

//     if (error) {
//         throw error;
//     }
//     return data;
// }

// export async function getUserByUid(userUid) {
//     const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userUid)
//         .single();

//     if (error) {
//         throw error;
//     }
//     return data;
// }

// export async function updateUserByUid(userUid, userData) {
//     const { data, error } = await supabase
//         .from('profiles')
//         .update(userData)
//         .eq('id', userUid)
//         .select() // to return updated row
//         .single();

//     if (error) {
//         throw error;
//     }
//     return data;
// }