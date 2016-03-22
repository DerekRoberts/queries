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
dictionary.meds = dictionary.meds ||{
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

// dictionary.meds.ace.code.loinc, whoATC, etc.
// dictionary.meds.ace.male.min


dictionary.defaults = dictionary.defaults ||{
  // Min and max ages supported by hQuery
  ages: {
    min : 0,
    max : 120
  },
  // Start and end dates for retroactive queries
  dates: {
    start : function(){
      // Remember months are zero indexed!
      return new Date( 2016, 2, 1 );
    },
    end   : function(){
      return new Date();
    }
  },
  // Min and max bounds for queries without dose bounds
  doses: {
    min : 0,
    max : Number.POSITIVE_INFINITY
  }
};
