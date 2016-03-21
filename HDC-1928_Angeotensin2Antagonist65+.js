/**
 * Query Title: HDC-1928
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, have an active medication for an angiotensin 2 antagonist,
 *              excluding combinations.
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
      return denominator && dictionary.hasActiveAngeotensin2Antagonist( patient, date );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
