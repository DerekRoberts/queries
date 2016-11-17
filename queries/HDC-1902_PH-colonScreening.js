/**
 * Query Title: HDC-0014
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, 50 <= age < 75,
 *              how many have a colon cancer screening in the last two years
 *              or a colonoscopy or sigmoidoscopy in the last five years?
 */
function map( pt ){

  // Query logic
  var query = {

    // Base variables
    minAge : 50,
    maxAge : 74.999,
    lab    : dictionary.labs.sigmoidoscopyOrColonoscopy,

    // Denominator logic
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) && profile.ages.isRange( pt, date, this.minAge, this.maxAge, err );
      },
    // Numerator logic
    numerator: function( pt, date, denominator, err ) {
      var minDate = utils.yearsBefore( date, 10 );
      var maxDate = date;

      return denominator && !labs.hasLabInDateRange( pt, minDate, maxDate, this.lab, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
