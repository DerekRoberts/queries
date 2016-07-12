/*
* Dictionary
*   JavaScript objects for medications, conditions and labs and immunizations..
*/

// Strict mode
"use strict";


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
	antibiotic  : {
		ATC : [
			{ codeEquals: "J01CF02", description: "cloxacillin" },
			{ codeEquals: "J01CA01", description: "ampicillin" },
			{ codeEquals: "J01CA04", description: "amoxicillin" },
			{ codeEquals: "J01EE01", description: "sulfamethoxazole and trimethoprim" },
			{ codeEquals: "J01FA09", description: "clarithromycin" },
			{ codeEquals: "J01FA10", description: "azithromycin" },
			{ codeEquals: "J01FA01", description: "erythromycin" },
			{ codeEquals: "J01FF01", description: "clindamycin" },
			{ codeEquals: "J01AA02", description: "doxycycline" },
			{ codeEquals: "J01AA07", description: "tetracycline" },
			{ codeEquals: "J01AA08", description: "minocycline" },
			{ codeEquals: "J01MA12", description: "levofloxacin" },
			{ codeEquals: "J01MA14", description: "moxifloxacin" },
			{ codeEquals: "J01MA02", description: "ciprofloxacin" },
			{ codeEquals: "J01DB01", description: "cefalexin" },
			{ codeEquals: "J01DC02", description: "cefuroxime" },
			{ codeEquals: "J01DC04", description: "cefaclor" },
			{ codeEquals: "J01DD08", description: "cefixime" },
			{ codeEquals: "J01XE01", description: "nitrofurantoin" }
		]
	},
	antidepressant  : {
		ATC : [
			{ codeBeginsWith: "NO6A", description: "Antidepressants" }
		]
	},
	antigout  : {
		ATC : [
			{ codeBeginsWith: "M04A", description: "Antigout preparations" }
		]
	},
	antipsychotic  : {
		ATC : [
			{ codeBeginsWith: "N05A", description: "Antipsychotics" }
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
	},
	warfarin : {
		ATC : [
			{ codeBeginsWith: "B01AA03", description: "Warfarin Medications" }
		]
	}
};

// http://www.cms.gov/medicare-coverage-database/staticpages/icd-9-code-lookup.aspx
// http://www.medilexicon.com/icd9codes.php
// http://www.snomedbrowser.com
//
// Eclipse regular expression replacements used to convert from old code to new syntax
//
//\|\|	\n
//
//^[^\^]*(.*)$	\1
//
//^\^(.*)$	\1
//
//^([^\"]*)(.*)$	\1
//
//\\\.	.
//
//Remove lines with + or *
//^(.*)(\+|\*)(.*)\n
//
//^(.*)$	{ codeEquals: "\1", description: "" },
//
//
//Remove lines without + or *
//^([^\+\*]*)\n
//
//(\*|\+)
//
//\.\.	.
//
//^(.*)$	{ codeBeginsWith: "\1", description: "" },
//

dictionary.conditions = dictionary.conditions ||{
	asthma : {
		ICD9     : [
			{ codeBeginsWith: "493", description: "ASTHMA ..." }
		]
	},
	atrialFibrillationFlutter : {
		ICD9     : [
			{ codeEquals: "427.3", description: "" }
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
	
	frailtyIndex_generalComplaints : {
		ICD9     : [
                        { codeEquals: "780.96", description: "" },
                        { codeEquals: "799.3", description: "" },
                        { codeEquals: "V62.89", description: "" },
                        { codeEquals: "280.0", description: "" },
                        { codeEquals: "280.9", description: "" },
                        { codeEquals: "281.0", description: "" },
                        { codeEquals: "281.2", description: "" },
                        { codeEquals: "238.75", description: "" },
                        { codeEquals: "281.8", description: "" },
                        { codeEquals: "281.9", description: "" },
                        { codeEquals: "282.2", description: "" },
                        { codeEquals: "282.3", description: "" },
                        { codeEquals: "283.0", description: "" },
                        { codeEquals: "283.11", description: "" },
                        { codeEquals: "283.9", description: "" },
                        { codeEquals: "284.81", description: "" },
                        { codeEquals: "284.9", description: "" },
                        { codeEquals: "285.1", description: "" },
                        { codeEquals: "285.0", description: "" },
                        { codeEquals: "285.8", description: "" },
                        { codeEquals: "285.9", description: "" },
                        { codeEquals: "V44.1", description: "" },
                        { codeEquals: "V44.2", description: "" },
                        { codeEquals: "V44.3", description: "" },
                        { codeEquals: "V45", description: "" },
                        { codeEquals: "V62.4", description: "" },
                        { codeBeginsWith: "780.7", description: "" },
                        { codeBeginsWith: "V46.", description: "" },
                        { codeBeginsWith: "369.6", description: "" },
                        { codeBeginsWith: "369.7", description: "" },
                        { codeBeginsWith: "369.8", description: "" }
		]
	},
	frailtyIndex_neoplasmOther : {
		ICD9     : [
                        { codeEquals: "164.9", description: "" },
                        { codeEquals: "176.9", description: "" },
                        { codeEquals: "197.0", description: "" },
                        { codeEquals: "197.7", description: "" },
                        { codeEquals: "198.3", description: "" },
                        { codeEquals: "198.4", description: "" },
                        { codeEquals: "198.5", description: "" },
                        { codeEquals: "198.81", description: "" },
                        { codeEquals: "198.82", description: "" },
                        { codeEquals: "198.89", description: "" },
                        { codeEquals: "164.0", description: "" },
                        { codeEquals: "196.9", description: "" },
                        { codeEquals: "202.37", description: "" },
                        { codeEquals: "203.80", description: "" },
                        { codeEquals: "151.9", description: "" },
                        { codeEquals: "157.0", description: "" },
                        { codeEquals: "157.1", description: "" },
                        { codeEquals: "157.2", description: "" },
                        { codeEquals: "157.4", description: "" },
                        { codeEquals: "157.9", description: "" },
                        { codeEquals: "140.9", description: "" },
                        { codeEquals: "141.0", description: "" },
                        { codeEquals: "141.9", description: "" },
                        { codeEquals: "143.8", description: "" },
                        { codeEquals: "143.9", description: "" },
                        { codeEquals: "144.9", description: "" },
                        { codeEquals: "145.5", description: "" },
                        { codeEquals: "145.9", description: "" },
                        { codeEquals: "142.0", description: "" },
                        { codeEquals: "142.8", description: "" },
                        { codeEquals: "150.9", description: "" },
                        { codeEquals: "152.0", description: "" },
                        { codeEquals: "152.9", description: "" },
                        { codeEquals: "156.0", description: "" },
                        { codeEquals: "156.1", description: "" },
                        { codeEquals: "156.2", description: "" },
                        { codeEquals: "156.9", description: "" },
                        { codeEquals: "159.8", description: "" },
                        { codeEquals: "159.9", description: "" },
                        { codeEquals: "190.3", description: "" },
                        { codeEquals: "190.5", description: "" },
                        { codeEquals: "190.9", description: "" },
                        { codeEquals: "224.1", description: "" },
                        { codeEquals: "224.3", description: "" },
                        { codeEquals: "224.8", description: "" },
                        { codeEquals: "224.9", description: "" },
                        { codeEquals: "238.8", description: "" },
                        { codeEquals: "160.1", description: "" },
                        { codeEquals: "164.1", description: "" },
                        { codeEquals: "171.9", description: "" },
                        { codeEquals: "212.7", description: "" },
                        { codeEquals: "215.4", description: "" },
                        { codeEquals: "238.8", description: "" },
                        { codeEquals: "170.9", description: "" },
                        { codeEquals: "171.9", description: "" },
                        { codeEquals: "191.1", description: "" },
                        { codeEquals: "191.2", description: "" },
                        { codeEquals: "191.3", description: "" },
                        { codeEquals: "191.4", description: "" },
                        { codeEquals: "191.5", description: "" },
                        { codeEquals: "191.6", description: "" },
                        { codeEquals: "191.7", description: "" },
                        { codeEquals: "191.9", description: "" },
                        { codeEquals: "192.1", description: "" },
                        { codeEquals: "192.8", description: "" },
                        { codeEquals: "192.9", description: "" },
                        { codeEquals: "162.0", description: "" },
                        { codeEquals: "162.9", description: "" },
                        { codeEquals: "172.9", description: "" },
                        { codeEquals: "173.99", description: "" },
                        { codeEquals: "193", description: "" },
                        { codeEquals: "189.0", description: "" },
                        { codeEquals: "189.1", description: "" },
                        { codeEquals: "188.9", description: "" },
                        { codeEquals: "189.2", description: "" },
                        { codeEquals: "189.3", description: "" },
                        { codeEquals: "189.9", description: "" },
                        { codeEquals: "180.9", description: "" },
                        { codeEquals: "174.9", description: "" },
                        { codeEquals: "175.9", description: "" },
                        { codeEquals: "184.0", description: "" },
                        { codeEquals: "184.4", description: "" },
                        { codeEquals: "184.9", description: "" },
                        { codeEquals: "182.0", description: "" },
                        { codeEquals: "179", description: "" },
                        { codeEquals: "183.0", description: "" },
                        { codeEquals: "175.9", description: "" },
                        { codeEquals: "187.4", description: "" },
                        { codeEquals: "187.9", description: "" },
                        { codeEquals: "186.9", description: "" },
                        { codeBeginsWith: "199.", description: "" },
                        { codeBeginsWith: "200.1", description: "" },
                        { codeBeginsWith: "200.2", description: "" },
                        { codeBeginsWith: "200.8", description: "" },
                        { codeBeginsWith: "201.9", description: "" },
                        { codeBeginsWith: "202.0", description: "" },
                        { codeBeginsWith: "202.1", description: "" },
                        { codeBeginsWith: "202.2", description: "" },
                        { codeBeginsWith: "202.7", description: "" },
                        { codeBeginsWith: "202.8", description: "" },
                        { codeBeginsWith: "202.4", description: "" },
                        { codeBeginsWith: "204.0", description: "" },
                        { codeBeginsWith: "204.1", description: "" },
                        { codeBeginsWith: "204.9", description: "" },
                        { codeBeginsWith: "205.0", description: "" },
                        { codeBeginsWith: "205.9", description: "" },
                        { codeBeginsWith: "206.0", description: "" },
                        { codeBeginsWith: "206.1", description: "" },
                        { codeBeginsWith: "206.2", description: "" },
                        { codeBeginsWith: "206.9", description: "" },
                        { codeBeginsWith: "208.", description: "" },
                        { codeBeginsWith: "202.5", description: "" },
                        { codeBeginsWith: "202.6", description: "" },
                        { codeBeginsWith: "203.0", description: "" },
                        { codeBeginsWith: "203.1", description: "" },
                        { codeBeginsWith: "155.", description: "" },
                        { codeBeginsWith: "158.", description: "" }
		]
	},
	frailtyIndex_incontinence : {
		ICD9     : [
                        { codeEquals: "787.6", description: "" },
                        { codeEquals: "625.6", description: "" },
                        { codeEquals: "618.00", description: "" },
                        { codeEquals: "618.01", description: "" },
                        { codeEquals: "618.02", description: "" },
                        { codeEquals: "618.03", description: "" },
                        { codeEquals: "618.04", description: "" },
                        { codeEquals: "618.2", description: "" },
                        { codeEquals: "618.3", description: "" },
                        { codeEquals: "618.4", description: "" },
                        { codeEquals: "618.84", description: "" },
                        { codeEquals: "618.9", description: "" },
                        { codeBeginsWith: "788.3", description: "" }
		]
	},
	frailtyIndex_GILiverDisease : {
		ICD9     : [
                        { codeEquals: "070.1", description: "" },
                        { codeEquals: "070.41", description: "" },
                        { codeEquals: "070.49", description: "" },
                        { codeEquals: "070.51", description: "" },
                        { codeEquals: "070.53", description: "" },
                        { codeEquals: "070.54", description: "" },
                        { codeEquals: "070.59", description: "" },
                        { codeEquals: "070.9", description: "" },
                        { codeEquals: "139.8", description: "" },
                        { codeEquals: "571.0", description: "" },
                        { codeEquals: "571.1", description: "" },
                        { codeEquals: "571.2", description: "" },
                        { codeEquals: "571.3", description: "" },
                        { codeEquals: "571.40", description: "" },
                        { codeEquals: "571.41", description: "" },
                        { codeEquals: "571.49", description: "" },
                        { codeEquals: "571.5", description: "" },
                        { codeEquals: "571.6", description: "" },
                        { codeEquals: "571.8", description: "" },
                        { codeEquals: "571.9", description: "" },
                        { codeEquals: "572.0", description: "" },
                        { codeEquals: "572.2", description: "" },
                        { codeEquals: "572.8", description: "" },
                        { codeEquals: "573.3", description: "" },
                        { codeEquals: "573.4", description: "" },
                        { codeEquals: "573.9", description: "" },
                        { codeEquals: "572.4", description: "" },
                        { codeEquals: "153.1", description: "" },
                        { codeEquals: "153.3", description: "" },
                        { codeEquals: "153.4", description: "" },
                        { codeEquals: "153.7", description: "" },
                        { codeEquals: "153.9", description: "" },
                        { codeEquals: "154.0", description: "" },
                        { codeEquals: "154.1", description: "" },
                        { codeEquals: "154.3", description: "" },
                        { codeEquals: "532.10", description: "" },
                        { codeEquals: "532.90", description: "" },
                        { codeEquals: "251.8", description: "" },
                        { codeEquals: "531.10", description: "" },
                        { codeEquals: "531.90", description: "" },
                        { codeEquals: "533.90", description: "" },
                        { codeEquals: "534.90", description: "" },
                        { codeEquals: "555.0", description: "" },
                        { codeEquals: "555.9", description: "" },
                        { codeEquals: "556.5", description: "" },
                        { codeEquals: "556.6", description: "" },
                        { codeEquals: "556.9", description: "" },
                        { codeEquals: "558.1", description: "" },
                        { codeBeginsWith: "070.3", description: "" }
                ]
	},
	frailtyIndex_oesophagusDisease : {
		ICD9     : [
                        { codeEquals: "530.0", description: "" },
                        { codeEquals: "530.11", description: "" },
                        { codeEquals: "530.20", description: "" },
                        { codeEquals: "530.21", description: "" },
                        { codeEquals: "530.3", description: "" },
                        { codeEquals: "530.5", description: "" },
                        { codeEquals: "530.6", description: "" },
                        { codeEquals: "530.7", description: "" },
                        { codeEquals: "530.9", description: "" }
		]
	},
	frailtyIndex_visualImpairment : {
		ICD9     : [
                        { codeEquals: "362.0", description: "" },
                        { codeEquals: "362.1", description: "" },
                        { codeEquals: "362.20", description: "" },
                        { codeEquals: "362.29", description: "" },
                        { codeEquals: "362.6", description: "" },
                        { codeEquals: "362.89", description: "" },
                        { codeEquals: "369.00", description: "" },
                        { codeEquals: "369.20", description: "" },
                        { codeEquals: "369.3", description: "" },
                        { codeEquals: "362.5", description: "" },
                        { codeEquals: "365.0", description: "" },
                        { codeEquals: "365.59", description: "" },
                        { codeEquals: "365.60", description: "" },
                        { codeEquals: "365.61", description: "" },
                        { codeEquals: "365.62", description: "" },
                        { codeEquals: "365.64", description: "" },
                        { codeEquals: "365.65", description: "" },
                        { codeBeginsWith: "365.1", description: "" },
                        { codeBeginsWith: "365.2", description: "" }
		            
		]
	},
	frailtyIndex_cataract : {
		ICD9     : [
                        { codeEquals: "366.00", description: "" },
                        { codeEquals: "366.10", description: "" },
                        { codeEquals: "366.16", description: "" },
                        { codeEquals: "366.18", description: "" },
                        { codeEquals: "366.20", description: "" },
                        { codeEquals: "366.3", description: "" },
                        { codeEquals: "366.41", description: "" },
                        { codeEquals: "366.45", description: "" },
                        { codeEquals: "366.46", description: "" },
                        { codeEquals: "366.5", description: "" },
                        { codeEquals: "366.8", description: "" },
                        { codeEquals: "366.9", description: "" }		            
		]
	},
	frailtyIndex_hearingImpairment : {
		ICD9     : [
                        { codeEquals: "388.01", description: "" },
                        { codeEquals: "388.10", description: "" },
                        { codeEquals: "388.12", description: "" },
                        { codeEquals: "388.2", description: "" },
                        { codeEquals: "389.00", description: "" },
                        { codeEquals: "389.10", description: "" },
                        { codeEquals: "389.14", description: "" },
                        { codeEquals: "389.16", description: "" },
                        { codeEquals: "389.20", description: "" },
                        { codeEquals: "389.7", description: "" },
                        { codeEquals: "389.8", description: "" },
                        { codeEquals: "389.9", description: "" }		            
		]
	},
	frailtyIndex_respiratoryProblems : {
		ICD9     : [
                        { codeEquals: "786.51", description: "" },
                        { codeEquals: "786.09", description: "" },
                        { codeEquals: "786.02", description: "" },
                        { codeEquals: "786.05", description: "" },
                        { codeEquals: "482.84", description: "" },
                        { codeEquals: "488.11", description: "" },
                        { codeEquals: "487.0", description: "" },
                        { codeEquals: "480.1", description: "" },
                        { codeEquals: "480.2", description: "" },
                        { codeEquals: "480.9", description: "" },
                        { codeEquals: "481", description: "" },
                        { codeEquals: "482.2", description: "" },
                        { codeEquals: "482.0", description: "" },
                        { codeEquals: "482.1", description: "" },
                        { codeEquals: "482.4", description: "" },
                        { codeEquals: "482.32", description: "" },
                        { codeEquals: "482.82", description: "" },
                        { codeEquals: "482.83", description: "" },
                        { codeEquals: "483.0", description: "" },
                        { codeEquals: "482.9", description: "" },
                        { codeEquals: "483.1", description: "" },
                        { codeEquals: "483.8", description: "" },
                        { codeEquals: "485", description: "" },
                        { codeEquals: "486", description: "" }		            
		]
	},
	frailtyIndex_anginaPectoris : {
		ICD9     : [
                        { codeEquals: "411.1", description: "" },
                        { codeEquals: "413.1", description: "" },
                        { codeEquals: "413.9", description: "" },
                        { codeEquals: "411.81", description: "" },
                        { codeEquals: "411.89", description: "" }		            
		]
	},
	frailtyIndex_myocardialDisease : {
		ICD9     : [
                        { codeEquals: "410.01", description: "" },
                        { codeEquals: "410.11", description: "" },
                        { codeEquals: "410.21", description: "" },
                        { codeEquals: "410.31", description: "" },
                        { codeEquals: "410.41", description: "" },
                        { codeEquals: "410.51", description: "" },
                        { codeEquals: "410.61", description: "" },
                        { codeEquals: "410.81", description: "" },
                        { codeEquals: "410.91", description: "" },
                        { codeEquals: "410.71", description: "" },
                        { codeEquals: "429.79", description: "" },
                        { codeEquals: "429.5", description: "" },
                        { codeEquals: "429.6", description: "" },
                        { codeEquals: "411.0", description: "" },
                        { codeEquals: "414.01", description: "" },
                        { codeEquals: "429.2", description: "" },
                        { codeEquals: "412", description: "" },
                        { codeEquals: "414.10", description: "" },
                        { codeEquals: "414.19", description: "" },
                        { codeEquals: "414.11", description: "" },
                        { codeEquals: "414.12", description: "" },
                        { codeEquals: "414.8", description: "" },
                        { codeEquals: "414.9", description: "" }		            
		]
	},
	frailtyIndex_dizziness : {
		ICD9     : [
                        { codeEquals: "780.2", description: "" },
                        { codeEquals: "078.81", description: "" },
                        { codeEquals: "386.0", description: "" },
                        { codeEquals: "386.11", description: "" },
                        { codeEquals: "386.12", description: "" },
                        { codeEquals: "386.19", description: "" },
                        { codeEquals: "386.9", description: "" },
                        { codeEquals: "386.3", description: "" },
                        { codeEquals: "458.1", description: "" },
                        { codeEquals: "458.0", description: "" },
                        { codeEquals: "458.9", description: "" },
                        { codeEquals: "780.4", description: "" }
                ]
	},
	frailtyIndex_TIACVA : {
		ICD9     : [
                        { codeEquals: "435.0", description: "" },
                        { codeEquals: "435.1", description: "" },
                        { codeEquals: "435.3", description: "" },
                        { codeEquals: "362.34", description: "" },
                        { codeEquals: "437.7", description: "" },
                        { codeEquals: "435.2", description: "" },
                        { codeEquals: "435.8", description: "" },
                        { codeEquals: "435.9", description: "" },
                        { codeEquals: "430", description: "" },
                        { codeEquals: "431", description: "" },
                        { codeEquals: "433.91", description: "" },
                        { codeEquals: "433.01", description: "" },
                        { codeEquals: "433.31", description: "" },
                        { codeEquals: "433.81", description: "" },
                        { codeEquals: "434.91", description: "" },
                        { codeEquals: "434.01", description: "" },
                        { codeBeginsWith: "432.", description: "" }
                 ]
	},
	frailtyIndex_vascularDisease : {
		ICD9     : [
                        { codeEquals: "433.20", description: "" },
                        { codeEquals: "433.00", description: "" },
                        { codeEquals: "433.10", description: "" },
                        { codeEquals: "433.90", description: "" },
                        { codeEquals: "434.00", description: "" },
                        { codeEquals: "434.10", description: "" },
                        { codeEquals: "434.90", description: "" },
                        { codeEquals: "443.29", description: "" },
                        { codeEquals: "437.3", description: "" },
                        { codeEquals: "437.0", description: "" },
                        { codeEquals: "437.9", description: "" },
                        { codeEquals: "440.0", description: "" },
                        { codeEquals: "440.1", description: "" },
                        { codeEquals: "440.9", description: "" },
                        { codeEquals: "440.4", description: "" },
                        { codeEquals: "443.0", description: "" },
                        { codeEquals: "443.1", description: "" },
                        { codeEquals: "443.89", description: "" },
                        { codeEquals: "443.9", description: "" },
                        { codeEquals: "444.01", description: "" },
                        { codeEquals: "444.09", description: "" },
                        { codeEquals: "444.1", description: "" },
                        { codeEquals: "444.22", description: "" },
                        { codeEquals: "415.12", description: "" },
                        { codeEquals: "415.13", description: "" },
                        { codeEquals: "415.19", description: "" },
                        { codeEquals: "451.0", description: "" },
                        { codeEquals: "451.19", description: "" },
                        { codeEquals: "451.9", description: "" },
                        { codeEquals: "452", description: "" },
                        { codeEquals: "453.0", description: "" },
                        { codeEquals: "453.1", description: "" },
                        { codeEquals: "459.1", description: "" },
                        { codeEquals: "530.9", description: "" },
                        { codeEquals: "446.0", description: "" },
                        { codeEquals: "446.4", description: "" },
                        { codeEquals: "446.1", description: "" },
                        { codeEquals: "446.2", description: "" },
                        { codeEquals: "446.6", description: "" },
                        { codeEquals: "446.7", description: "" },
                        { codeEquals: "446.5", description: "" },
                        { codeEquals: "447.5", description: "" },
                        { codeEquals: "441.0", description: "" },
                        { codeEquals: "441.2", description: "" },
                        { codeEquals: "441.4", description: "" },
                        { codeEquals: "441.5", description: "" },
                        { codeEquals: "441.9", description: "" },
                        { codeEquals: "442.82", description: "" },
                        { codeEquals: "442.83", description: "" },
                        { codeEquals: "442.89", description: "" },
                        { codeEquals: "447.0", description: "" },
                        { codeEquals: "447.2", description: "" },
                        { codeEquals: "447.3", description: "" },
                        { codeEquals: "447.8", description: "" },
                        { codeEquals: "447.6", description: "" },
                        { codeEquals: "447.9", description: "" },
                        { codeEquals: "448.9", description: "" },
                        { codeEquals: "456.0", description: "" },
                        { codeEquals: "456.1", description: "" },
                        { codeEquals: "456.4", description: "" },
                        { codeEquals: "456.6", description: "" },
                        { codeEquals: "459.2", description: "" },
                        { codeEquals: "459.9", description: "" },
                        { codeEquals: "459.89", description: "" },
                        { codeEquals: "785.51", description: "" },
                        { codeEquals: "785.50", description: "" }
            ]
	},
	frailtyIndex_fractureOsteoporosis : {
		ICD9     : [
                        { codeEquals: "874.2", description: "" },
                        { codeEquals: "874.3", description: "" },
                        { codeEquals: "900.9", description: "" },
                        { codeEquals: "879.0", description: "" },
                        { codeEquals: "879.1", description: "" },
                        { codeEquals: "901.9", description: "" },
                        { codeEquals: "862.8", description: "" },
                        { codeEquals: "902.9", description: "" },
                        { codeEquals: "867.8", description: "" },
                        { codeEquals: "926.11", description: "" },
                        { codeEquals: "903.9", description: "" },
                        { codeEquals: "904.8", description: "" },
                        { codeEquals: "904.9", description: "" },
                        { codeEquals: "929.9", description: "" },
                        { codeEquals: "959.9", description: "" },
                        { codeEquals: "814.11", description: "" },
                        { codeEquals: "814.00", description: "" },
                        { codeEquals: "818.1", description: "" },
                        { codeEquals: "825.0", description: "" },
                        { codeEquals: "825.1", description: "" },
                        { codeEquals: "825.21", description: "" },
                        { codeEquals: "825.29", description: "" },
                        { codeEquals: "825.39", description: "" },
                        { codeEquals: "825.25", description: "" },
                        { codeEquals: "825.35", description: "" },
                        { codeEquals: "826.0", description: "" },
                        { codeEquals: "826.1", description: "" },
                        { codeEquals: "825.20", description: "" },
                        { codeEquals: "825.30", description: "" },
                        { codeEquals: "802.0", description: "" },
                        { codeEquals: "802.1", description: "" },
                        { codeEquals: "802.4", description: "" },
                        { codeEquals: "802.5", description: "" },
                        { codeEquals: "802.2", description: "" },
                        { codeEquals: "802.3", description: "" },
                        { codeEquals: "807.5", description: "" },
                        { codeEquals: "805.00", description: "" },
                        { codeEquals: "807.2", description: "" },
                        { codeEquals: "807.3", description: "" },
                        { codeEquals: "807.4", description: "" },
                        { codeEquals: "805.6", description: "" },
                        { codeEquals: "805.7", description: "" },
                        { codeEquals: "733.0", description: "" },
                        { codeEquals: "733.03", description: "" },
                        { codeEquals: "579.3", description: "" },
                        { codeEquals: "733.09", description: "" },
                        { codeEquals: "733.00", description: "" },
                        { codeBeginsWith: "861.0", description: "" },
                        { codeBeginsWith: "959.1", description: "" },
                        { codeBeginsWith: "813.", description: "" },
                        { codeBeginsWith: "823.", description: "" },
                        { codeBeginsWith: "824.", description: "" },
                        { codeBeginsWith: "816.", description: "" },
                        { codeBeginsWith: "820.", description: "" },
                        { codeBeginsWith: "821.", description: "" },
                        { codeBeginsWith: "804.", description: "" },
                        { codeBeginsWith: "803.", description: "" },
                        { codeBeginsWith: "805.0", description: "" },
                        { codeBeginsWith: "805.1", description: "" },
                        { codeBeginsWith: "807.0", description: "" },
                        { codeBeginsWith: "807.1", description: "" },
                        { codeBeginsWith: "808.", description: "" },
                        { codeBeginsWith: "810.", description: "" },
                        { codeBeginsWith: "811.", description: "" },
                        { codeBeginsWith: "812.0", description: "" },
                        { codeBeginsWith: "812.1", description: "" },
                        { codeBeginsWith: "812.4", description: "" },
                        { codeBeginsWith: "812.5", description: "" },
                        { codeBeginsWith: "822.", description: "" }
		]
	},
	frailtyIndex_arthritisOsteoarthrosis : {
		ICD9     : [
                        { codeEquals: "714.1", description: "" },
                        { codeEquals: "714.2", description: "" },
                        { codeEquals: "714.0", description: "" },
                        { codeEquals: "714.30", description: "" },
                        { codeEquals: "720.0", description: "" },
                        { codeEquals: "715.25", description: "" },
                        { codeEquals: "715.35", description: "" },
                        { codeEquals: "715.95", description: "" },
                        { codeEquals: "716.50", description: "" },
                        { codeEquals: "715.04", description: "" },
                        { codeEquals: "715.00", description: "" },
                        { codeEquals: "715.90", description: "" },
                        { codeEquals: "715.34", description: "" },
                        { codeEquals: "715.94", description: "" },
                        { codeEquals: "715.11", description: "" },
                        { codeEquals: "715.30", description: "" },
                        { codeEquals: "715.90", description: "" },
                        { codeEquals: "715.10", description: "" },
                        { codeEquals: "715.20", description: "" },
                        { codeEquals: "715.28", description: "" },
                        { codeBeginsWith: "716.6", description: "" },
                        { codeBeginsWith: "716.2", description: "" }
		]
	},
	frailtyIndex_osteoarthrosisOfKnee : {
		ICD9     : [
                        { codeEquals: "715.26", description: "" },
                        { codeEquals: "715.36", description: "" },
                        { codeEquals: "715.96", description: "" },
		]
	},
	frailtyIndex_neurologicDisease : {
		ICD9     : [
                        { codeEquals: "340", description: "" },
                        { codeEquals: "333.4", description: "" },
                        { codeEquals: "334.0", description: "" },
                        { codeEquals: "334.3", description: "" },
                        { codeEquals: "334.8", description: "" },
                        { codeEquals: "334.9", description: "" },
                        { codeEquals: "335.9", description: "" },
                        { codeEquals: "335.10", description: "" },
                        { codeEquals: "333.0", description: "" },
                        { codeEquals: "333.85", description: "" },
                        { codeEquals: "333.72", description: "" },
                        { codeEquals: "333.79", description: "" },
                        { codeEquals: "333.83", description: "" },
                        { codeEquals: "333.81", description: "" },
                        { codeEquals: "333.89", description: "" },
                        { codeEquals: "331.11", description: "" },
                        { codeEquals: "331.19", description: "" },
                        { codeEquals: "330.8", description: "" },
                        { codeEquals: "331.82", description: "" },
                        { codeEquals: "331.83", description: "" },
                        { codeEquals: "331.6", description: "" },
                        { codeEquals: "331.89", description: "" },
                        { codeEquals: "331.9", description: "" },
                        { codeEquals: "330.9", description: "" },
                        { codeEquals: "341.9", description: "" },
                        { codeEquals: "336.2", description: "" },
                        { codeEquals: "352.9", description: "" },
                        { codeEquals: "359.1", description: "" },
                        { codeEquals: "359.0", description: "" },
                        { codeEquals: "359.9", description: "" },
                        { codeEquals: "359.4", description: "" },
                        { codeEquals: "359.3", description: "" },
                        { codeEquals: "333.71", description: "" },
                        { codeEquals: "344.1", description: "" },
                        { codeEquals: "344.89", description: "" },
                        { codeEquals: "337.9", description: "" },
                        { codeEquals: "742.8", description: "" },
                        { codeEquals: "331.3", description: "" },
                        { codeEquals: "331.5", description: "" },
                        { codeEquals: "331.4", description: "" },
                        { codeEquals: "349.82", description: "" },
                        { codeEquals: "348.0", description: "" },
                        { codeEquals: "348.1", description: "" },
                        { codeEquals: "348.2", description: "" },
                        { codeEquals: "348.5", description: "" },
                        { codeEquals: "331.81", description: "" },
                        { codeEquals: "336.0", description: "" },
                        { codeEquals: "336.1", description: "" },
                        { codeEquals: "336.9", description: "" },
                        { codeEquals: "349.89", description: "" },
                        { codeEquals: "349.9", description: "" },
                        { codeEquals: "727.7", description: "" },
                        { codeEquals: "792.2", description: "" },
                        { codeEquals: "V45.2", description: "" },
                        { codeEquals: "784.0", description: "" },
                        { codeEquals: "332.0", description: "" },
                        { codeEquals: "333.92", description: "" },
                        { codeEquals: "332.1", description: "" },
                        { codeEquals: "345.80", description: "" },
                        { codeEquals: "345.2", description: "" },
                        { codeEquals: "345.91", description: "" },
                        { codeEquals: "353.0", description: "" },
                        { codeEquals: "353.6", description: "" },
                        { codeEquals: "353.9", description: "" },
                        { codeEquals: "354.2", description: "" },
                        { codeEquals: "354.3", description: "" },
                        { codeEquals: "354.4", description: "" },
                        { codeEquals: "355.1", description: "" },
                        { codeEquals: "355.3", description: "" },
                        { codeEquals: "355.5", description: "" },
                        { codeEquals: "355.6", description: "" },
                        { codeEquals: "355.79", description: "" },
                        { codeEquals: "354.8", description: "" },
                        { codeEquals: "354.5", description: "" },
                        { codeEquals: "355.9", description: "" },
                        { codeEquals: "356.0", description: "" },
                        { codeEquals: "356.1", description: "" },
                        { codeEquals: "356.2", description: "" },
                        { codeEquals: "356.9", description: "" },
                        { codeEquals: "357.0", description: "" },
                        { codeEquals: "357.9", description: "" },
                        { codeEquals: "357.5", description: "" },
                        { codeBeginsWith: "335.2", description: "" },
                        { codeBeginsWith: "358.0", description: "" },
                        { codeBeginsWith: "359.2", description: "" },
                        { codeBeginsWith: "342.0", description: "" },
                        { codeBeginsWith: "342.1", description: "" },
                        { codeBeginsWith: "342.8", description: "" },
                        { codeBeginsWith: "342.9", description: "" },
                        { codeBeginsWith: "344.0", description: "" },
                        { codeBeginsWith: "344.6", description: "" },
                        { codeBeginsWith: "323.7", description: "" },
                        { codeBeginsWith: "348.3", description: "" },
                        { codeBeginsWith: "348.8", description: "" },
                        { codeBeginsWith: "346.1", description: "" },
                        { codeBeginsWith: "346.0", description: "" },
                        { codeBeginsWith: "346.4", description: "" },
                        { codeBeginsWith: "346.2", description: "" },
                        { codeBeginsWith: "346.8", description: "" },
                        { codeBeginsWith: "346.9", description: "" },
                        { codeBeginsWith: "345.5", description: "" },
                        { codeBeginsWith: "345.7", description: "" },
                        { codeBeginsWith: "345.9", description: "" },
                        { codeBeginsWith: "345.4", description: "" },
                        { codeBeginsWith: "345.1", description: "" },
                        { codeBeginsWith: "345.3", description: "" }

		]
	},
	frailtyIndex_depression: {
		ICD9     : [
		    	{ codeEquals: "300.9", description: "" },
			{ codeEquals: "799.25", description: "" },
			{ codeEquals: "296.21", description: "" },
			{ codeEquals: "296.22", description: "" },
			{ codeEquals: "296.23", description: "" },
			{ codeEquals: "296.24", description: "" },
			{ codeEquals: "298.0", description: "" },
			{ codeEquals: "296.20", description: "" },
			{ codeEquals: "311", description: "" },
			{ codeEquals: "300.4", description: "" },
			{ codeEquals: "301.12", description: "" },
			{ codeEquals: "296.99", description: "" },
			{ codeEquals: "296.90", description: "" }
		]
	},
	frailtyIndex_sleepDisturbance: {
		ICD9     : [
                        { codeEquals: "327.00", description: "" },
                        { codeEquals: "327.01", description: "" },
                        { codeEquals: "327.09", description: "" },
                        { codeEquals: "780.52", description: "" },
                        { codeEquals: "327.10", description: "" },
                        { codeEquals: "327.11", description: "" },
                        { codeEquals: "327.12", description: "" },
                        { codeEquals: "327.13", description: "" },
                        { codeEquals: "327.14", description: "" },
                        { codeEquals: "327.19", description: "" },
                        { codeEquals: "780.54", description: "" },
                        { codeEquals: "780.53", description: "" },
                        { codeEquals: "780.57", description: "" },
                        { codeEquals: "327.8", description: "" },
                        { codeEquals: "780.50", description: "" },
                        { codeEquals: "327.02", description: "" },
                        { codeEquals: "307.41", description: "" },
                        { codeEquals: "307.42", description: "" },
                        { codeEquals: "307.44", description: "" },
                        { codeEquals: "327.15", description: "" },
                        { codeEquals: "327.19", description: "" },
                        { codeEquals: "307.46", description: "" },
                        { codeEquals: "307.47", description: "" },
                        { codeEquals: "307.49", description: "" },
                        { codeBeginsWith: "327.3", description: "" },
                        { codeBeginsWith: "327.2", description: "" },
                        { codeBeginsWith: "347.1", description: "" }
		]
	},
	frailtyIndex_cognitiveImpairment: {
		ICD9     : [
                        { codeEquals: "780.97", description: "" },
                        { codeEquals: "780.93", description: "" },
                        { codeEquals: "797", description: "" },
                        { codeEquals: "V62.89", description: "" },
                        { codeEquals: "799.51", description: "" },
                        { codeEquals: "799.52", description: "" },
                        { codeEquals: "799.53", description: "" },
                        { codeEquals: "799.54", description: "" },
                        { codeEquals: "799.59", description: "" },
                        { codeEquals: "317", description: "" },
                        { codeEquals: "319", description: "" },
                        { codeEquals: "294.10", description: "" },
                        { codeEquals: "294.20", description: "" },
                        { codeEquals: "294.21", description: "" },
                        { codeEquals: "331.0", description: "" },
                        { codeBeginsWith: "318", description: "" },
                        { codeBeginsWith: "290.4", description: "" }
		]
	},
	frailtyIndex_psychiatricProblemsSubstanceAbuse: {
		ICD9     : [
                        { codeEquals: "293.0", description: "" },
                        { codeEquals: "293.1", description: "" },
                        { codeEquals: "293.84", description: "" },
                        { codeEquals: "310.9", description: "" },
                        { codeEquals: "310.8", description: "" },
                        { codeEquals: "310.2", description: "" },
                        { codeEquals: "295.30", description: "" },
                        { codeEquals: "295.10", description: "" },
                        { codeEquals: "295.20", description: "" },
                        { codeEquals: "295.90", description: "" },
                        { codeEquals: "295.60", description: "" },
                        { codeEquals: "295.00", description: "" },
                        { codeEquals: "295.80", description: "" },
                        { codeEquals: "295.40", description: "" },
                        { codeEquals: "301.22", description: "" },
                        { codeEquals: "297.1", description: "" },
                        { codeEquals: "296.00", description: "" },
                        { codeEquals: "296.01", description: "" },
                        { codeEquals: "296.02", description: "" },
                        { codeEquals: "296.03", description: "" },
                        { codeEquals: "296.04", description: "" },
                        { codeEquals: "296.40", description: "" },
                        { codeEquals: "296.41", description: "" },
                        { codeEquals: "296.42", description: "" },
                        { codeEquals: "296.43", description: "" },
                        { codeEquals: "296.44", description: "" },
                        { codeEquals: "296.50", description: "" },
                        { codeEquals: "296.51", description: "" },
                        { codeEquals: "296.52", description: "" },
                        { codeEquals: "296.54", description: "" },
                        { codeEquals: "296.60", description: "" },
                        { codeEquals: "296.61", description: "" },
                        { codeEquals: "296.62", description: "" },
                        { codeEquals: "296.63", description: "" },
                        { codeEquals: "296.4", description: "" },
                        { codeEquals: "296.7", description: "" },
                        { codeEquals: "296.80", description: "" },
                        { codeEquals: "301.10", description: "" },
                        { codeEquals: "301.13", description: "" },
                        { codeEquals: "300.01", description: "" },
                        { codeEquals: "300.02", description: "" },
                        { codeEquals: "300.00", description: "" },
                        { codeEquals: "291.0", description: "" },
                        { codeEquals: "291.3", description: "" },
                        { codeEquals: "291.5", description: "" },
                        { codeEquals: "291.82", description: "" },
                        { codeEquals: "291.89", description: "" },
                        { codeEquals: "291.9", description: "" },
                        { codeEquals: "291.1", description: "" },
                        { codeEquals: "291.2", description: "" },
                        { codeEquals: "291.81", description: "" },
                        { codeEquals: "331.7", description: "" },
                        { codeEquals: "292.2", description: "" },
                        { codeEquals: "292.12", description: "" },
                        { codeEquals: "292.81", description: "" },
                        { codeEquals: "292.82", description: "" },
                        { codeEquals: "292.84", description: "" },
                        { codeEquals: "292.85", description: "" },
                        { codeEquals: "292.89", description: "" },
                        { codeEquals: "292.9", description: "" },
                        { codeEquals: "292.0", description: "" },
                        { codeEquals: "292.11", description: "" },
                        { codeBeginsWith: "305.0", description: "" },
                        { codeBeginsWith: "303.9", description: "" },
                        { codeBeginsWith: "303.0", description: "" },
                        { codeBeginsWith: "305.1", description: "" },
                        { codeBeginsWith: "305.4", description: "" },
                        { codeBeginsWith: "304.1", description: "" },
                        { codeBeginsWith: "305.5", description: "" },
                        { codeBeginsWith: "304.0", description: "" },
                        { codeBeginsWith: "305.2", description: "" },
                        { codeBeginsWith: "304.3", description: "" },
                        { codeBeginsWith: "305.6", description: "" },
                        { codeBeginsWith: "305.7", description: "" },
                        { codeBeginsWith: "304.4", description: "" },
                        { codeBeginsWith: "305.3", description: "" },
                        { codeBeginsWith: "304.5", description: "" },
                        { codeBeginsWith: "305.9", description: "" },
                        { codeBeginsWith: "305.8", description: "" },
                        { codeBeginsWith: "304.6", description: "" }
		]
	},
	frailtyIndex_COPD: {
		ICD9     : [
                        { codeEquals: "492.0", description: "" },
                        { codeEquals: "492.8", description: "" },
                        { codeEquals: "491.20", description: "" },
                        { codeEquals: "493.20", description: "" },
                        { codeEquals: "496", description: "" }		            
		]
	},
	frailtyIndex_skinProblems: {
		ICD9     : [
                        { codeEquals: "053.8", description: "" },
                        { codeEquals: "053.9", description: "" },
                        { codeEquals: "696.1", description: "" },
                        { codeEquals: "696.3", description: "" },
                        { codeEquals: "454.0", description: "" },
                        { codeEquals: ".707.10", description: "" },
                        { codeEquals: "707.19", description: "" },
                        { codeEquals: "707.8", description: "" },
                        { codeEquals: "707.9", description: "" },
                        { codeBeginsWith: "053.1", description: "" },
                        { codeBeginsWith: "053.2", description: "" },
                        { codeBeginsWith: "707.0", description: "" }
		]
	},
	frailtyIndex_weightProblems: {
		ICD9     : [
                        { codeEquals: "783.3", description: "" },
                        { codeEquals: "783.1", description: "" },
                        { codeEquals: "783.21", description: "" },
                        { codeEquals: "799.4", description: "" },
                        { codeEquals: "278.00", description: "" },
                        { codeEquals: "278.03", description: "" },
                        { codeEquals: "278.00", description: "" },		            
		]
	},
	frailtyIndex_weightProblems: {
		ICD9     : [
                        { codeEquals: "783.3", description: "" },
                        { codeEquals: "783.1", description: "" },
                        { codeEquals: "783.21", description: "" },
                        { codeEquals: "799.4", description: "" },
                        { codeEquals: "278.00", description: "" },
                        { codeEquals: "278.03", description: "" },
                        { codeEquals: "278.00", description: "" },		            
		]
	},
	frailtyIndex_thyroidDisorders: {
		ICD9     : [
                        { codeEquals: "242.81", description: "" },
                        { codeEquals: "242.41", description: "" },
                        { codeEquals: "240.9", description: "" },
                        { codeEquals: "244.8", description: "" },
                        { codeEquals: "244.2", description: "" },
                        { codeEquals: "244.3", description: "" },
                        { codeEquals: "780.01", description: "" },
                        { codeEquals: "244.9", description: "" },
                        { codeBeginsWith: "242.0", description: "" },
                        { codeBeginsWith: "242.1", description: "" },
                        { codeBeginsWith: "242.2", description: "" },
                        { codeBeginsWith: "242.3", description: "" },
                        { codeBeginsWith: "242.9", description: "" }		            
		]
	},
	frailtyIndex_diabetesMellitus: {
		ICD9     : [
                        { codeEquals: "250.00", description: "" },
                        { codeEquals: "250.02", description: "" },
                        { codeEquals: "250.80", description: "" },
                        { codeEquals: "250.30", description: "" },
                        { codeEquals: "250.12", description: "" }		            
		]
	},
	frailtyIndex_urinaryDisease: {
		ICD9     : [
                        { codeEquals: "591", description: "" },
                        { codeEquals: "593.5", description: "" },
                        { codeEquals: "599.60", description: "" },
                        { codeEquals: "599.69", description: "" },
                        { codeEquals: "584.5", description: "" },
                        { codeEquals: "583.6", description: "" },
                        { codeEquals: "584.6", description: "" },
                        { codeEquals: "583.7", description: "" },
                        { codeEquals: "584.7", description: "" },
                        { codeEquals: "584.9", description: "" },
                        { codeEquals: "585.6", description: "" },
                        { codeEquals: "585.9", description: "" },
                        { codeEquals: "586", description: "" },
                        { codeEquals: "588.0", description: "" },
                        { codeEquals: "588.1", description: "" },
                        { codeEquals: "588.9", description: "" },
                        { codeEquals: "587", description: "" },
                        { codeEquals: "405.91", description: "" },
                        { codeEquals: "589.9", description: "" },
                        { codeEquals: "593.81", description: "" },
                        { codeEquals: "593.2", description: "" },
                        { codeEquals: "593.1", description: "" },
                        { codeEquals: "593.89", description: "" },
                        { codeEquals: "590.3", description: "" },
                        { codeEquals: "593.82", description: "" },
                        { codeEquals: "593.0", description: "" },
                        { codeEquals: "593.9", description: "" },
                        { codeEquals: "596.54", description: "" },
                        { codeEquals: "596.4", description: "" },
                        { codeEquals: "596.53", description: "" },
                        { codeEquals: "596.59", description: "" },
                        { codeEquals: "596.0", description: "" },
                        { codeEquals: "596.1", description: "" },
                        { codeEquals: "596.2", description: "" },
                        { codeEquals: "596.3", description: "" },
                        { codeEquals: "596.6", description: "" },
                        { codeEquals: "596.9", description: "" },
                        { codeEquals: "598.1", description: "" },
                        { codeEquals: "598.00", description: "" },
                        { codeEquals: "598.9", description: "" },
                        { codeEquals: "599.1", description: "" },
                        { codeEquals: "599.2", description: "" },
                        { codeEquals: "599.3", description: "" },
                        { codeEquals: "599.9", description: "" },
                        { codeEquals: "788.99", description: "" },
                        { codeBeginsWith: "593.7", description: "" },
                        { codeBeginsWith: "588.8", description: "" }	            
		]
	},
	frailtyIndex_prostrateProblems: {
		ICD9     : [
                        { codeEquals: "233.4", description: "" },
                        { codeEquals: "185", description: "" },
                        { codeBeginsWith: "600.0", description: "" },
                        { codeBeginsWith: "600.1", description: "" }		            
		]
	},
	frailtyIndex_socialProblems: {
		ICD9     : [
                        { codeEquals: "V60.2", description: "" },
                        { codeEquals: "V60.89", description: "" },
                        { codeEquals: "V60.9", description: "" },
                        { codeEquals: "V60.0", description: "" },
                        { codeEquals: "V60.1", description: "" },
                        { codeEquals: "V60.89", description: "" },
                        { codeEquals: "V60.9", description: "" },
                        { codeEquals: "V60.3", description: "" },
                        { codeEquals: "V62.4", description: "" },
                        { codeEquals: "V62.89", description: "" },
                        { codeEquals: "E928.1", description: "" },
                        { codeEquals: "V15.89", description: "" },
                        { codeEquals: "V61.9", description: "" },
                        { codeEquals: "V61.08", description: "" },
                        { codeEquals: "V61.49", description: "" },
                        { codeEquals: "V61.09", description: "" },
                        { codeEquals: "V61.8", description: "" },
                        { codeEquals: "V62.81", description: "" },
                        { codeEquals: "V62.89", description: "" },
                        { codeEquals: "V69.3", description: "" },
                        { codeEquals: "V69.8", description: "" },
                        { codeEquals: "V69.9", description: "" },
                        { codeEquals: "V65.2", description: "" },
                        { codeEquals: "995.82", description: "" },
                        { codeEquals: "V61.07", description: "" },
                        { codeEquals: "V62.82", description: "" },
                        { codeEquals: "V61.03", description: "" },
                        { codeBeginsWith: "E926", description: "" }
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
	hypertensionComplicated : {
		ICD9     : [
			{ codeEquals: "437.2", description: "" },
                        { codeBeginsWith: "402.", description: "" },
                        { codeBeginsWith: "403.", description: "" },
                        { codeBeginsWith: "405.", description: "" }
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

// http://search.loinc.org
// http://www.snomedbrowser.com
dictionary.observations = dictionary.observations || {
	bloodPressureDiastolic : {
		LOINC : [
			{ codeEquals : "8462-4", description : "Diastolic blood pressure" }
		],
		SNOMEDCT : [
			{ codeEquals : "271650006", description : "Diastolic blood pressure" }
		]
	},
	bloodPressureSystolic : {
		LOINC : [
			{ codeEquals : "8480-6", description : "Systolic blood pressure" }
		],
		SNOMEDCT : [
			{ codeEquals : "271649006", description : "Systolic blood pressure" }
		]
	},
	bodyMassIndex : {
		LOINC : [
			{ codeEquals : "39156-5", description : "" }
		],
		SNOMEDCT : [
			{ codeEquals : "60621009", description : "" }
		]
	},
	height : {
		LOINC : [
			{ codeEquals : "8302-2", description : "" }
		]
	},
	waistCircumference : {
		LOINC : [
			{ codeEquals : "56115-9", description : "" }
		],
		SNOMEDCT : [
			{ codeEquals : "276361009", description : "" }
		],
	},
	weight : {
		LOINC : [
			{ codeEquals : "3141-9", description : "" }
		]
	}
};
