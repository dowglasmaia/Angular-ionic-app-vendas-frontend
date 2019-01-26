import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGrupo: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) 
    {
      this.formGrupo = this.formBuilder.group({
        /** cola os mesmos atributos que tem no formulario 
         * e as Validações seguindo o padrão que estar no Back-End  */
        nome: ['Kamilly Maia', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['km@live.com', [Validators.required, Validators.email]], 
        tipo: ['2', [Validators.required]],
        cpfOrCnpf: ['76566580093',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['abc', [Validators.required]],
        logradouro: ['Rua Pj', [Validators.required]],
        numero: ['55-b',[Validators.required]],
        complemtno: ['Apt-05', []],
        bairro: ['Centro', [Validators.required]],
        cep: ['74.666-000', [Validators.required]],
        telefone1: ['62-90000-8965',[Validators.required]],
        telefone2: ['61-95555-0011', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]],      

      });
    }

  signupUser(){
    console.log("Enviou o Form");
  }


}
