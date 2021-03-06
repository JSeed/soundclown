
export interface Annotation {
  id: string;
  trackId: string;
  user: string;
  message: string;
  seconds: number;
}

export interface CreateAnnotationRequest {
  message: string;
  seconds: number;
  trackId;
}
