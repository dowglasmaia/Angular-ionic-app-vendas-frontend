import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  //Coleção de Endereços
  items: EnderecoDTO [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
     {
       id: '1',
       logradouro: 'Rua J',
       numero: '254',
       complemento: 'casa 5B',
       bairro: 'centro',
       cep: '65000-202',
       cidade: {
         id: '1',
         nome: 'Cascavel',
         estado: {
           id: '1',
           nome: 'Parana'
         }
       }
     },

     {
      id: '2',
      logradouro: 'Rua Central',
      numero: '254',
      complemento: 'casa 5B',
      bairro: 'Pq Alvorada',
      cep: '65000-302',
      cidade: {
        id: '1',
        nome: 'Cascavel',
        estado: {
          id: '1',
          nome: 'Parana'
        }
      }
    },

    ]
  }

}
