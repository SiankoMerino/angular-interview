import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalStore } from '@app/store';
import { RouterLink } from '@angular/router';
import { UserCardComponent } from './components';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [UserCardComponent, RouterLink],
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  readonly store = inject(GlobalStore)
}
