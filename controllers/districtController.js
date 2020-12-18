const district = require('../models/district');

const getDistrictController = async (req, res) => {
    let state_id = req.query.state_id;
    try {
        const districts = await district.find({ state_id: state_id })

        res.json({
            success: true,
            status: 200,
            message: 'District Details',
            timestamp: new Date().getTime(),
            district: districts,
        })
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const postDistrictController = async (req, res) => {
    let body = req.body
    if (body.state_id && body.district_name) {
        try {
            const temp = new district({
                district_name: body.district_name,
                state_id: body.state_id
            })

            const savedDistrict = await temp.save()

            res.json({
                success: true,
                status: 200,
                message: 'Operation performed successfully',
            })
        }
        catch (err) {
            return res.status(400).send(err.message)
        }
    }
    else {
        if (!body.state_id) {
            res.json({ error: 'state_id is required' })
        }
        else {
            res.json({ error: 'district_name is required' })
        }
    }
}

module.exports = { getDistrictController, postDistrictController }