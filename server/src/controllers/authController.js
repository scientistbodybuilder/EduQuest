import { createUserProfile } from '../services/supabaseService.js';

export const handleLogin = async (req, res) => {
  try {
    const user = req.user; // from authMiddleware
    console.log(user);
    const { id, email, user_metadata } = user;

    // Check if user already exists
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (findError && findError.code !== "PGRST116") throw findError;

    // if first time logging in, create profile in "profiles" table
    if (!existingUser) {
      // First login → create profile
      await createUserProfile(user); // need to make {id, full_name, email, created_at}
    
      console.log("✅ New user added:", email);
    }

    res.json({ message: "User verified", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to handle login" });
  }
};