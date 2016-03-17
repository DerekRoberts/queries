/**
 * Determines the gender of the patient and returns the appropriate string.
 * E2E does not support gender vs. time, so this function is not retroactive.
 * Genders are: ['male', 'female', 'undifferentiated', 'undefined']
 *
 * @param pt {Object} - The hQuery patient object.
 * @return {String} - The gender of the patient. Null is returned if no gender was found or there was an error.
 */

function getGender(pt) {

    if (!pt || !pt.json) {

        return null;

    }

    switch (pt.json.gender) {

        case 'M':
            return 'male';
            break;

        case 'F':
            return 'female';
            break;

        case 'UN':
            return 'undifferentiated';
            break;

        default:
            return 'undefined';
            break;

    }

}
