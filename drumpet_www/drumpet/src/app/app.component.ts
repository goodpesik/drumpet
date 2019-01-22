import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@NgModule({
  imports: [
      FormsModule      
  ]
})

export class AppComponent {
  title = 'drumpet';
  today: Date = new Date();
  langSetting: {}[] = [
    {name: 'ES', abbrev: 'es'},
    {name: 'EN', abbrev: 'en'}
  ];
  langSelectModel: {} = {
    lang: 'es'
  };
}
