/**
 * Query Title: HDC-1996 Antipsychotic Use
 * Query Type:  Ratio
 * Description: This metric shows the percentage of active patients that have 
 * an active medication for an antipsychotic.
 */
function map( patient ){

  // Query logic
  var query = {

	antipsychotic : dictionary.meds.antipsychotic,

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
	 * Additional criteria: antipsychotic medication
	 */
        numerator: function( patient, date, denominator, errorContainer ) {
            var antipsychotic = medications.hasActiveMed( patient, date, 
        	    this.antipsychotic, errorContainer );
            
            return (denominator && antipsychotic) 
        }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
