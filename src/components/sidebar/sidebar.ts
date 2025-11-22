import { Component } from '@angular/core';
import { hover } from "../../directives/hover.directives";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [hover, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
