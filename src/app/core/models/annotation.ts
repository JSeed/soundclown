
export interface Annotation {
  id: string;
  user: string;
  message: string;
  seconds: number;
}

export interface CreateAnnotationRequest {
  user: string;
  message: string;
  seconds: number;
  trackId;
}
