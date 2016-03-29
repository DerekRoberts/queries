/**
* Query Title: HDC-1788
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage with osteoarthritis
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.conditions.osteoartitis,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator ) {
      return denominator && conditions.hasRegex( patient, this.codeSet );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
