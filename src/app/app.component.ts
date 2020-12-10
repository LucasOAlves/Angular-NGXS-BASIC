import { GetAnimalsList } from './store/zoo-state/zoo.actions';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { ZooState } from './store/zoo-state/zoo.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngxs-initial';

  /**
   * Pode ser utilizado como observable normal dentro do cóodigo
   * Pode ser utilizado no html com pipe async
   */
  @Select(ZooState.getAnimals) animals$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.animals$.subscribe((animal) => {
      console.log('Observable', animal);
    });

    const animals = this.store.selectSnapshot(ZooState.getAnimals);
    console.log('Animals', animals);

    /**
     * Chamando loading direto no código.
     * Pode ser criado semelhante ao @Select na linha 19
     */
    this.store.select(ZooState.getAnimalsLoading).subscribe((loading) => {
      if (!loading) {
        const animalsAfterLoad = this.store.selectSnapshot(ZooState.getAnimals);
        console.log('After load', animalsAfterLoad);
      }
    });

    /**
     * Action de exemplo para recuperar os animals da API
     */
    this.store.dispatch(new GetAnimalsList(1));
  }
}
