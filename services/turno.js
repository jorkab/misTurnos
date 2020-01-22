const keystone = require('keystone');
const Turno = keystone.list('Turno');
const mongoose = require('mongoose');

const turnoService = {

	getTurnos: mes => {
		const fechaSup = new Date(Date.UTC(mes.fecha.getFullYear(), mes.fecha.getMonth() + 1, 0));
		const fechaInf = new Date(Date.UTC(mes.fecha.getFullYear(), mes.fecha.getMonth(), 1));
		return Turno.model.find({
			usuario: mongoose.Types.ObjectId(mes.usuario),
			fecha: {
				$gte: fechaInf,
				$lte: fechaSup,
			},
		}).exec();
	},

	removeTurnos: turnos => {
		const fechaSup = turnos[turnos.length - 1].fecha;
		const fechaInf = turnos[0].fecha;
		const usuario = turnos[0].usuario;
		return Turno.model.remove({
			fecha: {
				$gte: fechaInf,
				$lte: fechaSup,
			},
			usuario: mongoose.Types.ObjectId(usuario),
		}).exec();
	},

	insertTurnos: turnos => {
		return Turno.model.create(turnos);
	},
};

module.exports = turnoService;
