import moment from 'moment/min/moment-with-locales';
import Moment from 'react-moment';

// Sets the moment instance to use.
Moment.globalMoment = moment;

// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'fr';

export default Moment;