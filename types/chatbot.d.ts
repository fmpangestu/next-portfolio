// types/chatbot.d.ts
declare module "@farhanmp/ai-chatbot-widget" {
  import { ComponentType } from "react";

  interface ChatBotProps {
    geminiApiKey: string;
    geminiApiUrl?: string;
    companyInfo?: string;
    botName?: string;
    position?: string;
    primaryColor?: string;
    headerColor?: string;
    buttonColor?: string;
    textColor?: string;
    botMessageColor?: string;
    userMessageColor?: string;
    avatar?: string;
    showAvatar?: boolean;
    borderRadius?: string;
    width?: string;
  }

  const ChatBot: ComponentType<ChatBotProps>;
  export default ChatBot;
  export { ChatBot };
}
