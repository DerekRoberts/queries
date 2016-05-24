/**
* Query Title: HDC-0801
* Query Type:  Ratio
* Initiative:  End of Life
* Description: Of active patients, 55+,
*              how many of them are end of life or in palliative care?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin     : 55,
    endOfLife  : dictionary.conditions.endOfLife,
    palliative : dictionary.conditions.palliativeCare,

    // Active patient? Age restraints?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator &&(
              conditions.hasActiveCondition( patient, date, this.endOfLife, err )||
              conditions.hasActiveCondition( patient, date, this.palliative, err )
      );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
