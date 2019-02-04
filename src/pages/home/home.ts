import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Crediciais de Usuario e Senha, Para Login
creds : CredenciaisDTO = {
  email: "",
  senha: ""
};


  constructor(
      public navCtrl: NavController, 
      public menu: MenuController,
      public auth: AuthService) {

  }
  
    /* Desabilta o Menu ao Entra na Pagina de Login*/
  ionViewWillEnter() {    
       this.menu.swipeEnable(false);  
      
      } 
 
    /* Habilta o Menu ao Entra na Pagina de Login*/
  ionViewDidLeave() {     
      this.menu.swipeEnable(true); 
    
    } 

    /* Definindo o Ciclo de Vinda do Usuario Logado - Mantendo o mesmo logado, se o toke ainda esiver valido   */ 
    ionViewDidEnter() {
      this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('ProfilePage');
    },
    error => {})
    
    }
  

  /* Metodo de Login - com Usuario autenticando com token valido*/
  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
    this.auth.successfulLogin(response.headers.get('Authorization'));
    this.navCtrl.setRoot('ProfilePage');
    },
    error => {})
    
  }

  // Faz a Navegação para a Pagina de Cadastro de Cliente
  signup() {
    this.navCtrl.push('SignupPage');
  }

}
