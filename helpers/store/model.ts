import { Action, action } from "easy-peasy";

export interface PeriodData {
  startDate: string;
  periodLength: number;
  cycleLength: number;
}
export interface PeriodModel {
  periodData: PeriodData;
  setPeriodData: Action<this, PeriodData>;
}

const periodStore: PeriodModel = {
  periodData: { startDate: "", periodLength: 0, cycleLength: 0 },
  setPeriodData: action((state, payload) => {
    state.periodData = payload;
  }),
};

export default periodStore;
