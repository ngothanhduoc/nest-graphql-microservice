import { Observable } from "rxjs";
import { Metadata } from "grpc";

import { IId, IQuery, ICount } from "../commons/commons.interface";
import { Saving } from "../graphql/typings";
import { SavingsDto } from "./saving.dto";

interface UpdateUserInput {
  usersId: string;
  amount: number;
}

export interface ISavingsService {
  findOne(query: IQuery, metadata?: Metadata): Observable<Saving>;
  create(input: SavingsDto, metadata?: Metadata): Observable<Saving>;
  update(input: UpdateUserInput, metadata?: Metadata): Observable<Saving>;
}
