import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorangeService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storange: StorangeService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storange.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
        this.cliente = response as ClienteDTO;
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
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
      error => { });
  }

  //acioando a camero do dispositivo
  getCameraPicture() {

    this.cameraOn = true; // camera estar ligada

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false; // camera desligada
    }, (err) => {
     
    });

  }


  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
  }


}
