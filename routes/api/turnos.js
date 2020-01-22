const turnoService = require('../../services/turno');

const turno = {
	updateTurnos: async (req, res) => {
		const data = req.body.data.map(element => {
			const fechaSplit = element.fecha.split('-');
			return {
				fecha: new Date(Date.UTC(fechaSplit[2], fechaSplit[1] - 1, fechaSplit[0])),
				turno: element.turno,
				usuario: req.user._id,
			};
		});
		try {
			await turnoService.removeTurnos(data);
			await turnoService.insertTurnos(data);
			return res.apiResponse('ok');
		} catch (err) {
			throw Error(err);
		}
	},
};

module.exports = turno;
