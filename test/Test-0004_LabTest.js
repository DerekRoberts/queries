/**
 * LabTest
 * 
 * @param patient
 */
function map(patient) {

    // Query logic
    var query = {

	// Med codes and age restraints
	codeSet : {
	    pCLOCD : [ {
		codeBeginsWith : "4",
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

	denominator : function(patient, date, errorContainer) {
	    return true
	},
	numerator : function(patient, date, denominator, errorContainer) {
	    // return denominator
	    // && labs.hasLab(patient, new Date(2015, 1, 1), date,
	    // this.codeSet, 0, 100, false, "mmol/L", false,
	    // errorContainer);
//	    return denominator
//		    && labs.hasLabInDateRange(patient, new Date(2015, 1, 1),
//			    date, this.codeSet, errorContainer);
	    return denominator
	    && labs.hasLab(patient, 
		    date, this.codeSet, errorContainer);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
