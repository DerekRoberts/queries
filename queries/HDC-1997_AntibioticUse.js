/**
 * Query Title: HDC-1997 Antibiotic Use 
 * Query Type:  Ratio
 * Description: This metric shows the percentage of active patients that have 
 * an active medication for an antibiotic (subset with high microbial resistance).
 */
function map( patient ){

  // Query logic
  var query = {

	antibiotic : dictionary.meds.antibiotic,

	/**
	 * Denominator
	 *
	 * Base criteria: Active Patients
	 */
        denominator: function( patient, date, errorContainer ){
            return profile.active( patient, date );
        },

	/**
	 * Numerator
	 *
	 * Additional criteria: antibiotic medication
	 */
        numerator: function( patient, date, denominator, errorContainer ) {
            var antibiotic = medications.hasActiveMed( patient, date, 
        	    this.antibiotic, errorContainer );
            
            return (denominator && antibiotic) 
        }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
