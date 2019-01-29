import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/Categoria.service';
import { categoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl; // pega o endereço das imgs do meu bucket do S3 da Amazon
  items: categoriaDTO[]; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  
  ionViewDidLoad() {
   this.categoriaService.findAll()
   .subscribe(response => {
     this.items = response; 
   },
   error => {}); 

  }
  //chama a pagina de Produtos com base na categoria do mesmo
  showProdutos(categoria_id: string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

}
