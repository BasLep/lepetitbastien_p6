const jwtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable";
		} else {
			req.body.userIdFromToken = userId;
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée" });
	}
};
