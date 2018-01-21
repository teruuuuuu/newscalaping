export class TopInfo {
    id: number;
    url: string;
    title: string;
    description: string;
    create_date: string;

    constructor(id: number, url: string, title: string, description: string, create_date: string) { 
        this.id = id
        this.url = url
        this.title = title
        this.description = description
        this.create_date = create_date
    }
  }
  