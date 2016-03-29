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

// http://www.whocc.no/atc_ddd_index
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
    ICD9     : "^493$|^493.*"
  },
  cerebrovascularDisease : {
    ICD      : "43[01234678]"
  },
  chronicKidneyDisease : {
    ICD9     : "^58[123578].*"
  },
  COPD : {
    ICD9     : "^49[1246]$"
  },
  congestiveHeartFailure : {
    ICD9     : "^428$|^428.*"
  },
  dependenceAlcohol : {
    ICD9     : "^303"
  },
  dependenceDrug : {
    ICD9     : "^304"
  },
  dependenceTobacco : {
    ICD9     : "^305.1"
  },
  depression : {
    ICD9     : "^311$"
  },
  diabetes : {
    ICD9     : "^250.*"
  },
  endOfLife : {
    ICD9    : "^V41.6|^V46.2|^196.9|^197.7|^198.[35]|^40[24].[019][13]|^428.*|^456.[012]|^49[1246].*|^518.[134]|^567.23|^571.[256]|^572.[24]|^585.[45]|^770.16|^784.5|^780.3[12]|^789.51"
  },
  frailty : {
    ICD9     : "^V15.*"
  },
  gestationalDiabetes : {
    ICD9     : "^648.8",
    SNOMEDCT : "11687002"
  },
  gout : {
    ICD9     : "^274.*"
  },
  hepatitisC : {
    ICD9     : "^070.4[14]|^070.5[14]|^070.7[01]"
  },
  HIV : {
    ICD9     : "^V08$|^042$"
  },
  hypertension : {
    ICD9     : "^401$|^401.*",
    SNOMEDCT : "38341003"
  },
  hypothyroidism : {
    ICD9     : "^243$|^244.*|^245.*"
  },
  impairedRenalFunction : {
    ICD9     : "^586"
  },
  ischemicHeartDisease : {
    ICD9     : "^414|^41[0-4].*$",
  },
  malignantNeoplasms : {
    ICD9     : "^153.9|^1[78]4.9"
  },
  mentalHealth : {
    ICD9     : "^295$|^30[0139]$|^31[14]$|^313.3|$780$"
  },
  myocardialInfarction : {
    ICD9     : "^41[012].*|^429.8"
  },
  obesity :{
    ICD9     : "^298.0",
    SNOMEDCT : "414916001"
  },
  osteoarthritis : {
    ICD9     : "^715.*"
  },
  painBackLower : {
    ICD9     : "^724.*"
  },
  painChronic : {
    ICD9     : "^338.*"
  },
  rheumatoid : {
    ICD9     : "^714.*"
  },
  schizophrenicOrBipolar : {
    ICD9     : "^295$|^295.*|^296$|^296.*"
  },
  stroke : {
    ICD9     : "V17.1|43[34].*1"
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
