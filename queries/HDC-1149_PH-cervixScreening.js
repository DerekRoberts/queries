/**
 * Query Title: HDC-1149
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, 21 <= age < 70, female,
 *              how many have had a cervical screening?
 */
function map( patient ){

  // Query logic
  var query = {

    // Age restraint and min med count
    minAge : 21,
    maxAge : 69.99,
    lab    : dictionary.labs.cevical,

    // Active patient? Age?
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) && profile.ages.isRange( pt, date, this.minAge, this.maxAge ) && profile.gender.isF( pt, err );
    },
    // Active statin?
    numerator: function( pt, date, denominator, err ) {
      return denominator && labs.hasLab( pt, date, this.lab, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
