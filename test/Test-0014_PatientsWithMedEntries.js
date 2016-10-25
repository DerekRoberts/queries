/**
 * Numerator: The number of patients with at least one medication entry
 * Denominator: The number of patient entries.  
 */


function map(patient) {

	// Query logic
	var query = {

	    // Denominator
	    denominator : function(patient, date, errorContainer) {
		    return true;
	    },

	    // Numerator
	    numerator : function(patient, date, denominator, errorContainer) {
	    	var meds = patient.medications();

			    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {

				    return false;
			    } else {
			    	return true;
			    }
	    },
	};

	// Emit results based on query above
	emitter.ratio(patient, query);
}



/**
 * Numerator: The number of medication entries with a code that we check for
 * Denominator: The number of medication entries  
 */


function map(patient) {

	// Query logic
	var query = {

	    // Denominator
	    denominator : function(patient, date, errorContainer) {
	    	var meds = patient.medications();

			  return meds.length;
	    	
	    },

	    // Numerator
	    numerator : function(patient, date, denominator, errorContainer) {

	    	var meds = patient.medications();
	    	
		    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {

			    return false;
		    } else {
			    var matchingActivemeds = meds.filter(function(condition) {
				    if (!utils
				            .isUndefinedOrNullPath([ condition, ".json.codes.whoATC" ])
				            && (condition.json.codes.whoATC.length > 0)) {
					    // condition is coded
					    return true;
				    } else {
						    return false;
				    }
			    });

			    return matchingActivemeds.length;
		    }

	    },
	};

	// Emit results based on query above
	emitter.ratioCount(patient, query);
}