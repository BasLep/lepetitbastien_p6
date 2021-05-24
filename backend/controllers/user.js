require("dotenv").config();
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
	// create new account
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash
			});
			user.save()
				.then(() => res.status(201).json({ message: "Utilisateur créé" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error })); // 500 = server error
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email }) // find one user
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé" });
			}
			bcrypt
				.compare(req.body.password, user.password) // try to compare password
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect" });
					}
					res.status(200).json({
						userId: user._id,
						token: jwtoken.sign(
							{ userId: user._id },
							process.env.ACCESS_TOKEN_SECRET, // creation of token
							{ expiresIn: "24h" } // life during of token
						)
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
