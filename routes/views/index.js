const keystone = require('keystone');
const turnoService = require('../../services/turno');

exports = module.exports = async function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('get', async next => {

		const fecha = req.query.anio ? new Date(Date.UTC(req.query.anio, req.query.mes, 1)) : new Date();
		const mes = {
			fecha: fecha,
			usuario: req.user._id,
		};
		let turnos;
		try {
			turnos = await turnoService.getTurnos(mes);
		} catch (err) {
			console.log(err);
		}
		const utlimoDiaMes = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth() + 1, 0)).getDate();
		let primerDiaSemana = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();

		if (primerDiaSemana === 0) {
			primerDiaSemana = 7;
		}

		locals.primerDiaSemana = primerDiaSemana;
		locals.utlimoDiaMes = utlimoDiaMes;
		locals.mes = fecha.getMonth() + 1;
		locals.mesText = mapMonth(fecha.getMonth());
		locals.anio = fecha.getFullYear();
		locals.turnos = [];
		if (turnos) {
			turnos.forEach(el => {
				locals.turnos[el.fecha.getDate()] = el.turno;
			});
		}
		next();
	});

	view.on('post', async next => {
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
		} catch (err) {
			console.log(err);
		}
		next();
	});

	view.render('index');
};

function mapMonth (mes) {
	const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
	return months[mes];
}
