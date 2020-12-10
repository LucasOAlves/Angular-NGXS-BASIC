import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZooService {
  constructor() {}

  getAnimals(animalId) {
    /**
     * Realiza a reequest para API;
     * Fazendo com mock só para exemplificar
     */
    return {
      data: [
        { id: 1, tipo: 'Cachorro', nome: 'Nome1' },
        { id: 2, tipo: 'Cachorro', nome: 'Nome2' },
      ],
    };
  }
}
