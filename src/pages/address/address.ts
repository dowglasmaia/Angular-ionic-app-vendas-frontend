import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorangeService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';


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
    public navParams: NavParams,
    public storage: StorangeService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
   
    // Buscar Endereços do Cliente Logado.
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
        this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {this.items = response['enderecos'];
       
        },
        error => {
          if (error.status == 403) {
              this.navCtrl.setRoot('HomePage'); // direciona para pagina Home(login) caso ocora um erro 403
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage'); // direciona para pagina Home(login) caso ocora um erro 403
    }
  }

}
