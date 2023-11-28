"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";   // gives lot of functionality for a chatgpt like streaming UI
import { Button } from "./ui/button";
import { Send } from "lucide-react";
// import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import MessageList from "./MessageList";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
    const { data, isLoading } = useQuery({     // data -> it will have message array
      queryKey: ["chat", chatId],
      queryFn: async () => {
        const response = await axios.post<Message[]>("/api/get-messages", {
          chatId,
        });
        return response.data;
      },
    });


    // messages from useChat will be displayed in our frontend
    const { input, handleInputChange, handleSubmit, messages } = useChat({
      api: "/api/chat", // whenever we hit enter, it will send the message to our chatGPT
      body: {
        chatId,  // we passed this into the body so that we can destructure it from the request body at the backend(see the file api/chat/route.ts) 
      },
      initialMessages: data || [],  // we get data from react query, see above
    });

  //   messages[0].role === 'assistant' // assistant is AI reply
  //                    === 'user'     // whatever we send
    React.useEffect(() => {
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTo({
          top: messageContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);


    return (
      <div
        className="relative max-h-[90vh] overflow-scroll"
        id="message-container"
      >
        {/* header */}
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
          <h3 className="text-xl font-bold">Chat</h3>
        </div>
  
        {/* message list */}
        <MessageList messages={messages} isLoading={isLoading} />
  
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 inset-x-0 px-2 py-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300"
        >
          <div className="flex">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask any question..."
              className="w-full"
            />
            <Button className="bg-blue-600 ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    );
};

export default ChatComponent;