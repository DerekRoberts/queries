/**
 * Query Title: HDC-1927
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, have an active medication for a natural opium alkaloid.
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    code   : dictionary.meds.naturalOpiumAlkaloid,
    minAge : 65,

    // Active patient? Age?
    denominator: function( patient, date ){
      return activePatient( patient, date ) && ages.isMin( patient, date, this.minAge );
    },
    // Active statin?
    numerator: function( patient, date, denominator ) {
      return denominator && medications.hasActiveMed( patient, date, this.code );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
