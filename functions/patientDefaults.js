/**
* Return maximum allowable age
*
* @return message - maximum allowable age
*/

var patientDefaults = patientDefaults ||{};
patientDefaults.ageMin = function(){
	return 0;
}
patientDefaults.ageMax = function(){
	return 120;
}
