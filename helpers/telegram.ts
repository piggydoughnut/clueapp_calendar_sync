import axios from "axios";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export const sendTelegramMessage = async (email: string, subject: string) => {
  // Validate environment variables
  if (!TELEGRAM_TOKEN) {
    console.error("❌ TELEGRAM_TOKEN is not set in environment variables");
    return;
  }

  if (!CHAT_ID) {
    console.error("❌ CHAT_ID is not set in environment variables");
    return;
  }

  const text = `⭐️ New Email sent\n\n👤 Email: ${email}\n\n📧 Subject: ${subject}`;
  
  console.log('📤 Sending telegram message...');
  console.log('📍 Chat ID:', CHAT_ID);
  console.log('📧 Email:', email);
  console.log('📝 Subject:', subject);

  // Try axios first
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000, // Shorter timeout
      }
    );
    
    console.log('✅ Telegram message sent successfully via axios!');
    console.log('📊 Response status:', response.status);
    console.log('📋 Message ID:', response.data?.result?.message_id);
    
    return response.data;
  } catch (err: any) {
    console.log('⚠️ Axios failed, trying curl fallback...');
    
    // Fallback to curl
    try {
      const curlCommand = `curl -s --max-time 10 -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" -H "Content-Type: application/json" -d '{"chat_id": "${CHAT_ID}", "text": "${text.replace(/'/g, "\\'")}", "parse_mode": "HTML"}'`;
      
      const { stdout, stderr } = await execAsync(curlCommand);
      
      if (stderr) {
        console.error('❌ Curl stderr:', stderr);
      }
      
      const response = JSON.parse(stdout);
      
      if (response.ok) {
        console.log('✅ Telegram message sent successfully via curl!');
        console.log('📋 Message ID:', response.result?.message_id);
        return response;
      } else {
        console.error('❌ Curl failed:', response);
        throw new Error(`Curl failed: ${response.description}`);
      }
    } catch (curlErr: any) {
      console.error('❌ Both axios and curl failed:');
      console.error('🔍 Axios error:', err.response?.data || err.message);
      console.error('🔍 Curl error:', curlErr.message);
      throw err;
    }
  }
}; 