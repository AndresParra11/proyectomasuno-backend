var requestify = require('requestify');

const config = require('../configs/config'),

getEvents = async (req, res) => {
    console.log("config ",config.kollacodeKey);
    await requestify.get(`${config.kollacodeAPI}getEvent?id=${req.params.id}&apiKey=${config.kollacodeKey}`).then(function (response) {
        const return_response = response.getBody();
        if (return_response.error) {
            return res.status(400).json({ success: false, error: return_response.error })
        }
        return res.status(200).json({ success: true, data: return_response})
    }).catch(err => {return res
        .status(404)
        .json({ success: false, error: err.body })})
}

module.exports = {
    getEvents
}