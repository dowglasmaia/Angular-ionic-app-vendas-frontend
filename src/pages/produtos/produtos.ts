import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    /* pegando o parametro que é passado na na pagina de Categorias */
    let categoria_id = this.navParams.get('categoria_id');

    /* listando os produtos com base na sua categoria e abrindo a pagina  de produtos*/
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {
      this.items = response['content'];
    },
    error => {});

  }

}
