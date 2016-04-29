/**
 * Query Title: HDC-1923
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This metric shows the percentage of active patients, 65 and over,
 *              has an active medication for a proton a pump inhibitor (PPI).
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    code   : dictionary.meds.PPI,
    minAge : 65,

    // Active patient? Age?
    denominator: function( patient, date, errorContainer ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
    },
    // Active statin?
    numerator: function( patient, date, denominator, errorContainer ) {
      return denominator && medications.hasActiveMed( patient, date, this.code, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
