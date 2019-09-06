import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

//decorator que informa para a aplicacao que esta classe é uma página,
//podendo ref. entre aspas, em forma de string, para trabalhar no
//modulo lazyload 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //faz a navegacao da home para pag categorias
  //push é o empilhamento das paginas
  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
