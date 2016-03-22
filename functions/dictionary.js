/*
* Dictionary-like functions.
*   Used primarily for regex matching medications.
*
* @param pt {object} - the patient API object.
*
* @return - true if the patient has an active statin medication
*               false otherwise.
*/

var dictionary = dictionary ||{};
dictionary.codes = dictionary.codes ||{
  aceInhibitor                         : "^C09A.*",
  angeotensin2Antagonist               : "^C09CA.*",
  betaBlocker                          : "^C07[ABCDEF]B.*",
  biguanide                            : "^A10BA.*",
  dihydropyridineCalciumChannelBLocker : "^C08[CG]A.*",
  naturalOpiumAlkaloid                 : "^N02AA.*",
  PPI                                  : "^A02BC.*",
  statin                               : "^C10(AA|BX|BA).*",
  thiazide                             : "^C03AA.*",
  thyroidHormone                       : "^H03AA.*"
};
