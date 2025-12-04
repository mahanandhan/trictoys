import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // HTTPS only in production
        sameSite: 'lax',
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });
};
