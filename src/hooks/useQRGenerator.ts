import { useState, useCallback, useRef } from 'react';
import { QRType, QRCodeData } from '../types/qr.types';

export function useQRGenerator() {
  const [type, setType] = useState<QRType>('url');
  const [content, setContent] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiHidden, setWifiHidden] = useState(false);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [size, setSize] = useState(200);
  const [border, setBorder] = useState(0);
  const [logoUri, setLogoUri] = useState<string | undefined>();
  const qrRef = useRef<any>(null);

  const formatContent = useCallback((t: QRType, raw: string, pass?: string, hidden?: boolean): string => {
    if (!raw.trim()) return '';
    switch (t) {
      case 'url':
        return raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
      case 'phone':
        return `tel:${raw.replace(/[^+\d]/g, '')}`;
      case 'email':
        return `mailto:${raw.trim()}`;
      case 'sms':
        return `sms:${raw.replace(/[^+\d]/g, '')}`;
      case 'wifi':
        const ssid = raw.trim();
        const password = (pass || '').trim();
        const hiddenParam = hidden ? 'H:true;' : '';
        if (password) {
          return `WIFI:S:${ssid};T:WPA;P:${password};${hiddenParam};;`;
        } else {
          return `WIFI:S:${ssid};T:;P:;${hiddenParam};;`;
        }
      case 'location':
        return `geo:${raw.trim()}`;
      case 'text':
      default:
        return raw;
    }
  }, []);

  const formattedContent = formatContent(type, content, wifiPassword, wifiHidden);

  const generateQRData = useCallback((): QRCodeData => ({
    id: Date.now().toString(),
    type,
    content,
    formattedContent,
    foregroundColor,
    backgroundColor,
    size,
    border,
    logoUri,
    createdAt: new Date().toISOString(),
  }), [type, content, formattedContent, foregroundColor, backgroundColor, size, border, logoUri]);

  return {
    type, setType,
    content, setContent,
    wifiPassword, setWifiPassword,
    wifiHidden, setWifiHidden,
    foregroundColor, setForegroundColor,
    backgroundColor, setBackgroundColor,
    size, setSize,
    border, setBorder,
    logoUri, setLogoUri,
    qrRef,
    formattedContent,
    generateQRData,
  };
}