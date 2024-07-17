import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Bunseki() {
  const [analysisResults, setAnalysisResults] = useState([]);
  const location = useLocation();
  const { messages } = location.state || { messages: [] };
  useEffect(() => {
    const fetchAnalysisResults = async () => {
      try {
        const response = await fetch("http://localhost:3018/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages }),
        });
        const data = await response.json();
        setAnalysisResults(data);
      } catch (error) {
        console.error("Error fetching analysis results:", error);
      }
    };
    fetchAnalysisResults();
  }, [messages]);
  return (
    <div className="analysis-container">
      <h1>分析結果</h1>
      <div className="results-container">
        {analysisResults.map((result, index) => (
          <p key={index} className="result">
            {result}
          </p>
        ))}
      </div>
    </div>
  );
}
