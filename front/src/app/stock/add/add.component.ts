import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  f = new FormGroup({
    name: new FormControl('truc', [Validators.required]),
    price: new FormControl(2.78, [Validators.required]),
    qty: new FormControl(45, [Validators.required]),
  });
  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {}

  async submit() {
    try {
      await this.articleService.add(this.f.value as Article);
      await this.router.navigateByUrl('/stock');
    } catch (error) {
      console.log(error);
    }
  }
}
