import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public param: any;
  public form: FormGroup;
  public edit: boolean;

  constructor(
    private dataService: DataService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.route.snapshot.params['id']) {
      let persons = JSON.parse(localStorage.getItem('persons')).persons;
      this.param = persons.filter(res => res.id == this.route.snapshot.params['id'])[0];
      this.edit = true;
    }

    this.form = this._fb.group({
      id: [(this.param ? this.param.id : null)],
      name: [(this.param ? this.param.name : null), [Validators.required]],
      cpf: [(this.param ? this.param.cpf : null), [Validators.required]],
      phone: [(this.param ? this.param.phone : null), [Validators.required]],
      email: [(this.param ? this.param.email : null), [Validators.required, Validators.email]]
    });
  }

  submitPerson() {
    if (!this.edit) {
      this.dataService.addPerson(this.form.value);
    } else {
      this.dataService.editPerson(this.route.snapshot.params['id'], this.form.value);
    }
    this.router.navigate(['/list']);
  }

  removePerson() {
    this.dataService.removePerson(this.route.snapshot.params['id']);
    this.router.navigate(['/list']);
  }

}
