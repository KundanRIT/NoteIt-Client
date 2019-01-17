import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Notebook} from "../notes/model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {HttpClient} from "@angular/common/http";
import {Note} from "../notes/model/note";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:8080/api";
  private ALL_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\all`;
  private POST_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;
  private POST_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK_URL = `${this.BASE_URL}\\notebooks\\`;
  private ALL_NOTES_URL = `${this.BASE_URL}\\notes\\all`;
  private NOTEBOOK_NOTES_URL = `${this.BASE_URL}\\notes\\notebook\\`;
  private POST_NOTE_URL = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;

  constructor(private http: HttpClient) { }

  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOK_URL);
  }

  postFeedback(feedback: FeedbackViewModel): Observable<void> {
    return this.http.post<void>(this.POST_FEEDBACK_URL, feedback);
  }

  postNotebook(newNotebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.POST_NOTEBOOK_URL, newNotebook);
  }

  deleteNotebook(id: string): Observable<void> {
    return this.http.delete<void>(this.DELETE_NOTEBOOK_URL + id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }

  getNotebookNotes(notebookId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTEBOOK_NOTES_URL + notebookId);
  }

  postNote(newNote: Note): Observable<Note> {
    return this.http.post<Note>(this.POST_NOTE_URL, newNote);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(this.DELETE_NOTE_URL + id);
  }
}
