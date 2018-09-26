import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable()
export class DataService {

    constructor(
        private http: Http
    ) {}

    getPersons(): Observable<Person> | any {
        let localStorageItem = JSON.parse(localStorage.getItem('persons'));
        if (localStorageItem == null) {
            return this.http.get('https://private-f91e8-optimusbrasil.apiary-mock.com/users').pipe(map(res => {
                let listaPersons = res.json();
                let count = 0;
                listaPersons.forEach(res => {
                    res['id'] = count;
                    count++;
                });
                this.setLocalStoragePersons(listaPersons);
                return listaPersons;
            }));
        } else {
            return of(localStorageItem.persons);
        }
    }

    addPerson(paramPerson: Person) {
        let persons = JSON.parse(localStorage.getItem('persons')).persons;
        let lastId = parseInt(persons[persons.length - 1]['id']);
        paramPerson['id'] = lastId+1;
        persons.push(paramPerson);
        this.setLocalStoragePersons(persons);
    }
    editPerson(id: number, paramPerson: Person) {
        let persons = JSON.parse(localStorage.getItem('persons')).persons;
        const objIndex = persons.findIndex(res => res.id == id);
        persons[objIndex] = paramPerson;
        this.setLocalStoragePersons(persons);
    }

    removePerson(id: any): void {
        let persons = JSON.parse(localStorage.getItem('persons')).persons;
        persons = persons.filter(h => h.id != id);
        this.setLocalStoragePersons(persons);
    }

    setLocalStoragePersons(persons: Person[]) : void {
        localStorage.setItem('persons', JSON.stringify({persons: persons}));
    }
}