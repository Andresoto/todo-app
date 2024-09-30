import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interface/task.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Task[] = [], type: 'ALL' | 'PENDING' | 'DONE'): Task[] {
    if (type === 'ALL') {
      return value;
    }
    return value.filter(task => task.status === type);
  }
}
