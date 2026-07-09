export type QRType = 'text' | 'url' | 'phone' | 'email' | 'sms' | 'wifi' | 'location';

export type QRLanguage = 'fa' | 'en';

export interface QRCodeData {
  id: string;
  type: QRType;
  content: string;
  formattedContent: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  border: number;
  logoUri?: string;
  createdAt: string;
}