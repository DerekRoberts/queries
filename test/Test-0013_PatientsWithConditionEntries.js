/**
 * Numerator: The number of patients with at least one condition entry
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
	    	 var conditions = patient.conditions();

			    if (utils.isUndefinedOrNull(conditions) || (conditions.length === 0)) {

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
 * Numerator: The number of condition entries with a code that we check for
 * Denominator: The number of condition entries  
 */

function map(patient) {

	// Query logic
	var query = {

	    // Denominator
	    denominator : function(patient, date, errorContainer) {
	    	 var conditions = patient.conditions();

			  return conditions.length;
	    	
	    },

	    // Numerator
	    numerator : function(patient, date, denominator, errorContainer) {

		    var conditions = patient.conditions();

		    if (utils.isUndefinedOrNull(conditions) || (conditions.length === 0)) {

			    return false;
		    } else {
			    var matchingActiveconditions = conditions.filter(function(condition) {
				    if (!utils
				            .isUndefinedOrNullPath([ condition, ".json.codes.ICD9" ])
				            && (condition.json.codes.ICD9.length > 0)) {
					    // condition is coded
					    return true;
				    } else {

					    if (!utils.isUndefinedOrNullPath([ condition,
					            ".json.codes.SNOMEDCT" ])
					            && (condition.json.codes.SNOMEDCT.length > 0)) {
						    // condition is coded
						    return true;
					    } else {

						    return false;
					    }

				    }
			    });

			    return matchingActiveconditions.length;
		    }

	    },
	};

	// Emit results based on query above
	emitter.ratioCount(patient, query);
}