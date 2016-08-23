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
    minAge : 0,
    maxAge : 174.999,
    labOne : dictionary.labs.colonCancer,
    labTwo : dictionary.labs.sigmoidoscopyOrColonoscopy,

    // Denominator logic
    denominator: function( pt, date, err ){
      return profile.active( pt, date, err ) && profile.ages.isRange( pt, date, this.minAge, this.maxAge, err );
      },
    // Numerator logic
    numerator: function( pt, date, denominator, err ) {
      var back2y = utils.yearsBefore( date, 2 );
      var back5y = utils.yearsBefore( date, 5 );
      var cutoff = date;

      var checkOne = labs.hasLabInDateRange( pt, back2y, cutoff, this.labOne, err );
      var checkTwo = labs.hasLabInDateRange( pt, back5y, cutoff, this.labTwo, err );

      return denominator &&( checkOne || checkTwo );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
