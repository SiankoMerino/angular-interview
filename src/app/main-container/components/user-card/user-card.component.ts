import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '@app/models';
import { GlobalStore } from '@app/store';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  user = input.required<IUser>();

  readonly store = inject(GlobalStore);

  removeUser(id: number) {
    this.store.removeUser(id);
  }

}
