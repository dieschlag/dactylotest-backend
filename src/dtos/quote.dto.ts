import { Quote } from "@prisma/client";

export default class QuoteDTO {
  id: number;
  paragraph: string;

  constructor(id: number, paragraph: string) {
    this.id = id;
    this.paragraph = paragraph;
  }
  static arrayToDTOs(dataArray: Quote[]) {
    return dataArray.map(
      (quote: Quote) => new QuoteDTO(quote.id, quote.paragraph)
    );
  }

  static objectToDTO(data: Quote) {
    return new QuoteDTO(data.id, data.paragraph);
  }
}
