const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogoutController = async (req, res) => {
    if (req.body.username) {
        try {
            updatedUser = await User.updateOne({ username: req.body.username }, { logged_in: false });
            res.status(200).json({
                success: true,
                status: 200,
                message: "successfully logged out",
            });
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
    else {
        res.status(400).send('username is required');
    }

}

const userRegisterController = async (req, res) => {
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
        return res.status(400).send('username already registered');
    }
    try {
        if (req.body.password && req.body.password !== '') {
            const hashedPassword = await bcrypt.hash(
                req.body.password,
                await bcrypt.genSalt(10)
            );
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });

            const savedUser = await user.save();

            const authToken = jwt.sign(
                { username: savedUser.username },
                process.env.JWT_SECRET,
                {}
            );

            res.status(200).json({
                message: "user registered successfully",
                token: authToken
            });
        } else {
            res.status(400).send('password is required');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const userLoginController = async (req, res) => {
    if (req.body.username === '') {
        return res.status(400).send('username is required');
    }
    if (req.body.password === '') {
        return res.status(400).send('password is required');
    }
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send('username is not registered');
        }

        if (req.body.password && req.body.username) {
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPass) {
                return res.status(400).send('Wrong password');
            }
            const authToken = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET,
                {}
            );
            updatedUser = await user.updateOne({ username: req.body.username }, { logged_in: true });
            res.json({
                success: true,
                status: 200,
                message: "Login successfull.",
                token: authToken,
                last_login: user.last_login,
                organization: user.organization,
                designation: user.designation,
                timestamp: new Date().getTime()
            });
        } else {
            if (!req.body.password) {
                res.status(400).send('password is required');
            } else {
                res.status(400).send('username is required');
            }
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports = { userLoginController, userLogoutController, userRegisterController }