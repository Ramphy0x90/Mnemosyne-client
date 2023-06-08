import { ShowNavOptionOn } from 'src/app/constants';

export interface NavComponent {
  id?: string;
  name: string;
  route: string;
  accessMembers?: any[];
}
