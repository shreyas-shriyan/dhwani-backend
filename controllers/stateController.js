const mongoose = require("mongoose");
const request = require("request");
const dotenv = require("dotenv");
const state = require('../models/state');

dotenv.config()


const getStateController = async (req, res) => {

    try {
        const states = await state.find()

        res.json({
            success: true,
            status: 200,
            message: 'State detail',
            timestamp: new Date().getTime(),
            state: states,
        })
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const postStateController = async (req, res) => {
    console.log("entered post request");
    if (req.body.state_name) {
        try {
            const temp = new state({
                state_name: req.body.state_name,
            })

            const savedState = await temp.save()
            const states = await state.find()

            res.json({
                success: true,
                status: 200,
                message: 'State detail',
                timestamp: new Date().getTime(),
                state: states,
            })
        }
        catch (err) {
            return res.status(400).send(err.message)
        }
    }
    else {
        res.json({ error: 'state_name is required in request body' })
    }
}

module.exports = { getStateController, postStateController }