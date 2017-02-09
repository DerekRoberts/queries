/**
 * Query Title: Test-0505 Data Recency
 * Query Type: Ratio - Denominator not used 
 * Description: The number of days between the current time and 
 * when the latest patient encounter was recorded for a practitioner.
 * 
 * Note that this indicator includes a custom reduce function as well as a map
 * function.
 * 
 */
function reduce(key, values) {
    // Result is the minimum from the values for each patient 
    var min = null;
    values.forEach(function(item, index, array) {
	if (min === null) {
	    min = item;
	} else if (!(item === null) && (item < min)) {
	    min = item;
	}
    });

    return min;
}

function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * The unix timestamp of when the latest patient encounter was recorded
	 * for a practitioner. Stored as the negative value in order to work
	 * with the same reduce function as the numerator
	 */
	denominator : function(patient, date, errorContainer) {
		var mostRecent = profile.mostRecentEncounter(patient,
			    errorContainer);
		    if (mostRecent === null) {
		    	// none was found
		    	return null;
		    } else {
		    	return (-1.0) * mostRecent;
		    }
	},

	/**
	 * Numerator
	 * 
	 * The number of days between the current time and when the latest
	 * patient encounter was recorded for a practitioner.
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var mostRecent = profile.mostRecentEncounter(patient,
		    errorContainer);
	    if (mostRecent === null) {
	    	// none was found
	    	return null;
	    } else {
	    	// calculate age in days
	    	var currentTimestamp = Date.now() / 1000.0;
	    	var ageDays = Math.ceil((currentTimestamp - mostRecent) / 60.0 / 60.0 / 24.0);

	    	return ageDays;
	    }
	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}