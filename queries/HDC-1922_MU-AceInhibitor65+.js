/**
 * Query Title: HDC-1922
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, on an active medication for angiotensin converting enzyme
 *              (ACE) inhibitors, excluding combinations.
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    code   : dictionary.meds.aceInhibitor,
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
