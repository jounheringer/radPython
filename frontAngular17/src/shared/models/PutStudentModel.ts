export class PutStudentModel {
  constructor(
    public name: string,
    public serie: number,
    public email: string,
    public approved: boolean,
  ) { }
}
