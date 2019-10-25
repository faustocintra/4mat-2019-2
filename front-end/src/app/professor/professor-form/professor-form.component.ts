import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent implements OnInit {

  constructor() { }

  title: string = 'Novo professor';
  professor: any = {}; // Objeto vazio

  ngOnInit() {
  }

}
