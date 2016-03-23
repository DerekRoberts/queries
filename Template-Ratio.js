/**
 * Query Title: HDC-...
 * Query Type:  Ratio
 * Initiative:  ...
 * Description: ...
 *              ...
 *              ...
 */
 function map( patient ){

   // Query logic
   var query = {

     // Variables
     thing1: ...,
     thing2: ...,
     thing3: ...

     // Active patient? Thing?
     denominator: function( patient, date ){
       return profile.active( patient, date ) && <library>.<function>( patient, date, this.thing1 );
     },
     // Other things?
     numerator: function( patient, date, denominator ) {
       return denominator && <library>.<function>( patient, date, this.thing2, this.thing3 );
     }
   };
   // Emit results based on query above
   emitter.ratio( patient, query );
 }
