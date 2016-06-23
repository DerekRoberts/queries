/**
 * Query Title: Test-0500 DQ-MaxFrailtyIndex
 * Query Type:  Ratio
 * Description: The maximum number of frailty index conditions for a patient over the max number 
 * of any conditions for a patient. 
 * Note that this indicator includes a custom reduce function as well as a map function.
 * 
 * This query is highly related to HDC-0002 and HDC-0840
 */
function reduce(key, values) {
    // This indicator is the maximum value for a single patient in the practice
    var max = 0;
    values.forEach(function(item, index, array) {
	if (item > max) {
	    max = item;
	}
    });
    return max;
}

function map(patient) {

    // Query logic
    var query = {

	    frailtyIndex_generalComplaints: dictionary.conditions.frailtyIndex_generalComplaints,
		frailtyIndex_neoplasmOther: dictionary.conditions.frailtyIndex_neoplasmOther,
		frailtyIndex_incontinence: dictionary.conditions.frailtyIndex_incontinence,
		frailtyIndex_GILiverDisease: dictionary.conditions.frailtyIndex_GILiverDisease,
		frailtyIndex_oesophagusDisease: dictionary.conditions.frailtyIndex_oesophagusDisease,
		frailtyIndex_visualImpairment: dictionary.conditions.frailtyIndex_visualImpairment,
		frailtyIndex_cataract: dictionary.conditions.frailtyIndex_cataract,
		frailtyIndex_hearingImpairment: dictionary.conditions.frailtyIndex_hearingImpairment,
		frailtyIndex_respiratoryProblems: dictionary.conditions.frailtyIndex_respiratoryProblems,
		frailtyIndex_anginaPectoris: dictionary.conditions.frailtyIndex_anginaPectoris,
		frailtyIndex_myocardialDisease: dictionary.conditions.frailtyIndex_myocardialDisease,
	        congestiveHeartFailure: dictionary.conditions.congestiveHeartFailure,
		atrialFibrillationFlutter: dictionary.conditions.atrialFibrillationFlutter,
		hypertension: dictionary.conditions.hypertension,
		hypertensionComplicated: dictionary.conditions.hypertensionComplicated,
		frailtyIndex_dizziness: dictionary.conditions.frailtyIndex_dizziness,
		frailtyIndex_TIACVA: dictionary.conditions.frailtyIndex_TIACVA,
		frailtyIndex_vascularDisease: dictionary.conditions.frailtyIndex_vascularDisease,
		frailtyIndex_fractureOsteoporosis: dictionary.conditions.frailtyIndex_fractureOsteoporosis,
		frailtyIndex_arthritisOsteoarthrosis: dictionary.conditions.frailtyIndex_arthritisOsteoarthrosis,
		frailtyIndex_osteoarthrosisOfKnee: dictionary.conditions.frailtyIndex_osteoarthrosisOfKnee,
		frailtyIndex_neurologicDisease: dictionary.conditions.frailtyIndex_neurologicDisease,
		frailtyIndex_depression: dictionary.conditions.frailtyIndex_depression,
		frailtyIndex_sleepDisturbance: dictionary.conditions.frailtyIndex_sleepDisturbance,
		frailtyIndex_cognitiveImpairment: dictionary.conditions.frailtyIndex_cognitiveImpairment,
		frailtyIndex_psychiatricProblemsSubstanceAbuse: dictionary.conditions.frailtyIndex_psychiatricProblemsSubstanceAbuse,
		frailtyIndex_COPD: dictionary.conditions.frailtyIndex_COPD,
		asthma: dictionary.conditions.asthma,
		frailtyIndex_skinProblems: dictionary.conditions.frailtyIndex_skinProblems,
		frailtyIndex_weightProblems: dictionary.conditions.frailtyIndex_weightProblems,
		frailtyIndex_thyroidDisorders: dictionary.conditions.frailtyIndex_thyroidDisorders,
		frailtyIndex_diabetesMellitus: dictionary.conditions.frailtyIndex_diabetesMellitus,
		frailtyIndex_urinaryDisease: dictionary.conditions.frailtyIndex_urinaryDisease,
		frailtyIndex_prostrateProblems: dictionary.conditions.frailtyIndex_prostrateProblems,
		frailtyIndex_socialProblems: dictionary.conditions.frailtyIndex_socialProblems,	    
	/**
	 * Denominator
	 * 
	 * total number of any condition
	 */
	denominator : function(patient, date, errorContainer) {
	    return conditions.count(patient, date, false, errorContainer);
	},

	/**
	 * Numerator
	 * 
	 * Total frailty index conditions for a patient 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var deficitCount = 0;

		var deficits = [this.frailtyIndex_generalComplaints,
		                this.frailtyIndex_neoplasmOther,
		                this.frailtyIndex_incontinence,
		                this.frailtyIndex_GILiverDisease,
		                this.frailtyIndex_oesophagusDisease,
		                this.frailtyIndex_visualImpairment,
		                this.frailtyIndex_cataract,
		                this.frailtyIndex_hearingImpairment,
		                this.frailtyIndex_respiratoryProblems,
		                this.frailtyIndex_anginaPectoris,
		                this.frailtyIndex_myocardialDisease,
		                this.congestiveHeartFailure,
		                this.atrialFibrillationFlutter,
		                this.hypertension,
		                this.hypertensionComplicated,
		                this.frailtyIndex_dizziness,
		                this.frailtyIndex_TIACVA,
		                this.frailtyIndex_vascularDisease,
		                this.frailtyIndex_fractureOsteoporosis,
		                this.frailtyIndex_arthritisOsteoarthrosis,
		                this.frailtyIndex_osteoarthrosisOfKnee,
		                this.frailtyIndex_neurologicDisease,
		                this.frailtyIndex_depression,
		                this.frailtyIndex_sleepDisturbance,
		                this.frailtyIndex_cognitiveImpairment,
		                this.frailtyIndex_psychiatricProblemsSubstanceAbuse,
		                this.frailtyIndex_COPD,
		                this.asthma,
		                this.frailtyIndex_skinProblems,
		                this.frailtyIndex_weightProblems,
		                this.frailtyIndex_thyroidDisorders,
		                this.frailtyIndex_diabetesMellitus,
		                this.frailtyIndex_urinaryDisease,
		                this.frailtyIndex_prostrateProblems,
		                this.frailtyIndex_socialProblems];
		
		
		for(var deficitCtr = 0; deficitCtr < deficits.length; deficitCtr++) {
		    
			deficitCount += conditions.getActiveConditionCount(patient, date,
				deficits[deficitCtr], errorContainer);  
		    
		}	    
	    return deficitCount;

	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
