import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPersons, addTask, getTask } from 'src/app/store/task.actions';
import { Task } from 'src/app/interface/task.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { selectActiveTask } from 'src/app/store/task.selectors';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormHelperService } from 'src/app/utils/services/form-helper.service';
import { uniqueNamesValidator } from 'src/app/utils/validators/uniqueName.validator';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  fb = inject(FormBuilder);
  store = inject(Store);
  router = inject (Router);
  activeRoute = inject(ActivatedRoute);
  formHelper = inject(FormHelperService);
  formTask: FormGroup = this.createForm();
  id: string | null = null;

  get persons() {
    return this.formTask.get('person') as FormArray;
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];

    if (this.id) {
      this.store.dispatch(getTask({ id: this.id }));

      this.store.select(selectActiveTask).subscribe(task => {
        if (task) {
          this.formTask.patchValue(task);
          task.person.forEach(person => {
            const personForm = this.fb.group({
              name: person.name,
              age: person.age,
              skills: this.fb.array(person.skills)
            });
            this.persons.push(personForm);
          });

          this.formTask.controls['name'].disable();
          this.formTask.controls['date'].disable();
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }

  createForm() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required]],
      status: ['PENDING'],
      person: this.fb.array([], uniqueNamesValidator())
    });
  }

  addPerson() {
    const person = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([])
    });
    (person.get('skills') as FormArray).push(this.fb.control('', [Validators.required]));
    this.persons.push(person);
  }

  addSkill(indexPerson: number) {
    const skill = this.fb.control('', [Validators.required]);
    (this.persons.at(indexPerson).get('skills') as FormArray).push(skill);
  }

  getSkills(indexPerson: number) {
    return this.persons.at(indexPerson).get('skills') as FormArray;
  }

  removePerson(indexPerson: number) {
    this.persons.removeAt(indexPerson);
  }

  removeSkill(indexPerson: number, indexSkill: number) {
    this.getSkills(indexPerson).removeAt(indexSkill);
  }

  castToFormControl(control: AbstractControl) {
    return control as FormControl;
  }

  getPersonFormGroup(index: number): FormGroup {
    return this.persons.at(index) as FormGroup;
  }

  onSubmit() {
    // console.log(this.formTask.value);
    // return;
    if (this.formTask.invalid) {
      this.formTask.markAllAsTouched();
      return;
    }

    if (this.id) {
      this.updateTask(this.id);
      return;
    }

    this.createTask();
  }

  createTask() {
    const task: Task = {
      ...this.formTask.value,
      id: crypto.randomUUID()
    }

    this.store.dispatch(
      addTask({
        task: task
      })
    )

    this.router.navigate(['/']);
  }

  updateTask(id: string) {
    const persons = this.formTask.value.person;
    this.store.dispatch(addPersons({id, persons}));

    this.router.navigate(['/']);
  }
}
