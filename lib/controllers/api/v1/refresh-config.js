const api = require('../../../api/v1');
const config = require('../../../config');
const {jsonResponse} = require('../../../utils');

module.exports = function refreshConfigIfAllowed(req, res) {
	if (config.get('admins').includes(req.user)) {
		if (api.refreshConfig()) {
			return jsonResponse.ok(null, res, null, 'Config was successfully refreshed');
		}

		return jsonResponse.internalError(
			null, res, null, 'Failed to refresh config. Check your logs for more information'
		);
	}

	return jsonResponse.noAccess(null, res);
};