import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';

//decorator que informa para a aplicacao que esta classe é uma página,
//podendo ref. entre aspas, em forma de string, para trabalhar no
//modulo lazyload 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //fazer os bind deste objeto como os campos do login
  creds : CredenciaisDTO = {
    emai: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu:MenuController ) {

  }
  //desabilita o toggle menu quando entrar no login
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  //habilita o toggle menu quando sair da pag de login
   ionViewDidLeave() {
    this.menu.swipeEnable(true);
   }

  //faz a navegacao da home para pag categorias
  //push é o empilhamento das paginas
  login() {
    this.navCtrl.setRoot('CategoriasPage');
    
  }

 
  

}
