import { Injectable } from '@angular/core';
import { GetAnimalsList } from './zoo.actions';
import { ZooService } from './../../zoo.service';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';

interface IZooStateModel {
  animals: any[];
  animalsLoading: boolean;
  animalsError: any;
}

@State<IZooStateModel>({
  name: 'zooState',
  defaults: {
    animals: null,
    animalsError: null,
    animalsLoading: false
  }
})

@Injectable()
export class ZooState {
  constructor(private store: Store, private zooService: ZooService) {}

  @Selector()
  static getAnimals({ animals }: IZooStateModel) {
    return animals;
  }


  @Selector()
  static getAnimalsLoading({ animalsLoading }: IZooStateModel) {
    return animalsLoading;
  }

  @Selector()
  static getAnimalsError({ animalsError }: IZooStateModel) {
    return animalsError;
  }

  @Action(GetAnimalsList)
  async getAnimalsList(
    { patchState }: StateContext<IZooStateModel>,
    { id }: GetAnimalsList
  ) {
    patchState({ animalsLoading: true, animalsError: undefined });
    /**
     * Recupera o token de outro estado para usar na requisição
     */
    // const token = this.store.selectSnapshot(UserState.getUserToken);

    /**
     * Recupera o id para utlizar na requisição
     */
    // const brokerId = this.store.selectSnapshot(UserState.getUserInformations).data.broker_id;

    try {
      const { data } = await this.zooService.getAnimals(id);

      patchState({ animals: data });
    } catch (error) {
      patchState({ animalsError: error });
    } finally {
      patchState({ animalsLoading: false });
    }
  }

}
