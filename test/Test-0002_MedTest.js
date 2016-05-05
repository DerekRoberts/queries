/**
 * MedTest
 * 
 * @param patient
 */
function map(patient) {

    // Query logic
    var query = {

	// Med codes and age restraints
	codeSet : {
	    ATC : [ {
		codeBeginsWith : "A",
		description : "Test"
	    }, {
		codeBeginsWith : "B",
		description : "Test"
	    }, {
		codeBeginsWith : "C",
		description : "Test"
	    }, {
		codeBeginsWith : "D",
		description : "Test"
	    }, {
		codeBeginsWith : "E",
		description : "Test"
	    }, {
		codeBeginsWith : "F",
		description : "Test"
	    }, {
		codeBeginsWith : "G",
		description : "Test"
	    }, {
		codeBeginsWith : "H",
		description : "Test"
	    }, {
		codeBeginsWith : "I",
		description : "Test"
	    }, {
		codeBeginsWith : "J",
		description : "Test"
	    }

	    ]
	},

	// Active patient? Age?
	denominator : function(patient, date, errorContainer) {
	    return true
	},
	// Active statin?
	numerator : function(patient, date, denominator, errorContainer) {
	    return denominator
		    && medications.hasActiveMed(patient, date, this.codeSet,
			    errorContainer);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}