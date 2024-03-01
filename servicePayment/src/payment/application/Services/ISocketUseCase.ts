export interface ISocketUseCase {
    emit(event: string, data: any): void;
  }