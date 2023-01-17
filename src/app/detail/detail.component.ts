import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { allGames } from '../interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  data!: allGames;

  constructor(private route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.data = JSON.parse(params['data']);
    });
  }

  routeToHome() {
    this._router.navigate(['home']);
  }
}
