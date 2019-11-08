import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProfessorService } from '../professor.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {

  constructor(
    private professorSrv: ProfessorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  title: string = 'Novo professor';
  professor: any = {}; // Objeto vazio

  async ngOnInit() {
    try {
      let params = this.actRoute.snapshot.params;
      console.log(params);
      if(params['id']) { // Se houver um parâmetro "id" na rota
        // Busca o professor do id passado
        this.professor = await this.professorSrv.obterUm(params['id']);
        // Alterar o título da página
        this.title = 'Editando professor';
      }
    }
    catch(error) {
      console.log(error);
    }

  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Novo professor criado com sucesso.'
        
        if(this.professor._id) { // Se tem _id, é edição
          await this.professorSrv.atualizar(this.professor);
          msg = 'Professor atualizado com sucesso.'
        }
        else {
          await this.professorSrv.novo(this.professor);
        }
        
        this.snackBar.open(msg, 'Entendi', {
          duration: 4000,
        });
        this.router.navigate(['/professor']); // Volta à página de listagem
      }
      catch(error) {
        console.error(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados!', 'Entendi', {
          duration: 4000,
        });
      }
    }
  }

  async voltar(form: NgForm) {
    let result = true;
    // form.dirty: o formulário foi alterado via código (está "sujo")
    // form.touched: o formulário foi alterado pelo usuário
    if(form.dirty && form.touched) {
      try {
        const dialogRef = this.dialog.open(ConfirmDlgComponent, {
          width: '50%',
          data: {question: 'Há dados não salvos. Deseja realmente voltar?'}
        });
        result = await dialogRef.afterClosed().toPromise();
      }
      catch(error) {
        console.error(error);
      }
    }
    if(result) {
      this.router.navigate(['/professor']); // Volta para a listagem
    }
  }

}
