/**
 * Query Title: HDC-1941 Medication Frequency Data Quality
 * Query Type: Ratio Code Count - Denominator Not Used 
 * Emits the units of frequency used to describe medications and their usage.
 * Note: QUery is not retroactive or date dependent.
 */
function map(patient) {
    // Query logic
    var query = {

	codeMap : function(patient, date, errorContainer) {
	    // Build map of codeset to be returned
	    var codesetMap = {};

	    // Get patient medication list
	    var meds =  patient.json.medications;

	    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
		utils.invalid("Patient has no meds", errorContainer);
		return codesetMap;
	    }
	    
	    //Examine each medication entry
	    var frequencyCode;
	    var frequencyCodeMap = {};
	    var timing;
	    meds.forEach(function(med) {
		
		// Determine the frequency code this med should be counted towards  
		timing = med.administrationTiming;
		if (!timing.frequency) {
		    frequencyCode = "noFrequency";
		} else if (!timing.frequency.numerator) {
		    frequencyCode = "noFrequencyNumerator";
		} else if (!timing.frequency.denominator) {
		    frequencyCode = "noFrequencyDenominator";
		} else if (!timing.frequency.numerator.value) {
		    frequencyCode = "noFrequencyNumeratorValue";
		} else if (!timing.frequency.denominator.unit) {
		    frequencyCode = "noFrequencyDenominatorUnit";
		} else if (!timing.frequency.denominator.value) {
		    frequencyCode = "noFrequencyDenominatorValue";
		} else {
		    frequencyCode = "frequencyDenominatorUnit_" + timing.frequency.denominator.unit;
		}		
		
		// Get previous count for frequency code
		var previousCount;
		if (frequencyCodeMap[frequencyCode] === undefined) {
		    previousCount = 0;
		} else {
		    previousCount = frequencyCodeMap[frequencyCode] ;
		}

		// Add to Map count
		frequencyCodeMap[frequencyCode] = previousCount + 1;
		
		
	    });

	    // save back to map
	    codesetMap["Frequency"] = frequencyCodeMap;

	    return codesetMap;
	},
	
	/**
	 * Always returns 0
	 */
	denominator : function(patient, date, errorContainer) {
	    return 0;
	},
	
	/**
	 * Always returns the count passed
	 */
	numerator : function(patient, date, denominator, codeSet, code, codeCount, errorContainer) {
		return codeCount;
	}
    };
    // Emit results based on query above
    emitter.ratioCodeCount(patient, query);
}