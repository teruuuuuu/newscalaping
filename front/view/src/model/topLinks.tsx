export class TopLinks {
    id: number;
    top_id: number;
    url: string;
    text: string;
    description: string;
    info: boolean;
    add_date: string;

    constructor(id: number, top_id: number, url: string, text: string, info: boolean, add_date: string) {
        this.id = id
        this.top_id = top_id
        this.url = url
        this.text = text
        this.info = info
        this.add_date = add_date
    }
  }
