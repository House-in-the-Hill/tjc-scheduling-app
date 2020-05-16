import {
    CREATE_CALENDAR,
    EXTEND_CALENDAR,
    UPDATE_CURRENTLY_RENDERING_DATE,
} from '../actions';
import {
    createDateArray,
    extendDateArray,
} from '../../components/Calender/utils/calendarServices';
import { getXMonths } from '../../components/Calender/utils/calendarServices';

const initialState = {
    dateArray: [],
    today: new Date(),
    currentlyDisplayedMonth: new Date().getMonth(),
    renderedMonthRange: [getXMonths(new Date(), -3)[0], getXMonths(new Date(), 3)[2]],
    currentlyRenderingMonthYear: getXMonths(new Date(), -3)[0], //initializes rendering with first day of the desired range
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR:
            return {
                ...state,
                dateArray: createDateArray(
                    state.renderedMonthRange[0],
                    state.renderedMonthRange[1],
                ),
            };
        case EXTEND_CALENDAR:
            return {
                //extends datearray as well as make api call to populate data
                ...state,
                dateArray: extendDateArray(action.payload, state.dateArray),
            };
        case UPDATE_CURRENTLY_RENDERING_DATE:
            const nextMonth = state.currentlyRenderingMonthYear;
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            console.log('today', state.currentlyRenderingMonthYear);
            console.log('tomorrow', nextMonth);
            return {
                ...state,
                currentlyRenderingDate: nextMonth,
            };
        default:
            return state;
    }
};
