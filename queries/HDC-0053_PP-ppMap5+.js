/**
 * Query Title: HDC-0053
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: Of active patients, 65+,
 *              how many have 5+ active meds?
 */
function map( patient ){

  // Query logic
  var query = {

    // Age restraint and min med count
    minAge  : 65,
    minMeds : 5,

    // Active patient? Age?
    denominator: function( patient, date, err ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
      },
    // Active statin?
    numerator: function( patient, date, denominator, err ) {
      return denominator && medications.activeMedMin( patient, date, this.minMeds, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
