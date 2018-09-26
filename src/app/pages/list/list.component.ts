import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public listaPersons: Person[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    
    this.dataService.getPersons().subscribe(res => this.listaPersons = res);
    
  }

}
