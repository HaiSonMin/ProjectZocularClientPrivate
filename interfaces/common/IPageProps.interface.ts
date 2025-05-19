import { IQueries } from './IRequest.interface';

export interface IPageProps {
  params: { id?: string; slug?: string; [key: string]: string | undefined };
  searchParams?: IQueries;
}
