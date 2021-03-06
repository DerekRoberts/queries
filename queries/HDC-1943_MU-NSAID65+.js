/**
 * Query Title: HDC-1943
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: Percentage of active patients, 65+, receiving an NSAID
 */
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.meds.antiinflammatory,
	minAge  : 65,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator && medications.hasActiveMed( patient, date, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
