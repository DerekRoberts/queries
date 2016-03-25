/**
* Query Title: HDC-0955
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults (20+) with hepatitis C
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 20,
    codeSet : dictionary.conditions.hepatitisC,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator ) {
      return denominator && conditions.hasRegex( patient, this.codeSet );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
