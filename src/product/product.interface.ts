import {Document} from 'mongoose';
import {Version} from '../version';

export interface Product extends Document {
  Name: string;
  Versions: Version[];
}
