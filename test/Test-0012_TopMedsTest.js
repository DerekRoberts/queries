/**
 * MedTest
 * 
 * @param patient
 */
function map(patient) {

    
    
    
    // Query logic
    var query = {

	codeMap : function(patient, date, errorContainer) {
	    return medications.buildCodeMap(patient, date, errorContainer);
	},
	
	denominator : function(patient, date, errorContainer) {
	    return (profile.active( patient, date ) ? 1 : 0);
	},
	
	numerator : function(patient, date, denominator, codeSet, code, codeCount, errorContainer) {
	    if(denominator > 0) {
		return codeCount;
	    } else {
		return 0;
	    }
	}
    };
    // Emit results based on query above
    emitter.ratioCodeCount(patient, query);
}