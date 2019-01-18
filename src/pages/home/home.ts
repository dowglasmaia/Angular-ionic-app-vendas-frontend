import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
  
    /* Desabilta o Menu ao Entra na Pagina de Login*/
  ionViewWillEnter() {    
       this.menu.swipeEnable(false);   } 
 
    /* Habilta o Menu ao Entra na Pagina de Login*/
  ionViewDidLeave() {     
      this.menu.swipeEnable(true);  } 

  /* Metodo de Login*/
  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
