import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../sevices/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    //pega o id da categoria vindo do categoria.ts
    let categoria_id = this.navParams.get('categ_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        //retorna de um endpoint paginado(muitos valores) pegar somente do atributo "content" 
        this.items = response['content'];
      },
      error => {});

   
  }

}
