export interface INotificationUseCase {

    sendNotification(message: string): Promise<boolean>
    
}