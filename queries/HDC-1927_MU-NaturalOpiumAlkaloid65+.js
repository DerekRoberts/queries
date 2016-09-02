/**
* Query Title: HDC-1927
* Query Type:  Ratio
* Initiative:  Med Use
* Description: Of active patients, 65+ and over,
*              how many have an active natural opium alkaloid (medication)?
*/
function map( patient ){

    // Query logic
    var query = {

        /**
        * Minimum age
        */
        minAge : 65,

        /**
        * Medication - natural optium alkaloid
        */
        code   : dictionary.meds.naturalOpiumAlkaloid,

        /**
        * Denominator
        *
        * Base criteria:
        *  - active patient
        *  - age constraint
        */
        denominator: function( patient, date, errorContainer ){
            return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
        },

        /**
        * Numerator
        *
        * Additional criteria:
        *  - active medication - natural optium alkaloid
        */
        numerator: function( patient, date, denominator, errorContainer ) {
            return denominator && medications.hasActiveMed( patient, date, this.code, errorContainer );
        }
    };
    // Emit results based on query above
    emitter.ratio( patient, query );
}
