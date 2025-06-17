import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Contato {
  nome: string;
  email: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private storageInicializando = false;

  constructor(private storage: Storage) {
    this.inicializandoStorage();
   }

   private async inicializandoStorage() {
    await this.storage.create();
    this.storageInicializando = true
   }

   //Função para obter todos os contatos
   async obterContatos(): Promise<Contato[]>{
    if (!this.storageInicializando) await this.inicializandoStorage();
    return (await this.storage.get('contatos')) || [];
   }

   async adicionarContato(contato: Contato): Promise<void> {
    const contatos = await this.obterContatos();
    contatos.push(contato);
    await this.storage.set('contatos', contatos);
   }

   async atualizandoContato(indice: number, contato: Contato): Promise<void> {
    const contatos = await this.obterContatos();
    contatos[indice] = contato;
    await this.storage.set('contatos', contatos);
  }

    async excluirContato(indice: number): Promise<void> {
      const contatos = await this.obterContatos();
      contatos.splice(indice, 1);
      await this.storage.set('contatos', contatos);
    }
}
