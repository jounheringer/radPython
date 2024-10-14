export class SubjectModel {
  constructor(
    public id: number,
    public subject_name: string,
    public id_user: number,
    public final_grade: number,
    public grade1: number,
    public grade2: number,
    public grade3: number
  ) {

  }
}
