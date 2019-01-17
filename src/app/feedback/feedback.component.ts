import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  sendFeedback(): void {
    this.api.postFeedback(this.model).subscribe(
      res => {
        alert("Feedback Sent!");
        location.reload();
      },
      err => {
        alert("Error: Feedback Was Not Sent !!!");
      }
    );
  }

}

export interface FeedbackViewModel {
  name: string;
  email: string;
  feedback: string;
}
