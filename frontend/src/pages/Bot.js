// AIzaSyBh0R2i-wMJpeclLj0LrhGA_6Ym-wK7dKQ

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Product Data
const productData = [
  {
    _id: "6730bbc555dd8e03568f3fe4",
    productName: "realme X7 Pro 5G (Fantasy, 128 GB) (8 GB RAM)",
    brandName: "Realme",
    category: "mobiles",
    price: 25000,
    sellingPrice: 21999,
  },
  {
    _id: "6730bcb955dd8e03568f4010",
    productName: "Realme 7 Pro (Mirror Silver, 128 GB) (6 GB RAM)",
    brandName: "Realme",
    category: "mobiles",
    price: 19999,
    sellingPrice: 14999,
  },
  {
    _id: "6730be0955dd8e03568f40b7",
    productName: "LG 123 cm (49 inch) Ultra HD (4K) LED Smart WebOS TV",
    brandName: "LG",
    category: "televisions",
    price: 49000,
    sellingPrice: 44999,
  },
  {
    _id: "6730c316fca69997d5d48db0",
    productName: "boAt Airdopes",
    brandName: "Boat",
    category: "airpodes",
    price: 1999,
    sellingPrice: 799,
  },
  {
    _id: "6730c316fca69997d5d48db350",
    productName: "Realme mobile",
    brandName: "realme",
    category: "mobiles",
    price: 9999,
    sellingPrice: 7999,
  },
];

// Predefined Responses
// const predefinedResponses = {
//   customerSupport: "Our customer support number is 180038824484. Feel free to call us for assistance!",
//   paymentMethods: "We accept UPI, debit cards, and credit cards for payment.",
//   welcome: "Welcome to Shop GPT! I am here to assist you with product recommendations and queries.",
// };

const predefinedResponses = {
  customerSupport: "Our customer support number is 180038824484. Feel free to call us for assistance!",
  paymentMethods: "We accept UPI, debit cards, and credit cards for payment.",
  welcome: "Welcome to Shop GPT! I am here to assist you with product recommendations and queries.",
  returnPolicy: "Our return policy allows returns within 15 days of delivery. Ensure the product is in its original condition.",
  warrantyInfo: "Most products come with a 1-year warranty. Check the product details for specific warranty coverage.",
  deliveryTime: "Delivery usually takes 3-7 business days, depending on your location.",
  orderStatus: "To check your order status, please visit the 'My Orders' section on our website or app.",
  discounts: "We offer exciting discounts on select products. Keep an eye on the 'Deals' section for updates.",
  storeHours: "Our online store is available 24/7. Customer support operates from 9 AM to 9 PM daily.",
  shippingCharges: "We offer free shipping on orders above ₹500. For orders below ₹500, a shipping fee of ₹50 applies.",
  trackOrder: "You can track your order using the tracking link sent to your email after dispatch.",
  cancellationPolicy: "You can cancel your order before it is shipped. Post-shipment cancellations are not allowed.",
  exchangepolicy: "We offer exchanges on defective products within 15 days of delivery.",
  productNotFound: "I'm sorry, I couldn't find the product you're looking for. Please try a different query.",
  bulkOrders: "For bulk orders, please contact our sales team at bulk@shopgpt.com.",
  giftCards: "We offer gift cards starting at ₹500. You can purchase them from the 'Gift Cards' section.",
  help: "You can ask me about products, payment options, returns, and much more. How can I assist you today?",
};

// Function to filter products by category
const getRecommendations = (category) => {
  return productData
    .filter((product) => product.category.toLowerCase() === category.toLowerCase())
    .map((product) => `${product.productName} - ₹${product.sellingPrice}`)
    .join("\n");
};

// Function to sanitize AI response
const sanitizeText = (input) => {
  const lines = input.split("\n");
  return lines
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n");
};

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "AIzaSyBh0R2i-wMJpeclLj0LrhGA_6Ym-wK7dKQ";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

  setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
  setIsLoading(true);

  const lowerCaseInput = userInput.toLowerCase().trim();

  // Custom matching logic for predefined responses
  if (lowerCaseInput.includes("customer support")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.customerSupport },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }

  if (lowerCaseInput.includes("payment method")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.paymentMethods },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }

  if (lowerCaseInput.includes("return policy")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.returnPolicy },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }

  if (lowerCaseInput.includes("warranty")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.warrantyInfo },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }

  if (lowerCaseInput.includes("delivery time")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.deliveryTime },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }

  if (lowerCaseInput.includes("order status")) {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: predefinedResponses.orderStatus },
    ]);
    setIsLoading(false);
    setUserInput("");
    return;
  }


    // Category-based Recommendations
    let category = null;
    if (userInput.toLowerCase().includes("mobile")) category = "mobiles";
    else if (userInput.toLowerCase().includes("tv")) category = "televisions";
    else if (userInput.toLowerCase().includes("airpod")) category = "airpodes";

    if (category) {
      const recommendations = getRecommendations(category);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Here are some ${category} recommendations:\n${recommendations}` },
      ]);
      setIsLoading(false);
      setUserInput("");
      return;
    }

    // AI Response for General Queries
    const parts = [
      { text: `You are a shop recommendation bot named Shop GPT.` },
      { text: `User input: ${userInput}` },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
      });
      const botResponse = sanitizeText(result.response.text());
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred while generating a response." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          height: "500px",
          overflowY: "auto",
          border: "1px solid #DDD",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          backgroundColor: "#F9F9F9",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: msg.sender === "user" ? "#D1E7FF" : "#FFF3CD",
                color: "#333",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <em>Loading...</em>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ask me something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #DDD",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: isLoading ? "not-allowed" : "pointer",
            backgroundColor: isLoading ? "#AAA" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isLoading ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default App;
