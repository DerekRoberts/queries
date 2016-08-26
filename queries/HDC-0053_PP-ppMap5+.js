/**
* Query Title: HDC-0053
* Query Type:  Ratio
* Initiative:  Polypharmacy
* Description: Of active patients, 65+,
*              how many have 5+ active meds?
*/
function map( patient ){

    // Query logic
    var query = {

        /**
        * Minimum age
        */
        minAge  : 65,

        /**
        * Minimim number of medications
        */
        minMeds : 5,

        /**
        * Denominator
        *
        * Base criteria:
        *  - active patient
        *  - age constraint
        */
        denominator: function( patient, date, err ){
            return profile.active( patient, date, err ) &&
                profile.ages.isMin( patient, date, this.minAge, err );
        },

        /**
        * Numerator
        *
        * Additional criteria:
        * - count of active medications
        */
        numerator: function( patient, date, denominator, err ) {
            return denominator &&
                medications.activeMedMin( patient, date, this.minMeds, err );
        }
    };

    // Emit results based on query above
    emitter.ratio( patient, query );
}
