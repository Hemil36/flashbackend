import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { createUser, findUserByEmail } from '../backend/models/User.js';
import supabase from "./config/db.js";


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userID: user.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5s' }
    );
    const refreshToken = jwt.sign(
      { userID: user.user_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ accessToken, user_id: user.user_id });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Unexpected error during login' });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();  

    

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create the new user
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ username, email, password_hash: hashedPassword }]);

    if (insertError) {
      console.error('Error creating user:', insertError);
      return res.status(500).json({ error: 'Error registering user' });
    }

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return res.status(500).json({ error: 'Unexpected error during registration' });
  }
};
   


 export   const handleRefreshToken = async (req, res) => {
    
        const cookies = req.cookies;
        // console.log(cookies)
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;
    

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                // console.log(decoded)
                if(err) return res.status(402).json({message : "Refresh token Invalid"});
                
                const accessToken = jwt.sign(
                    { user: decoded.user },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5s' }
                );
                res.json({ accessToken })
            }
        );
    }

    export const logout = async (req, res) => {
        res.clearCookie('jwt');
        res.json({ message: 'Logged out' });
    }
    
    export default  handleRefreshToken 