import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  preferences: any  = { };
  scoreboxIP: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.scoreboxIP = params.get('scoreboxIP');
      if (this.scoreboxIP === null) {
        console.log('scoreboxIP is null');  
        return;
      }
      const url = `http://${this.scoreboxIP}/prefs`;

      this.http.get(url).subscribe(
        data => this.preferences = data,
        error => console.error(error)
      );
    });
  }

  onSubmit(formValues: any) {
    this.route.queryParamMap.subscribe(params => {
      if (this.scoreboxIP === null) {
        console.error('scoreboxIP in onSubmit is null');
        return;
      }
      const url = `http://${this.scoreboxIP}/prefs`;
  
      this.http.post(url, formValues).subscribe(
        response => console.log(response),
        error => console.error(error)
      );
    });
  }
}
