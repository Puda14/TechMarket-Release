const register = require("../services/RegisterService");
const Joi = require("joi");
const genAuthToken = require("../utils/genAuthToken");
const cloudinary = require("../utils/cloudinary");

exports.registerUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        phone: Joi.string().min(9).max(22).required(),
        avatar: Joi.required()
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    try {
        let userInDB = await register.registerFindUser(req.body.email);

        if (userInDB) return res.status(400).send("User already exists...");
        else {
            // const avatar_default = "https://res.cloudinary.com/dlgyapagf/image/upload/v1712984661/TechMarket-User/avatar_default/avatar-default_l2kmh0.jpg";
            const uploadedResponse = await cloudinary.uploader.upload(req.body.avatar, {
                upload_preset: "TechMarket-User",
            });

            if (!uploadedResponse) {
                throw new Error("Error: can't upload image to cloudinary");
            }

            req.body.avatar = uploadedResponse;
        }

        const user = await register.registerUser(req.body);

        const token = genAuthToken(user);

        res.status(200).send(token);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
