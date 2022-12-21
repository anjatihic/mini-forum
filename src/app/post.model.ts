export class Post {
  timestamp: any;
  id: string;
  userId:number;
  comment: string;

  constructor() {
    this.timestamp= Date.now();
    this.userId=-1;
    this.comment='';
    this.id = '';
  }

}
