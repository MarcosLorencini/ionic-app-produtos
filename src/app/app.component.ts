import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../sevices/auth.service';


//controlador da pagina app.html
//componete principal da aplicacao
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
//informa quem é a pág principal do app
//'HomePage' em string para usar a flex do layload
  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    //itens do menu 
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //onde os botoes do menu são criados a chamada deste método e no app.html
  openPage(page : {title:string, component:string}) {
    //quando clicar no botão logout chama o metodo logout para tirar o token do storage e direciona para home
    switch (page.title) {
      case 'Logout':
      this.auth.logout();
      this.nav.setRoot('HomePage');
      break;

      default:
      this.nav.setRoot(page.component);
     
    }
    
  }
}
