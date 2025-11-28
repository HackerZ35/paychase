const provider = process.env.WHATSAPP_PROVIDER || 'ultramsg';

export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string,
  pdfUrl?: string
) {
  try {
    switch (provider) {
      case 'ultramsg':
        return await sendViaUltraMsg(phoneNumber, message, pdfUrl);
      case 'wassenger':
        return await sendViaWassenger(phoneNumber, message, pdfUrl);
      case 'maytapi':
        return await sendViaMaytapi(phoneNumber, message, pdfUrl);
      case 'twilio':
        return await sendViaTwilio(phoneNumber, message, pdfUrl);
      default:
        throw new Error('Invalid WhatsApp provider');
    }
  } catch (error) {
    console.error('WhatsApp send error:', error);
    throw error;
  }
}

async function sendViaUltraMsg(phone: string, message: string, pdfUrl?: string) {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
  const token = process.env.ULTRAMSG_TOKEN;
  
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  
  console.log('Sending via UltraMsg:', { phone: cleanPhone, hasPDF: !!pdfUrl, pdfUrl });
  
  const body: any = {
    token,
    to: cleanPhone,
    body: message,
  };

  if (pdfUrl) {
    body.filename = 'invoice.pdf';
    body.document = pdfUrl;
  }

  const url = `https://api.ultramsg.com/${instanceId}/messages/${pdfUrl ? 'document' : 'chat'}`;
  console.log('UltraMsg URL:', url);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  console.log('UltraMsg response:', result);
  return result;
}

async function sendViaWassenger(phone: string, message: string, pdfUrl?: string) {
  const apiKey = process.env.WASSENGER_API_KEY;
  const deviceId = process.env.WASSENGER_DEVICE_ID;
  
  const body: any = {
    phone,
    message,
    device: deviceId,
  };

  if (pdfUrl) {
    body.media = { url: pdfUrl };
  }

  const response = await fetch('https://api.wassenger.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Token': apiKey!,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

async function sendViaMaytapi(phone: string, message: string, pdfUrl?: string) {
  const productId = process.env.MAYTAPI_PRODUCT_ID;
  const phoneId = process.env.MAYTAPI_PHONE_ID;
  const apiKey = process.env.MAYTAPI_API_KEY;
  
  const body: any = {
    to_number: phone,
    message,
    type: pdfUrl ? 'document' : 'text',
  };

  if (pdfUrl) {
    body.document = pdfUrl;
  }

  const response = await fetch(
    `https://api.maytapi.com/api/${productId}/${phoneId}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-maytapi-key': apiKey!,
      },
      body: JSON.stringify(body),
    }
  );

  return await response.json();
}

async function sendViaTwilio(phone: string, message: string, pdfUrl?: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  
  const body = new URLSearchParams({
    From: from!,
    To: `whatsapp:${phone}`,
    Body: message,
  });

  if (pdfUrl) {
    body.append('MediaUrl', pdfUrl);
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    }
  );

  return await response.json();
}
