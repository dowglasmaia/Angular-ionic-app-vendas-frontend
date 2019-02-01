import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorangeService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storange: StorangeService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storange.getLocalUser();
    if (localUser && localUser.email){
        this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {this.cliente = response as ClienteDTO;
        this.getImageIfExists();
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

  /* Verificando de a Imagem Existe*/
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});
  }

}
