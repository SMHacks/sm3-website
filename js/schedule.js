$(document).ready(function(){
	$('#scheduleSun').hide();
	$('#viewSun').click(function() {
		$('#scheduleSun').show();
		$('#scheduleSat').hide();
	})
	$('#viewSat').click(function() {
		$('#scheduleSun').hide();
		$('#scheduleSat').show();
	})
})