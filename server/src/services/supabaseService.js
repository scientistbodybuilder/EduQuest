import { supabase } from "../config/supabaseClient.js";

export async function createQuiz(quizRow) {
const { data, error } = await supabase
    .from("quizzes")
    .insert([quizRow])
    .select()
    .single();
if (error) throw error;
return data;
}

export async function getQuizByUuid(uuid) {
const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("quiz_uuid", uuid)
    .single();
if (error) throw error;
return data;
}

export async function listUserQuizzes(user_id) {
const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
if (error) throw error;
return data;
}

export async function submitQuizResults(resultRow) {
const { data, error } = await supabase
    .from("results")
    .insert([resultRow])
    .select()
    .single();
if (error) throw error;
return data;
}

export async function insertQuestions(questionRows) {
    console.log('quesions array: ',questionRows)
    const { data, error } = await supabase
        .from("questions")
        .insert(questionRows)
        .select();
    if (error) {
        console.log('Error uploading the quiz questions: ',error)
        throw error;
    }
    return data;
}

export async function getQuestionsByQuizUuid(quiz_uuid) {
const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_uuid", quiz_uuid);
if (error) throw error;
return data;
}

export async function insertResult(resultRow) {
const { data, error } = await supabase
    .from("results")
    .insert([resultRow])
    .select()
    .single();
if (error) throw error;
return data;
}

export async function getResultsByQuizUuid(quiz_uuid) {
const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("quiz_uuid", quiz_uuid);
if (error) throw error;
return data;
}

export async function getUserByUid(userUid) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userUid)
        .single();

    if (error) {
        throw error;
    }
    return data;
}

export async function updateUserByUid(userUid, userData) {
    const { data, error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', userUid)
        .select() // to return updated row
        .single();

    if (error) {
        throw error;
    }
    return data;
}