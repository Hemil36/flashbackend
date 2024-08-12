import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully', user_id: data[0].id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await findUserByEmail(email);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userID: user.user_id, name: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5s' }
    );

    const refreshToken = jwt.sign(
      { userID: user.user_id, name: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({ accessToken, message: 'Login successful', user_id: user.user_id });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Refresh token invalid' });

      const accessToken = jwt.sign(
        { user: decoded.user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5s' }
      );
      res.json({ accessToken });
    }
  );
};

export const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
};
