/**
 * Query Title: HDC-1948
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: Percentage of active patients receiving bendodiazepine and opioids
 */
function map( patient ){

  // Query logic
  var query = {

    // Variables
    med1   : dictionary.meds.benzodiazepine,
    med2   : dictionary.meds.opioid,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator &&
        medications.hasActiveMed( patient, date, this.med1, errorContainer )&&
        medications.hasActiveMed( patient, date, this.med2, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
