const { channels, guildId } = require('../config');

/**
 * Validates the source provided when calling the command
 * Source must be a discord message URL.
 *
 * @param {string} source - The discord messagem URL.
 * @param {string} type - The type of the command. Valid values are:
 * 	- "ouro": Indicates the command is a gold transaction.
 * 	- "gema": Indicates the command is a gem transaction.
 * 	- "xp": Indicates the command is a xp transaction.
 * @param {string} action - The action being performed by the command. Valid actions are:
 * 	- "deposita": Increases the amount of currency.
 * 	- "retira": Decreases the amount of currency.
 */
function sourceValidation(source, type, action) {
	let sourceChannels = [
		channels.aventuras,
		channels.fichas,
		channels.compras,
		channels.banco,
	];

	if (type === 'ouro') {
		if (action === 'retira') {
			sourceChannels = [
				channels.compras,
				channels.forja,
				channels.oficios,
				channels.banco,
			];
		}
	} else if (type === 'gema') {
		sourceChannels = [
			channels.aventuras,
			channels.fichas,
			channels.gemas,
		];
	} else if (type === 'xp') {
		sourceChannels = [
			channels.aventuras,
			channels.fonteXp,
		];

		if (action === 'retira') {
			sourceChannels = [
				channels.fonteXp,
				channels.gemas,
			];
		}
	}

	const patterns = sourceChannels.map(channel => new RegExp(`^https://discord.com/channels/${guildId}/${channel}/\\d{18,}$`));

	return patterns.some(pattern => pattern.test(source));
}

module.exports = {
	sourceValidation,
};