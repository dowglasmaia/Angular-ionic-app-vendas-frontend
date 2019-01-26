import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],

  /* Declarando os Servicos de Cidade e Estado, de forma que os mesmos so estaram instanciado no escopo
    do Signup 
  */
  providers: [
    CidadeService,
    EstadoService
  ]

})

export class SignupPageModule {}
