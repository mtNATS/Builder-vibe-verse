import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/calculator/LoadingScreen";

const CalculatorLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, targetResults } = location.state || {};

  const handleComplete = () => {
    navigate("/calculator/results", {
      state: {
        formData,
        results: targetResults,
      },
    });
  };

  const handleCancel = () => {
    navigate("/calculator/form");
  };

  return <LoadingScreen onComplete={handleComplete} onCancel={handleCancel} />;
};

export default CalculatorLoading;
