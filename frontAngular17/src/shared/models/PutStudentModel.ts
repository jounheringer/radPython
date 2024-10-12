export class PutStudentModel {
  constructor(
    public name: string,
    public serie: number,
    public userpassword: string,
    public email: string,
    public approved: boolean,
  ) { }
}
