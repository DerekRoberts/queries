/**
* Query Title: HDC-0995
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Of active patients, female, 50 <= age < 70,
*              how many have a mammogram in the last 2y?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 50,
    ageMax  : 69.999,
    codeSet : dictionary.labs.mammogram,

    // Active patient? Thing?
    denominator: function( patient, date, errorContainer ){
      return profile.active( patient, date ) && profile.ages.isRange( patient, date, this.ageMin, this.ageMax, errorContainer ) && profile.gender.isF( patient, errorContainer );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      minDate = utils.yearsBefore( date, 2 );
      maxDate = date;

      return denominator && labs.hasLabInDateRange( patient, minDate, maxDate, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
