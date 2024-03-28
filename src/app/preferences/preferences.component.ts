import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  preferences: any  = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const scoreboxIP = params.get('scoreboxIP');
      // Check if scoreboxIP is null
      if (scoreboxIP === null) {
        console.error('scoreboxIP is null');
        return;
      }
      const url = `http://${scoreboxIP}/prefs`;

    this.http.get(url).subscribe(
      data => this.preferences = data,
      error => console.error(error)
    );
    });
  }

  onSubmit(formValues: any) {
    this.route.queryParamMap.subscribe(params => {
      const scoreboxIP = params.get('scoreboxIP');
      const url = `http://192.168.1.100/prefs`;
  
      this.http.post(url, formValues).subscribe(
        response => console.log(response),
        error => console.error(error)
      );
    });
  }
}
