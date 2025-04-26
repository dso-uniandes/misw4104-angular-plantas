import { Component, OnInit } from '@angular/core';
import { Plant } from '../plant';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Array<Plant> = [];
  constructor() { }

  ngOnInit() {
  }

}
