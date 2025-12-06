import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true, // HTTPS only in production
        sameSite: 'none',
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });
};
