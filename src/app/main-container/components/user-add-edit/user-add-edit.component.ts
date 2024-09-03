import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { CustomInputComponent } from '@app/components';
import { emptyUser } from '@app/models';
import { GlobalStore } from '@app/store';

interface UserForm {
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  avatar: FormControl<string>;
}

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, RouterLink],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddEditComponent {
  id = input<number>();

  readonly store = inject(GlobalStore);
  _router = inject(Router);

  userToEdit = computed(
    () => this.store.getUser(Number(this.id())) ?? emptyUser
  );

  userForm: Signal<FormGroup> = computed(
    () => new FormGroup<UserForm>({
      first_name: new FormControl(this.userToEdit().first_name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      last_name: new FormControl(this.userToEdit().last_name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.userToEdit().email, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      avatar: new FormControl(this.userToEdit().avatar, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
  );

  async onSubmit(): Promise<void> {
    if (this.userForm().valid) {
      const user = {
        ...(this.id() ? { id: Number(this.id()) } : {}),
        ...this.userForm().value,
      };

      const methodToUse = this.id() ? 'updateUser' : 'addUser'

      await this.store[methodToUse](user);

      this.userForm().reset();
      this._router.navigate(['/users']);
    }
  }
}
