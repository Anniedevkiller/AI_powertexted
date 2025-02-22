"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Message = {
  id: number
  text: string
  language?: string
  summary?: string
  translation?: string
}

export default function TextProcessor() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("en")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputText.trim(),
        language: "Detecting...", // Temporary placeholder
      };
  
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
  
      try {
        const detectedLanguage = await window.ai.languageDetection.detectLanguage(inputText);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, language: detectedLanguage.language } : msg
          )
        );
      } catch (error) {
        console.error("Language detection failed:", error);
      }
    }
  };
  

  const handleSummarize = (id: number) => {
    // Here you would call your summarization API
    console.log("Summarize message:", id)
  }

  const handleTranslate = (id: number) => {
    // Here you would call your translation API
    console.log("Translate message:", id, "to", targetLanguage)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4" role="log" aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className="bg-white p-4 rounded-lg shadow">
            <p className="mb-2">{message.text}</p>
            <p className="text-sm text-gray-500 mb-2">Language: {message.language}</p>
            {message.language === "English" && message.text.length > 150 && (
              <Button onClick={() => handleSummarize(message.id)} className="mb-2" variant="outline" size="sm">
                Summarize
              </Button>
            )}
            {message.summary && <p className="text-sm bg-gray-100 p-2 rounded mb-2">Summary: {message.summary}</p>}
            {message.translation && (
              <p className="text-sm bg-gray-100 p-2 rounded">Translation: {message.translation}</p>
            )}
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" onClick={() => handleTranslate(messages[messages.length - 1]?.id)}>
              Translate
            </Button>
          </div>
          <div className="flex space-x-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1"
              rows={3}
            />
            <Button type="submit" size="icon" className="self-end">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

