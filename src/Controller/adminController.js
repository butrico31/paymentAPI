const User = require("../Model/model");


const allUsers = async (req, res) =>{

    try {
        const all = await User.find();
        return res.status(200).send(all);
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    allUsers
}