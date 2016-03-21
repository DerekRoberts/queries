/*
* Dictionary-like functions.
*   Used primarily for regex matching medications.
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active statin medication
*               false otherwise.
*/

// TODO: Add retroactive support

var code     = 'Value not provided',
  doseMin    = doseMin || 0,
  doseMax    = doseMax || Number.POSITIVE_INFINITY,
  dictionary = dictionary ||{};

dictionary.hasActiveAceInhibitor = function( patient ){
  code = "^C09A.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveAngeotensin2Antagonist = function( patient ){
  code = "^C09CA.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveBetaBlocker = function( patient ){
  code = "^C07[ABCDEF]B.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveBiguinide = function( patient ){
  code = "^A10BA.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveDihydropyridineCalciumChannelBLocker = function( patient ){
  code = "^C08[CG]A.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveNaturalOpiumAlkaloid = function( patient ){
  code = "^N02AA.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActivePPI = function( patient ){
  code = "^A02BC.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveStatin = function( patient ){
  // "^C10BAA", "^C10BX", "^C10BA"
  code = "^C10(AA|BX|BA).*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveThiazide = function( patient ){
  code = "^C03AA.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};

dictionary.hasActiveThyroidHormone = function( patient ){
  code = "^H03AA.*";
  return medications.hasActiveMed( patient, code, false, doseMin, doseMax );
};
