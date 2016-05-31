/*
* Dictionary
*   JavaScript objects for medications, conditions and labs and immunizations..
*/

var dictionary = dictionary ||{};

// http://www.whocc.no/atc_ddd_index
dictionary.meds = dictionary.meds || {
  aceInhibitor  : {
    ATC : [
      { codeBeginsWith: "C09A",  description: "ACE INHIBITORS, PLAIN" }
    ]
  },
  acetaminophen  : {
    ATC : [
      { codeBeginsWith: "N02BE01", description: "Paracetamol" }
    ]
  },
  angeotensin2Antagonist  : {
    ATC : [
      { codeBeginsWith: "C09C", description: "ANGIOTENSIN II ANTAGONISTS, PLAIN" }
    ]
  },
  antigout  : {
    ATC : [
      { codeBeginsWith: "M04A", description: "Antigout preparations" }
    ]
  },
  betaBlocker  : {
    ATC : [
      { codeBeginsWith: "C07AB", description: "Beta blocking agents, selective" },
      { codeBeginsWith: "C07BB", description: "Beta blocking agents, selective, and thiazides" },
      { codeBeginsWith: "C07CB", description: "Beta blocking agents, selective, and other diuretics" },
      { codeBeginsWith: "C07DB", description: "Beta blocking agents, selective, thiazides and other diuretics" },
      { codeBeginsWith: "C07EB", description: "Beta blocking agents, selective, and vasodilators" },
      { codeBeginsWith: "C07FB", description: "Beta blocking agents, selective, and other antihypertensives" }
    ]
  },
  biguanide : {
    ATC : [
      { codeBeginsWith: "A10BA", description: "Biguanides"}
    ]
  },
  dihydropyridineCalciumChannelBlocker : {
    ATC : [
      { codeBeginsWith: "C08CA", description: "Dihydropyridine derivatives" },
      { codeBeginsWith: "C08GA", description: "Calcium channel blockers and diuretics" }
    ]
  },
  digoxin : {
    ATC : [
      { codeBeginsWith: "C01AA", description: "Digitalis glycosides" }
    ]
  },
  opioid : {
    ATC : [
      { codeBeginsWith: "N02A", description: "Natural opium alkaloids" }
    ]
  },
  levothyroxine : {
    ATC : [
      { codeBeginsWith: "H03AA", description: "Thyroid hormones" }
    ]
  },
  opioidNatural : {
    ATC : [
      { codeBeginsWith: "N02AA", description: "Natural opium alkaloids" }
    ]
  },
  PPI : {
    ATC : [
      { codeBeginsWith: "A02BC", description: "Proton pump inhibitors" }
    ]
  },
  statin : {
    ATC : [
      { codeBeginsWith: "C10AA", description: "HMG CoA reductase inhibitors" },
      { codeBeginsWith: "C10BA", description: "HMG CoA reductase inhibitors in combination with other lipid modifying agents" },
      { codeBeginsWith: "C10BX", description: "HMG CoA reductase inhibitors, other combinations" }
    ]
  },
  thiazide : {
    ATC : [
      { codeBeginsWith: "C03AA", description: "Thiazides, plain" }
    ]
  },
  thyroidHormone : {
    ATC : [
      { codeBeginsWith: "H03AA", description: "Thyroid hormones" }
    ]
  },
  tiotropium : {
    ATC : [
      { codeBeginsWith: "R03BB04", description: "Tiotropium bromide" }
    ]
  }
};

// http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx
// http://www.medilexicon.com/icd9codes.php
// http://www.snomedbrowser.com
dictionary.conditions = dictionary.conditions ||{
  asthma : {
    ICD9     : [
      { codeBeginsWith: "493", description: "ASTHMA ..." }
    ]
  },
  cardiacEvent : {
    ICD9     : [
      { codeBeginsWith: "410", description: "Myocardial, posterior and subendocardial infarctions" },
      { codeBeginsWith: "411", description: "Infarctions and other coronary problems" }
    ]
  },
  cerebrovascularDisease : {
    ICD9     : [
      { codeEquals:     "430", description: "SUBARACHNOID HEMORRHAGE" },
      { codeEquals:     "431", description: "INTRACEREBRAL HEMORRHAGE" },
      { codeBeginsWith: "432", description: "NONTRAUMATIC EXTRADURAL HEMORRHAGE" },
      { codeBeginsWith: "433", description: "OCCLUSION AND STENOSIS OF BASILAR ARTERY ..." },
      { codeBeginsWith: "434", description: "CEREBRAL THROMBOSIS" },
      { codeBeginsWith: "436", description: "ACUTE BUT ILL-DEFINED CEREBROVASCULAR DISEASE" },
      { codeBeginsWith: "437", description: "..." },
      { codeBeginsWith: "438", description: "..." }
    ]
  },
  chronicKidneyDisease : {
    ICD9     : [
      { codeBeginsWith: "581", description: "NEPHROTIC SYNDROME ..." },
      { codeBeginsWith: "582", description: "CHRONIC GLOMERULONEPHRITIS ..." },
      { codeBeginsWith: "583", description: "NEPHRITIS AND NEPHROPATHY ..." },
      { codeBeginsWith: "585", description: "CHRONIC KIDNEY DISEASE ..." },
      { codeBeginsWith: "587", description: "CEREBRAL THROMBOSIS" },
      { codeBeginsWith: "588", description: "..." }
    ]
  },
  COPD : {
    ICD9     : [
      { codeEquals:     "496", description: "CHRONIC AIRWAY OBSTRUCTION NOT ELSEWHERE CLASSIFIED" },
      { codeBeginsWith: "491", description: "BRONCHITIS ..." },
      { codeBeginsWith: "492", description: "EMPHYSEMA ..." },
      { codeBeginsWith: "494", description: "BRONCHIECTASIS ..." }
    ]
  },
  congestiveHeartFailure : {
    ICD9     : [
      { codeBeginsWith: "428", description: "HEART FAILURE ..." }
    ]
  },
  dependenceAlcohol : {
    ICD9     : [
      { codeBeginsWith: "303", description: "ALCOHOL DEPENDENCE ..." }
    ]
  },
  dependenceDrug : {
    ICD9     : [
      { codeBeginsWith: "304", description: "DRUG DEPENDENCE ..." }
    ]
  },
  dependenceTobacco : {
    ICD9     : [
      { codeEquals: "305.1", description: "NONDEPENDENT TOBACCO USE DISORDER" }
    ]
  },
  depression : {
    ICD9     : [
      { codeEquals: "311", description: "DEPRESSIVE DISORDER NOT ELSEWHERE CLASSIFIED" }
    ]
  },
  diabetes : {
    ICD9     : [
      { codeBeginsWith: "250", description: "DIABETES ..." }
    ],
    SNOMEDCT : [
      { codeEquals: "73211009", description: "Diabetes mellitus (disorder)" },
      { codeEquals: "44054006", description: "Diabetes mellitus type 2 (disorder)" }
    ]
  },
  diabetesGestational : {
    ICD9     : [
      { codeBeginsWith: "648.8", description: "ABNORMAL GLUCOSE TOLERANCE OF MOTHER ..."}
    ],
    SNOMEDCT : [
      { codeEquals: "11687002", description: "Gestational diabetes mellitus (disorder)" }
    ]
  },
  endOfLife : {
    ICD9     : [
      { codeEquals: "V41.6",   description: "PROBLEMS WITH SWALLOWING AND MASTICATION" },
      { codeEquals: "V46.2",   description: "DEPENDENCE ON SUPPLEMENTAL OXYGEN" },
      { codeEquals: "196.9",   description: "SECONDARY AND UNSPECIFIED MALIGNANT NEOPLASM OF LYMPH NODES SITE UNSPECIFIED" },
      { codeEquals: "197.7",   description: "MALIGNANT NEOPLASM OF LIVER SECONDARY" },
      { codeEquals: "198.3",   description: "SECONDARY MALIGNANT NEOPLASM OF BRAIN AND SPINAL CORD" },
      { codeEquals: "198.5",   description: "SECONDARY MALIGNANT NEOPLASM OF BONE AND BONE MARROW" },
      { codeEquals: "402.01",  description: "MALIGNANT HYPERTENSIVE HEART DISEASE WITH HEART FAILURE" },
      { codeEquals: "402.11",  description: "BENIGN HYPERTENSIVE HEART DISEASE WITH HEART FAILURE" },
      { codeEquals: "402.91",  description: "UNSPECIFIED HYPERTENSIVE HEART DISEASE WITH HEART FAILURE" },
      { codeEquals: "404.01",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, MALIGNANT, WITH HEART FAILURE AND WITH CHRONIC KIDNEY DISEASE STAGE I THROUGH STAGE IV, OR UNSPECIFIED" },
      { codeEquals: "404.03",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, MALIGNANT, WITH HEART FAILURE AND WITH CHRONIC KIDNEY DISEASE STAGE V OR END STAGE RENAL DISEASE" },
      { codeEquals: "404.11",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, BENIGN, WITH HEART FAILURE AND WITH CHRONIC KIDNEY DISEASE STAGE I THROUGH STAGE IV, OR UNSPECIFIED" },
      { codeEquals: "404.13",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, BENIGN, WITH HEART FAILURE AND CHRONIC KIDNEY DISEASE STAGE V OR END STAGE RENAL DISEASE" },
      { codeEquals: "404.91",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, UNSPECIFIED, WITH HEART FAILURE AND WITH CHRONIC KIDNEY DISEASE STAGE I THROUGH STAGE IV, OR UNSPECIFIED" },
      { codeEquals: "404.93",  description: "HYPERTENSIVE HEART AND CHRONIC KIDNEY DISEASE, UNSPECIFIED, WITH HEART FAILURE AND CHRONIC KIDNEY DISEASE STAGE V OR END STAGE RENAL DISEASE" },
      { codeEquals: "456.0",   description: "ESOPHAGEAL VARICES WITH BLEEDING" },
      { codeEquals: "456.1",   description: "ESOPHAGEAL VARICES WITHOUT BLEEDING" },
      { codeEquals: "456.20",  description: "ESOPHAGEAL VARICES IN DISEASES CLASSIFIED ELSEWHERE WITH BLEEDING" },
      { codeEquals: "456.21",  description: "ESOPHAGEAL VARICES IN DISEASES CLASSIFIED ELSEWHERE WITHOUT BLEEDING" },
      { codeEquals: "492.0",   description: "EMPHYSEMATOUS BLEB" },
      { codeEquals: "492.8",   description: "OTHER EMPHYSEMA" },
      { codeEquals: "494.0",   description: "BRONCHIECTASIS WITHOUT ACUTE EXACERBATION" },
      { codeEquals: "494.1",   description: "BRONCHIECTASIS WITH ACUTE EXACERBATION" },
      { codeEquals: "496",     description: "CHRONIC AIRWAY OBSTRUCTION NOT ELSEWHERE CLASSIFIED" },
      { codeEquals: "518.81",  description: "ACUTE RESPIRATORY FAILURE" },
      { codeEquals: "518.83",  description: "CHRONIC RESPIRATORY FAILURE" },
      { codeEquals: "518.84",  description: "ACUTE AND CHRONIC RESPIRATORY FAILURE" },
      { codeEquals: "567.23",  description: "SPONTANEOUS BACTERIAL PERITONITIS" },
      { codeEquals: "571.2",   description: "ALCOHOLIC CIRRHOSIS OF LIVER" },
      { codeEquals: "571.5",   description: "CIRRHOSIS OF LIVER WITHOUT ALCOHOL" },
      { codeEquals: "571.6",   description: "BILIARY CIRRHOSIS" },
      { codeEquals: "572.2",   description: "HEPATIC ENCEPHALOPATHY" },
      { codeEquals: "572.4",   description: "HEPATORENAL SYNDROME" },
      { codeEquals: "585.4",   description: "CHRONIC KIDNEY DISEASE, STAGE IV (SEVERE)" },
      { codeEquals: "585.5",   description: "CHRONIC KIDNEY DISEASE, STAGE V" },
      { codeEquals: "567.23",  description: "SPONTANEOUS BACTERIAL PERITONITIS" },
      { codeEquals: "770.16",  description: "ASPIRATION OF BLOOD WITH RESPIRATORY SYMPTOMS" },
      { codeEquals: "780.31",  description: "FEBRILE CONVULSIONS (SIMPLE), UNSPECIFIED" },
      { codeEquals: "780.32",  description: "COMPLEX FEBRILE CONVULSIONS" },
      // NOTE: 784.5 includes speech disorders
      { codeEquals: "784.51",  description: "DYSARTHRIA" },
      { codeEquals: "784.52",  description: "FLUENCY DISORDER IN CONDITIONS CLASSIFIED ELSEWHERE" },
      { codeEquals: "789.51",  description: "MALIGNANT ASCITES" },
      { codeBeginsWith: "428", description: "CHRONIC HEART FAILURE ..." },
      { codeBeginsWith: "491", description: "BRONCHITIS ..." }
    ]
  },
  frailty : {
    ICD9     : [
      { codeBeginsWith: "V15", description: "ALLERGIES, IMMUNITY, TRAUMA AND MORE ..." }
    ]
  },
  gout : {
    ICD9     : [
      { codeBeginsWith: "274", description: "GOUT ..." }
    ]
  },
  hepatitisC : {
    ICD9     : [
      { codeEquals: "070.41", description: "ACUTE HEPATITIS C WITH HEPATIC COMA" },
      { codeEquals: "070.44", description: "CHRONIC HEPATITIS C WITH HEPATIC COMA" },
      { codeEquals: "070.51", description: "ACUTE HEPATITIS C WITHOUT MENTION OF HEPATIC COMA" },
      { codeEquals: "070.54", description: "CHRONIC HEPATITIS C WITHOUT HEPATIC COMA" },
      { codeEquals: "070.70", description: "UNSPECIFIED VIRAL HEPATITIS C WITHOUT HEPATIC COMA" },
      { codeEquals: "070.71", description: "UNSPECIFIED VIRAL HEPATITIS C WITH HEPATIC COMA" }
    ]
  },
  HIV : {
    ICD9     : [
      { codeEquals: "V08", description: "ASYMPTOMATIC HUMAN IMMUNODEFICIENCY VIRUS (HIV) INFECTION STATUS" },
      { codeEquals: "042", description: "HUMAN IMMUNODEFICIENCY VIRUS (HIV) DISEASE" }
    ]
  },
  hypertension : {
    ICD9     : [
      { codeBeginsWith: "401", description: "HYPERTENSION ..."}
    ],
    SNOMEDCT : [
      { codeEquals: "38341003", description: "Hypertensive disorder" }
    ]
  },
  hypothyroidism : {
    ICD9     : [
      { codeEquals:     "243", description: "CONGENITAL HYPOTHYROIDISM" },
      { codeBeginsWith: "244", description: "HYPOTHYROIDISM ..." },
      { codeBeginsWith: "245", description: "THYROIDITIS ..." }
    ]
  },
  impairedRenalFunction : {
    ICD9     : [
      { codeEquals: "586", description: "RENAL FAILURE UNSPECIFIED" }
    ]
  },
  ischemicHeartDisease : {
    ICD9     : [
      { codeEquals:     "412", description: "OLD MYOCARDIAL INFARCTION" },
      { codeBeginsWith: "410", description: "INFARCTION ..." },
      { codeBeginsWith: "411", description: "INFARCTION AND OTHER ..." },
      { codeBeginsWith: "413", description: "ANGINA ..." },
      { codeBeginsWith: "414", description: "CORONARY ATHEROSCLEROSIS, ANEURYSM AND OTHER ..." }
    ]
  },
  malignantNeoplasms : {
    ICD9     : [
      { codeEquals: "153.9", description: "MALIGNANT NEOPLASM OF COLON UNSPECIFIED SITE" },
      { codeEquals: "174.9", description: "MALIGNANT NEOPLASM OF BREAST (FEMALE) UNSPECIFIED SITE" },
      { codeEquals: "184.9", description: "MALIGNANT NEOPLASM OF FEMALE GENITAL ORGAN SITE UNSPECIFIED" }
    ]
  },
  mentalHealth : {
    ICD9     : [
      { codeEquals: "311",     description: "DEPRESSIVE DISORDER NOT ELSEWHERE CLASSIFIED" },
      { codeEquals: "313.3",   description: "RELATIONSHIP PROBLEMS SPECIFIC TO CHILDHOOD AND ADOLESCENCE" },
      { codeBeginsWith: "295", description: "SCHIZOPHRENIA ..." },
      { codeBeginsWith: "300", description: "ANXIETY, HYSTERIA AND OTHERS ..." },
      { codeBeginsWith: "301", description: "PARANOIA, PERSONALITY DISORDERS AND OTHERS ..." },
      { codeBeginsWith: "303", description: "ALCOHOL DEPENDENCE ..." },
      { codeBeginsWith: "304", description: "DRUG DEPENDENCE ..." },
      { codeBeginsWith: "309", description: "ADJUSTMENT DISORDERS AND OTHERS ..." },
      { codeBeginsWith: "314", description: "ADD, ADHD AND OTHERS ..." },
      // NOTE: Insomnia code includes more than just insomnia (coma and other vegetative states)
      { codeBeginsWith: "780", description: "ADD, ADHD AND OTHERS ..." }
    ]
  },
  myocardialInfarction : {
    ICD9     : [
      { codeEquals: "412",       description: "OLD MYOCARDIAL INFARCTION" },
      { codeBeginsWith: "410",   description: "MYOCARDIAL, POSTERIOR AND SUBENDOCARDIAL INFARCTIONS ..." },
      { codeBeginsWith: "411",   description: "INFARCTIONS AND OTHER CORONARY CONDITIONS ..." },
      { codeBeginsWith: "429.7", description: "OTHER MYOCARDIAL INFARCTIONS ..." }
    ]
  },
  obesity :{
    ICD9     : [
      // NOTE: Shouldn't this be 278.?
      { codeEquals: "^298.0", description: "DEPRESSIVE TYPE PSYCHOSIS" }
    ],
    SNOMEDCT : [
      { codeEquals: "414916001", description: "Obesity" }
    ]
  },
  osteoarthritis : {
    ICD9     : [
      { codeBeginsWith: "715", description: "OSTEOARTHRITIS ..." }
    ]
  },
  painBackLower : {
    ICD9     : [
      { codeBeginsWith: "724,", description: "BACK PAIN ..." }
    ]
  },
  painChronic : {
    ICD9     : [
      { codeBeginsWith: "338", description: "CHRONIC PAIN ..." }
    ]
  },
  palliativeCare : {
    ICD9     : [
      { codeEquals: "V66.7", description: "ENCOUNTER FOR PALLIATIVE CARE" }
    ]
  },
  rheumatoid : {
    ICD9     : [
      { codeEquals: "714.0", description: "RHEUMATOID ARTHRITIS" }
    ]
  },
  schizophrenicOrBipolar : {
    ICD9     : [
      { codeBeginsWith: "295", description: "SCHIZOPHRENIA ..." },
      { codeBeginsWith: "296", description: "BIPOLAR DISORDER ..." }
    ]
  },
  stroke : {
    ICD9     : [
      { codeEquals: "V17.1",  description: "FAMILY HISTORY OF STROKE (CEREBROVASCULAR)" },
      { codeEquals: "433.01", description: "OCCLUSION AND STENOSIS OF BASILAR ARTERY WITH CEREBRAL INFARCTION" },
      { codeEquals: "433.11", description: "OCCLUSION AND STENOSIS OF CAROTID ARTERY WITH CEREBRAL INFARCTION" },
      { codeEquals: "433.21", description: "OCCLUSION AND STENOSIS OF VERTEBRAL ARTERY WITH CEREBRAL INFARCTION" },
      { codeEquals: "433.31", description: "OCCLUSION AND STENOSIS OF MULTIPLE AND BILATERAL PRECEREBRAL ARTERIES WITH CEREBRAL INFARCTION" },
      { codeEquals: "433.81", description: "OCCLUSION AND STENOSIS OF OTHER SPECIFIED PRECEREBRAL ARTERY WITH CEREBRAL INFARCTION" },
      { codeEquals: "433.91", description: "OCCLUSION AND STENOSIS OF UNSPECIFIED PRECEREBRAL ARTERY WITH CEREBRAL INFARCTION" },
      { codeEquals: "434.01", description: "CEREBRAL THROMBOSIS WITH CEREBRAL INFARCTION" },
      { codeEquals: "434.11", description: "CEREBRAL EMBOLISM WITH CEREBRAL INFARCTION" },
      { codeEquals: "434.91", description: "CEREBRAL ARTERY OCCLUSION UNSPECIFIED WITH CEREBRAL INFARCTION" }
    ]
  }
};


// http://www.whocc.no/atc_ddd_index
dictionary.immunizations = dictionary.immunizations || {
  influenza  : {
    whoATC : [
      { codeBeginsWith: "J07BB", description: "Influenza vaccines" }
    ]
  },
  pneumococcal  : {
    whoATC : [
      { codeEquals: "J07AL02", description: "pneumococcus, purified polysaccharides antigen conjugated" }
    ],
    SNOMEDCT : [
      { codeEquals: "12866006",  description: "Pneumococcal vaccination (procedure)" },
      { codeEquals: "394678003", description: "Booster pneumococcal vaccination" }
    ]
  },
  tetanus  : {
    whoATC : [
      { codeBeginsWith: "J07AM", description: "Tetanus vaccines" }
    ]
  }
};


// PDF: https://loinc.org/discussion-documents/2008-06-09-long-common-names-report/attachment_download/file
// http://s.details.loinc.org/LOINC/xxxxx-x.html?sections=Comprehensive
// http://s.details.loinc.org/LOINC/xxxxx-x.html
// http://search.loinc.org
dictionary.labs = dictionary.labs || {
  cervicalCancer  : {
    pCLOCD : [
      { codeEquals: "10524-7", description: "Microscopic observation [Identifier] in Cervix by Cyto stain" },
      { codeEquals: "19762-4", description: "General categories [Interpretation] of Cervical or vaginal smear or scraping by Cyto stain" },
      { codeEquals: "47527-7", description: "Cytology report of Cervical or vaginal smear or scraping Cyto stain.thin prep" },
      { codeEquals: "47528-5", description: "Cytology report of Cervical or vaginal smear or scraping Cyto stain" }
    ],
    SNOMEDCT : [
      { codeEquals: "171149006", description: "Screening for malignant neoplasm of cervix (procedure)" },
      { codeEquals: "308728002", description: "Cervical smear biopsy taken (procedure)" },
      { codeEquals: "439958008", description: "Sampling of cervix for Papanicolaou smear" }
    ]
  },
  chlamydia  : {
    pCLOCD : [
      { codeEquals: "21613-5", description: "Chlamydia trachomatis DNA [Presence] in Unspecified specimen by Probe and target amplification method" }
    ]
  },
  cholesterol  : {
    pCLOCD : [
      { codeEquals: "14647-2", description: "Cholesterol [Moles/volume] in Serum or Plasma" },
      { codeEquals: "14646-4", description: "Cholesterol in HDL [Moles/volume] in Serum or Plasma" },
      { codeEquals: "70204-3", description: "Cholesterol non HDL [Moles/volume] in Serum or Plasma" },
      { codeEquals: "39469-2", description: "Cholesterol in LDL [Moles/volume] in Serum or Plasma by calculation" }
    ]
  },
  cholesterolLDL  : {
      pCLOCD : [
        { codeEquals: "39469-2", description: "Cholesterol in LDL [Moles/volume] in Serum or Plasma by calculation" }
      ]
  },
  colonCancer : {
    pCLOCD : [
      { codeEquals: "14563-1", description: "Hemoglobin.gastrointestinal [Presence] in Stool --1st specimen" },
      { codeEquals: "14564-9", description: "Hemoglobin.gastrointestinal [Presence] in Stool --2nd specimen" },
      { codeEquals: "19762-4", description: "General categories [Interpretation] of Cervical or vaginal smear or scraping by Cyto stain" },
      { codeEquals: "58453-2", description: "Hemoglobin.gastrointestinal [Mass/volume] in Stool by Immunologic method" }
    ]
  },
  creatinine  : {
    pCLOCD : [
      { codeEquals: "14682-9", description: "Creatinine [Molecules/volume] in Serum or Plasma" }
    ]
  },
  glomerularFiltrationRate : {
    pCLOCD : [
      { codeEquals: "33914-3", description: "Glomerular filtration rate/1.73 sq M.predicted [Flow] in Serum or Plasma by Creatinine-based formula (MDRD)" }
    ]
  },
  glucoseFasting  : {
    pCLOCD : [
      { codeEquals: "14771-0", description: "Fasting glucose [Moles/volume] in Serum or Plasma" }
    ]
  },
  hemoglobinA1C : {
    pCLOCD : [
      { codeEquals: "4548-4", description: "Hemoglobin A1c/Hemoglobin.total in Blood" }
    ]
  },
  hiv : {
    pCLOCD : [
      { codeEquals: "5017-9",  description: "" },
      { codeEquals: "5018-7",  description: "" },
      { codeEquals: "7917-8",  description: "" },
      { codeEquals: "7918-6",  description: "" },
      { codeEquals: "25835-0", description: "" },
      { codeEquals: "31201-7", description: "" },
      { codeEquals: "48345-3", description: "" },
      { codeEquals: "56888-1", description: "" },
      { codeEquals: "69668-2", description: "" }
    ]
  },
  inr : {
    pCLOCD : [
      { codeEquals: "6301-6",  description: "INR in Platelet poor plasma by Coagulation assay" },
      { codeEquals: "34714-6", description: "INR in Blood by Coagulation assay" },
      { codeEquals: "38875-1", description: "INR in Platelet poor plasma or blood by Coagulation assay" },
      { codeEquals: "46418-0", description: "INR in Capillary blood by Coagulation assay" }
    ]
  },
  mammogram  : {
    pCLOCD : [
      { codeEquals: "24604-1", description: "" },
      { codeEquals: "24605-8", description: "" },
      { codeEquals: "24606-6", description: "" },
      { codeEquals: "24610-8", description: "" },
      { codeEquals: "26175-0", description: "" },
      { codeEquals: "26176-8", description: "" },
      { codeEquals: "26177-6", description: "" },
      { codeEquals: "26287-3", description: "" },
      { codeEquals: "26289-9", description: "" },
      { codeEquals: "26291-5", description: "" },
      { codeEquals: "26346-7", description: "" },
      { codeEquals: "26347-5", description: "" },
      { codeEquals: "26348-3", description: "" },
      { codeEquals: "26349-1", description: "" },
      { codeEquals: "26350-9", description: "" },
      { codeEquals: "26351-7", description: "" },
      { codeEquals: "49154-0", description: "" },
      { codeEquals: "42174-3", description: "" },
      { codeEquals: "72137-3", description: "" },
      { codeEquals: "72138-1", description: "" },
      { codeEquals: "72139-9", description: "" },
      { codeEquals: "72140-7", description: "" },
      { codeEquals: "72141-5", description: "" },
      { codeEquals: "72142-3", description: "" }
    ]
  },
  sigmoidoscopyOrColonoscopy  : {
    pCLOCD : [
      { codeEquals: "67166-9", description: "" },
      { codeEquals: "67222-0", description: "" },
      { codeEquals: "67221-2", description: "" },
      { codeEquals: "67220-4", description: "" }
    ]
  }
};


dictionary.observations = dictionary.observations || {
    waistCircumference : {
	LOINC : [ {
	    codeEquals : "56115-9", description : ""
	} ],
	SNOMEDCT : [ {
	    codeEquals : "276361009", description : ""
	} ],
    },
    bodyMassIndex : {
	LOINC : [ {
	    codeEquals : "39156-5", description : ""
	} ],
	SNOMEDCT : [ {
	    codeEquals : "60621009", description : ""
	} ]
    },
    height : {
	LOINC : [ {
	    codeEquals : "8302-2", description : ""
	} ]
    },
    weight : {
	LOINC : [ {
	    codeEquals : "3141-9", description : ""
	} ]
    },
    systolicBloodPressure : {
	LOINC : [ {
	    codeEquals : "8480-6", description : ""
	} ]
    },
    diastolicBloodPressure : {
	LOINC : [ {
	    codeEquals : "8462-4", description : ""
	} ]
    }
};
