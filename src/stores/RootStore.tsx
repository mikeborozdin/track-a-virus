import DashboardStore from '../App/Dashboard/stores/DashboardStore';

export default class RootStore {
  public dashboardStore = new DashboardStore();
}

export interface AllStores {
  rootStore: RootStore;
}
