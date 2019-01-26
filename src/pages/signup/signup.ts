import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGrupo: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
            ) {
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
    //listando os estados ao carregar a pagina
    ionViewDidLoad() {
      this.estadoService.findAll().subscribe(response=> {
        this.estados = response;
        
        //pegando o primeiro elemento da buscar e atribuindo a lista do  formulario
        this.formGrupo.controls.estadoId.setValue(this.estados[0].id);
        //atualizando a lista de cidades do estado selecionado        
        this.updateCidades();        
      },
      error => {});
    }

  //buscando as cidades correspondente ao Estado selecionado
  updateCidades() {
    //pegando o estado que estar selecionado na lista do formulario
    let estado_id = this.formGrupo.value.estadoId;

    this.cidadeService.findAll(estado_id).subscribe(response=> {
      this.cidades = response;
      
      //limpando o campo de cidade para receber a nova seleção
      //this.formGrupo.controls.cidadeId.setValue(null);
    },
    error => {});
  }

  signupUser(){
    console.log("Enviou o Form");
  }


}
