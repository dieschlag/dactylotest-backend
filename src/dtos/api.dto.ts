export default class APIResponseDTO<DT> {
  data?: DT[] | DT;
  message?: string;
  constructor({ data, message }: { data?: DT[] | DT; message?: string }) {
    this.data = data;
    this.message = message;
  }
}
