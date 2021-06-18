import { Component, OnInit } from '@angular/core';
import { BlogserviceService } from 'src/app/servicos/blogservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any=[];
  constructor(private blogService : BlogserviceService) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(){
    this.blogService.getBlog()
      .subscribe(
      (value) => {
    this.blogs = value;
  },
   (error) => {
      console.log('não foi possivel acessar ao blog')
   }
  )
  }
}
