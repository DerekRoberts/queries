/**
 * Query Title: HDC-1995 Antidepressant Use
 * Query Type:  Ratio
 * Description: This metric shows the percentage of active patients that have an active 
 * medication for an antidepressant.
 */
function map( patient ){

  // Query logic
  var query = {

	antidepressant : dictionary.meds.antidepressant,

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
	 * Additional criteria: Antidepressant medication
	 */
        numerator: function( patient, date, denominator, errorContainer ) {
            var antidepressant = medications.hasActiveMed( patient, date, 
        	    this.antidepressant, errorContainer );
            
            return (denominator && antidepressant) 
        }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
