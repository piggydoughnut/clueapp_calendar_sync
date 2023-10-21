import periodStore, { PeriodModel } from "./model";

import { createStore } from "easy-peasy";

const store = createStore<PeriodModel>(periodStore);

export default store;
