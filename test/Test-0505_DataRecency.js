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
	 * Not currently used. Always returns 0.
	 */
	denominator : function(patient, date, errorContainer) {
	    return 0;
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
		var currentTimestamp = Date.now() / 1000;
		var ageDays = (currentTimestamp - mostRecent) / 60 / 60 / 24;

		return ageDays;
	    }
	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
