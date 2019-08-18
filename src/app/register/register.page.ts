import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  constructor(private router: Router, public firebaseauth: AngularFireAuth, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  register(form) {
    this.firebaseauth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(() => {
        firebase.database().ref('alunos/' + firebase.auth().currentUser.uid).set({
          nome: form.value.nome,
          matricula: form.value.matricula,
          turma: form.value.turma,
          email: form.value.email
        }).then(() => {
          this.exibirToast('Usuário criado com sucesso');
        });
      })
      .catch((erro: any) => {
        this.exibirToast(erro);
      });
  }

  private exibirToast(mensagem: string): void {
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
  }
}
