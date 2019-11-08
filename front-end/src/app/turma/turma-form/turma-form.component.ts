import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TurmaService } from '../turma.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ProfessorService } from '../../professor/professor.service';
import { CursoService } from '../../curso/curso.service'; 

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private professorSrv: ProfessorService,
    private cursoSrv: CursoService
  ) { }

  title: string = 'Nova turma';
  turma: any = {}; // Objeto vazio

  professores: any = []; // Vetor vazio (preechimento de listagem)
  cursos: any = []; // Vetor vazio (preechimento de listagem)

  // Fonte de dados que *NÃO* vem do banco de dados
  diasSemana: any = [
    { _id: 'dom', nome: 'Domingo' },
    { _id: 'seg', nome: 'Segunda-feira' },
    { _id: 'ter', nome: 'Terça-feira' },
    { _id: 'qua', nome: 'Quarta-feira' },
    { _id: 'qui', nome: 'Quinta-feira' },
    { _id: 'sex', nome: 'Sexta-feira' },
    { _id: 'sáb', nome: 'Sábado' }
  ];

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

      this.professores = await this.professorSrv.listar();
      this.cursos = await this.cursoSrv.listar();

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
