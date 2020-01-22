var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Turno Model
 * ==========
 */
var Turno = new keystone.List('Turno');

Turno.add({
	fecha: { type: Types.Date, index: true },
	turno: { type: Types.Text, index: false },
	usuario: { type: Types.Relationship, ref: 'User', index: true },
});

/**
 * Registration
 */
Turno.defaultColumns = 'fecha, turno, usuario';
Turno.register();
