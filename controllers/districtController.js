const child = require('../models/child');

const getDistrictController = async (req, res) => {

    try {
        const children = await child.find()

        res.json({
            success: true,
            status: 200,
            message: 'Children details',
            timestamp: new Date().getTime(),
            children_profile: children,
        })
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const postChildController = async (req, res) => {
    let body = req.body
    if (body.name && body.district_id) {
        try {
            const temp = new child({
                name: body.name,
                sex: body.sex ? body.sex : "",
                dob: body.dob ? body.dob : "",
                father_name: body.father_name ? body.father_name : "",
                mother_name: body.mother_name ? body.mother_name : "",
                district_id: body.district_id,
                photo: body.photo ? body.photo : "",
            })

            const savedChild = await temp.save()
            const children = await child.find()

            res.json({
                success: true,
                status: 200,
                message: 'State detail',
                timestamp: new Date().getTime(),
                children_profile: children,
            })
        }
        catch (err) {
            return res.status(400).send(err.message)
        }
    }
    else {
        if (!body.name) {
            res.json({ error: 'name is required' })
        }
        else {
            res.json({ error: 'district_id is required' })
        }
    }
}

module.exports = { getChildController, postChildController }