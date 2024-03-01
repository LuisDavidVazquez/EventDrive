export interface INotificationService {

    sendNotification(message: string): Promise<boolean>
    
}