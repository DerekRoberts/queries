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
  dihydropyridineCalciumChannelBlocker : "^C08[CG]A.*",
  naturalOpiumAlkaloid                 : "^N02AA.*",
  PPI                                  : "^A02BC.*",
  statin                               : "^C10(AA|BX|BA).*",
  thiazide                             : "^C03AA.*",
  thyroidHormone                       : "^H03AA.*"
};

// http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx
dictionary.conditions = dictionary.conditions ||{
  asthma : {
    ICD9     : "^493.*"
  },
  chronicKidneyDisease : {
    ICD9     : "^58[1-3].*|^585.*|^58[7-8].*"
  },
  COPD : {
    ICD9     : "^49[1246]$"
  },
  congestiveHeartFailure : {
    ICD9     : "^428.*|^428$"
  },
  depression : {
    ICD9     : "^311.*"
  },
  diabetes : {
    ICD9     : "^250.*"
  },
  hepatitisC : {
    ICD9     : "^070.4[14]|^070.5[14]|^070.7[01]"
  },
  hypertension : {
    ICD9     : "^493.*",
    SNOMEDCT : "38341003"
  },
  rheumatoid : {
    ICD9     : "^714.*"
  }
};

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
