import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { MatDialog } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.scss']
})
export class ProfessorListComponent implements OnInit {

  /* Injeção de dependência do ProfessorService */
  constructor(
    private professorSrv: ProfessorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  professores: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome', 'telefone', 'email', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.professores = await this.professorSrv.listar();
      console.log(this.professores);
    }
    catch(erro) {
      console.error(erro);
    }
  }

  async excluir(id: string) {
    /* if(confirm('Deseja realmente excluir?')) {
      try {
        await this.professorSrv.excluir(id);
        this.ngOnInit(); // Força o recarregamento dos dados
        alert('Excluído com sucesso.');
      }
      catch(erro) {
        console.error(erro);
        alert('ERRO ao excluir.');
      }
    } */
    try {
      const dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: {question: 'Deseja realmente excluir este professor?'}
      });

      let result = await dialogRef.afterClosed().toPromise();
      
      if(result) {
        await this.professorSrv.excluir(id);
        this.ngOnInit(); // Força o recarregamento dos dados
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', {
          duration: 4000,
        });            
      }

    } 
    catch(error) {
      console.error(error);
      this.snackBar.open('ERRO: não foi possível excluir. Entre em contato com o suporte técnico.', 'Entendi', {
        duration: 4000,
      });
    }
  }

}
