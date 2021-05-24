const Sauce = require("../models/Sauce");

module.exports = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		if (req.body.userIdFromToken !== sauce.userId) {
			return res.status(403).json({ message: "Requête non authentifiée" });
		} else {
			next();
		}
	});
};
