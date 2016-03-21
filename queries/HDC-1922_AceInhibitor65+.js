/**
 * Query Title: HDC-1922
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, on an active medication for angiotensin converting enzyme
 *              (ACE) inhibitors, excluding combinations.
 */
function map( patient ){

  // Query logic
  var query = {

    // Minimum age
    minAge: 65,

    // Active patient? Age?
    denominator: function( patient, date ){
      return activePatient( patient, date ) && ages.isMin( patient, date, this.minAge );
    },
    // Active statin?
    numerator: function( patient, date, denominator ) {
      return denominator && dictionary.hasActiveAceInhibitor( patient, date );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
