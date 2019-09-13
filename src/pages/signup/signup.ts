import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { EstadoService } from '../../sevices/domain/estado.service';
import { CidadeService } from '../../sevices/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  //realzia validação do formulário
  formGroup: FormGroup
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  //FormBuilder instacia o FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

      //vai instanciar o FormGroup
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]]      
      });

  }

  //carraga os etados
  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        //pegar o 1 elemento da lista e atribuir a lista estadoId no formulario
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        //buscar as cidade correpondentes ao estado escolhido
        this.updateCidades();
      },
      error => {}); 

  }

  updateCidades() {
    //pega o id do estado que está selecionado no formulario
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        //desceliciona a cidade que estava selecionada, quando renderizou o formulario
        this.formGroup.controls.cidadeId.setValue(null);
      })
  }

  signupUser() {

  }
}
