/**
 * Query Title: HDC-1997 Antibiotic Use 
 * Query Type:  Ratio
 * Description: This metric shows the percentage of active patients that have 
 * a medication for an antibiotic (subset with high microbial resistance) in the last year.
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
	 * Additional criteria: antibiotic medication in last year
	 */
        numerator: function( patient, date, denominator, errorContainer ) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;
            
            var antibiotic = medications.hasActiveMedInDateRange( patient, minDate, maxDate, 
        	    this.antibiotic, errorContainer );
            
            return (denominator && antibiotic) 
        }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
