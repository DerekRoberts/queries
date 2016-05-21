/**
 * Query Title: HDC-0917
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, female, 18 <= age < 70,
 *              how many have a cervical cancer screening in the last 2y?
 */
function map( pt ){

  // Query logic
  var query = {

    // Base variables
    minAge : 18,
    maxAge : 69.999,
    lab    : dictionary.labs.cervicalCancer,

    // Denominator logic
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) && profile.ages.isRange( pt, date, this.minAge, this.maxAge, err );
      },
    // Numerator logic
    numerator: function( pt, date, denominator, err ) {
      var minDate = utils.yearsBefore( date, 2 );
      var maxDate = date;

      return denominator && labs.hasLabInDateRange( pt, minDate, maxDate, this.lab, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
