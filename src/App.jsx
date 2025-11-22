// App.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Homepage from "./components/Homepage";
import UserForms from "./components/UseForms";
import PlanResults from "./components/PlanResults";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [step, setStep] = useState("landing");
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    gender: "",
    fitness_level: "",
    diet: "",
    location: ""
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const generatePlan = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with your actual endpoint
      const res = await fetch("http://192.168.31.125:5000/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_details: userDetails }),
      });
      const data = await res.json();
      setPlan(data.plan);
      setStep("result");
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan");
    }
    setLoading(false);
  };

  const steps = {
    landing: <Homepage onStart={() => setStep("form")} />,
    form: <UserForms userDetails={userDetails} handleChange={handleChange} generatePlan={generatePlan} loading={loading} />,
    result: <PlanResults plan={plan} onRestart={() => setStep("landing")} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <AnimatePresence mode="wait">
        {loading && <LoadingSpinner />}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}