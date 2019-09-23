import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../sevices/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../sevices/domain/cart.service';
import { race } from 'rxjs/operator/race';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  //carregar os dados do produto
  ionViewDidLoad() {
    let produto_id = this.navParams.get('prod_id');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageIfExists();
      },
      error => {});
  }

  //chama este método para buscar a imagem grande do detalhe do produto e seta a url na variavel após retornar os dados do produto
  getImageIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
    error => {});

  }

  //recebe um produto e add no carrinho
  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
