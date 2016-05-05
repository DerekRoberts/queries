
/**
 * ConditionsTest
 * 
 * @param patient
 */
function map(patient) {

    // Query logic
    var query = {

	// Med codes and age restraints
	codeSet : {
	    ICD9 : [ {
		codeBeginsWith : "1",
		description : "Test"
	    } /*
		 * , { codeBeginsWith: "2", description: "Test" }, {
		 * codeBeginsWith: "3", description: "Test" }, { codeBeginsWith:
		 * "4", description: "Test" }, { codeBeginsWith: "5",
		 * description: "Test" }, { codeBeginsWith: "6", description:
		 * "Test" }, { codeBeginsWith: "7", description: "Test" }, {
		 * codeBeginsWith: "8", description: "Test" }, { codeBeginsWith:
		 * "9", description: "Test" }, { codeBeginsWith: "0",
		 * description: "Test" }
		 */
	    ]
	},

	// Active patient? Age?
	denominator : function(patient, date, errorContainer) {
	    return true
	},
	// Active statin?
	numerator : function(patient, date, denominator, errorContainer) {
	    return denominator
		    && conditions.hasActiveCondition(patient, date,
			    this.codeSet, errorContainer);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
