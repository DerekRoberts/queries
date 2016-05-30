/**
* Query Title: HDC-0761
* Query Type:  Ratio
* Initiative:  End of Life
* Description: Of active patients,
*              how many are currently at risk of death?
*              (55+, condition: end of life or palliative care)
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
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator && profile.ages.isMin( patient, date, this.ageMin )&&
      (
        conditions.hasActiveCondition( patient, date, this.endOfLife, err )||
        conditions.hasActiveCondition( patient, date, this.palliative, err )
      );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
