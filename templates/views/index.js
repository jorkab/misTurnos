$(document).ready(function () {
	var selector;
	var color;
	var colorSelector={};

	$("button.selectorTurno").click(function(e){
		var $selectorTurno = $(e.currentTarget);
		selector = e.currentTarget.dataset.selector;
		color = $selectorTurno.css("border-color");
	});
	$("td.diaCalendario").click(function(e){
		var $diaCalendario = $(e.currentTarget);
		$diaCalendario.attr('data-selector',selector);
		$diaCalendario.addClass(selector);
		$diaCalendario.css("background-color", color);
	});
});

function enviarCalendario(){
	var $diasCalendario = $('td.diaCalendario').toArray();
	var mes = [];

	$diasCalendario.forEach(element => {
		var dia = {
			'fecha' : element.dataset.dia,
			'turno' : element.dataset.selector
		}
		mes.push(dia);
	});

	var data = {
		'data' : mes
	}

	$.ajax({
		method: "POST",
		url: "/",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: function(res){
			console.log(res);
		}
	})
}
