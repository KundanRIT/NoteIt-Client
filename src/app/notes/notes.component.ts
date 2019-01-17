import { Component, OnInit } from '@angular/core';
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook = null;
  searchText: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotebooks() {
    this.api.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res
      },
      err => {
        console.log("Failed to Fetch all Notebooks.\n"+err);
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: "New Notebook",
      id: null,
      nbNotes: 0
    };
    this.api.postNotebook(newNotebook).subscribe(
      res => {
        this.notebooks.push(res);
      },
      err => {
        console.log("Failed to create new notebook.\n"+err);
      }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.api.postNotebook(updatedNotebook).subscribe(
      res => {},
      err => {
        console.log("Failed to update notebook.\n"+err);
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure you want to delete notebook - " + notebook.name + " ?")) {
      this.api.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
          this.selectAllNotebook();
        },
        err => {
          console.log("Failed to delete notebook.\n"+err);
        }
      )
    }
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.api.getNotebookNotes(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        console.log("Failed to Fetch Notes for this notebook.\n"+err);
      });
  }

  selectAllNotebook() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  getAllNotes() {
    this.api.getAllNotes().subscribe(
      res => {
        this.notes = res
      },
      err => {
        console.log("Failed to load all notes.\n"+err)
      }
    )
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure you want to delete note - " + note.title + " ?")) {
      this.api.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {
          console.log("Failed to delete note.\n"+err)
        }
      )
    }
  }

  createNote() {
    if (this.selectedNotebook === null)
      alert("Please select a notebook to continue .");
    else {
      let newNote: Note = {
        id: null,
        title: "New Note",
        text: "Write some text in here",
        notebookId: this.selectedNotebook.id,
        lastModifiedOn: null
      };
      this.api.postNote(newNote).subscribe(
        res => {
          this.notes.push(res)
        },
        err => {
          console.log("Failed to create note.\n" + err)
        }
      );
    }
  }

  updateNote(updatedNote: Note) {
    this.api.postNote(updatedNote).subscribe(
      res => {},
      err => {
        console.log("Failed to update note.\n" + err)
      }
    );
  }
}
