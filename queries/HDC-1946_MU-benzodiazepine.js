/**
 * Query Title: HDC-1946
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: Percentage of active patients receiving bendodiazepine
 */
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.meds.benzodiazepine,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator && medications.hasActiveMed( patient, date, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
