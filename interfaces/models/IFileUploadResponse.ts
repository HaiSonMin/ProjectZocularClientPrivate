export interface IFileUploadResponse {
  createdBy: string;
  updatedBy: string;
  name: string;
  size: number;
  type: string;
  path: string;
  url: string;
  md5: string;
  id: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  isDraft: number;
}
export interface IDeleteFileResponse {
  success: boolean;
  message: string;
}
