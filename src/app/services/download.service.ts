import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private http: HttpClient) {}
  public downloadFile(filePath: string, fileName: string): Observable<void> {
    return this.http.get(filePath, { responseType: 'blob' }).pipe(
      map(blob => {
        this.initiateDownload(blob, fileName);
        return void 0;
      }),
      catchError(error => {
        console.error('Ошибка при скачивании файла:', error);
        throw error;
      })
    );
  }

  private initiateDownload(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

}
