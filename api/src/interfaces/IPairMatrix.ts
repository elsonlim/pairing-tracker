import { Document } from "mongoose";

export interface IPair {
  id: string;
  count: number;
  members: string[];
}

export interface IPairMatrix {
  id: string;
  members: string[];
  pairs: IPair[];
}

export interface IPairMatrixDoc extends IPairMatrix, Document {
  id: string;
}
