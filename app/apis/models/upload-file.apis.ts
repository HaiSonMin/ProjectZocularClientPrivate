import { CONST_APIS, CONST_APIS_COMMON } from '@/constants/apis.constant';
import { CONST_METHODS } from '@/constants/methods.constant';
import { api } from '@/helper';
import {
  IDeleteFileResponse,
  IFileUploadResponse
} from '@/interfaces/models/IFileUploadResponse';

export async function uploadFile(file: File): Promise<IFileUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const result = await api<IFileUploadResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.FILES}/${CONST_APIS_COMMON.UPLOAD}`,
    options: {
      method: CONST_METHODS.POST,
      body: formData
    }
  });

  return result;
}

export async function deleteFile(id: string): Promise<IDeleteFileResponse> {
  const result = await api<IDeleteFileResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.COMMON.FILES}/${id}`,
    options: {
      method: CONST_METHODS.DELETE
    }
  });

  return result;
}
