import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TurmaService } from '../turma.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

  constructor(
    private turmaSrv: TurmaService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova turma';
  turma: any = {}; // Objeto vazio

  async ngOnInit() {
    try {
      let params = this.actRoute.snapshot.params;
      console.log(params);
      if(params['id']) { // Se houver um parâmetro "id" na rota
        // Busca a turma do id passado
        this.turma = await this.turmaSrv.obterUm(params['id']);
        // Alterar o título da página
        this.title = 'Editando turma';
      }
    }
    catch(error) {
      console.log(error);
    }

  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Nova turma criada com sucesso.'
        
        if(this.turma._id) { // Se tem _id, é edição
          await this.turmaSrv.atualizar(this.turma);
          msg = 'Turma atualizada com sucesso.'
        }
        else {
          await this.turmaSrv.novo(this.turma);
        }
        
        this.snackBar.open(msg, 'Entendi', {
          duration: 4000,
        });
        this.router.navigate(['/turma']); // Volta à página de listagem
      }
      catch(error) {
        console.error(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados!', 'Entendi', {
          duration: 4000,
        });
      }
    }
  }

}
