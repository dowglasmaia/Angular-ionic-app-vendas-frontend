import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

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
    public clienteService: ClienteService,
    public alertCtrl: AlertController
            ) {
        this.formGrupo = this.formBuilder.group({
        /** cola os mesmos atributos que tem no formulario 
         * e as Validações seguindo o padrão que estar no Back-End  */
        nome: ['Kamilly Maia', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['km@live.com', [Validators.required, Validators.email]], 
        tipoPessoa: ['2', [Validators.required]],
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
        estado: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]],      

      });
    }
    //listando os estados ao carregar a pagina
    ionViewDidLoad() {
      this.estadoService.findAll().subscribe(response=> {
        this.estados = response;
        
        //pegando o primeiro elemento da buscar e atribuindo a lista do  formulario
        this.formGrupo.controls.estado.setValue(this.estados[0].id);
        //atualizando a lista de cidades do estado selecionado        
        this.updateCidades();        
      },
      error => {});
    }

  //buscando as cidades correspondente ao Estado selecionado
  updateCidades() {
    //pegando o estado que estar selecionado na lista do formulario
    let estado_id = this.formGrupo.value.estado;

    this.cidadeService.findAll(estado_id).subscribe(response=> {
      this.cidades = response;
    
    },
    error => {});
  }

  // Salvando os Dados do Formulario no Banco de Dados
  signupUser(){
    this.clienteService.saveCli(this.formGrupo.value).subscribe(response => {
      this.showInsertOk();
    },
    error => {});
  }

    /*Alert para Messagen de Sucesso */
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop(); // desempilha a Pagina
        }
      }]
    });
    alert.present(); // apresenta o alert na Tela
  }


}
