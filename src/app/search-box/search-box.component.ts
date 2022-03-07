import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, fromEvent, map, tap, debounceTime, switchAll } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SearchResult } from '../search-result/search-result.model';
import { YoutubeSearchService } from '../youtube-search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtubeSearchService: YoutubeSearchService,
              private elementRef: ElementRef) { }
 

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value), // extract the value of the input
      filter((text: string) => text.length > 1), // filter out if empty
      debounceTime(250), // only one every 250ms
      tap(() => this.loading.emit(true)), // enable loading
      // search, discarding old events if new input comes in 
      map((query: string) => this.youtubeSearchService.search(query)),
      switchAll())
    // act on the return of the stream
    .subscribe(
      (results: SearchResult[]) => {
        // on success
        this.loading.emit(false);
        this.results.emit(results);
        console.log(results)
      },
      (err: any) => {
        // on error
        console.error(err);
        this.loading.emit(false);
      },
      () => {
        // on completion
        this.loading.emit(false);
      }
    )
  }

}