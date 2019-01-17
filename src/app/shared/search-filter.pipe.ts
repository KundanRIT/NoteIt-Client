import { Pipe, PipeTransform } from '@angular/core';
import {Note} from "../notes/model/note";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(notes: Note[], searchText?: string): any {
    if (searchText == null || searchText === "") {
      return notes;
    } else {
      return notes.filter(
        n =>
          n.title.toLowerCase().includes(searchText) ||
          n.text.toLowerCase().includes(searchText)
      );
    }
  }

}
