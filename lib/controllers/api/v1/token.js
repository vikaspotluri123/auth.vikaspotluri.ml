const VALID_TOKEN = /^[a-z\d]{128}$/;
const {v1: api} = require('../../../api/index.js');
const {jsonResponse} = require('../../../utils/index.js');

module.exports = async function swapTokenForCookie(req, res, next) {
	const {token} = req.params;

	if (!VALID_TOKEN.test(token)) {
		return jsonResponse.badRequest(null, res, null, 'Invalid token');
	}

	const cookie = await api.token.trade(token);

	if (cookie) {
		return res.status(200).json({
			type: 'token',
			message: 'token successfully swapped',
			cookie,
			code: 200
		});
	}

	next();
};
