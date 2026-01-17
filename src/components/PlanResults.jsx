import { motion, AnimatePresence } from "framer-motion";
import {
  FaDumbbell,
  FaUtensils,
  FaCalendarAlt,
  FaArrowLeft,
  FaDownload,
  FaFire,
  FaHeartbeat,
  FaClock,
  FaRunning
} from "react-icons/fa";

import { useSimplePdfExport, useTTS } from "../hooks/usePdfExport";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { FaPlay, FaStop, FaVolumeUp, FaSpinner } from "react-icons/fa"

const PlanResults = ({ plan, onRestart }) => {
  const workoutPlan = plan?.plan?.workout_plan || {};
  const dietPlan = plan?.plan?.diet_plan || {};
  const { exportToPdf } = useSimplePdfExport();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { speak,stop, loadingTTS } = useTTS();

  const workoutDays = workoutPlan.days || [];

  const meals = [
    { time: "Breakfast", meal: dietPlan.breakfast, icon: "☀️" },
    { time: "Lunch", meal: dietPlan.lunch, icon: "🌞" },
    { time: "Dinner", meal: dietPlan.dinner, icon: "🌙" },
    { time: "Snacks", meal: dietPlan.snacks, icon: "🍎" }
  ].filter(meal => meal.meal); 

  const recommendations = [
    "Stay hydrated - drink 3L water daily",
    "Get 7-8 hours of quality sleep",
    "Track your progress weekly",
    "Adjust calories based on weekly results",
    "Listen to your body and rest when needed",
    "Stay consistent with your routine"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };


  const getExerciseIcon = (exerciseName) => {
    const name = exerciseName?.toLowerCase() || '';
    if (name.includes('push') || name.includes('chest') || name.includes('press')) return '💪';
    if (name.includes('pull') || name.includes('back') || name.includes('row')) return '🚣';
    if (name.includes('leg') || name.includes('squat') || name.includes('lung')) return '🦵';
    if (name.includes('cardio') || name.includes('run') || name.includes('cycle')) return '🏃';
    if (name.includes('core') || name.includes('abs') || name.includes('plank')) return '🎯';
    return '🏋️';
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
  
    try {
      document.body.classList.add("no-animations");
  
      const tempContainer = document.createElement("div");
      document.body.appendChild(tempContainer);
  
      const root = ReactDOM.createRoot(tempContainer);
      root.render(
        <PlanResults plan={plan} onRestart={() => {}} />
      );
  
      await new Promise((resolve) => setTimeout(resolve, 800));
  
      await exportToPdf(tempContainer, "AI-Fitness.pdf");
  
      root.unmount();
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error("PDF Error:", error);
      setError("Failed to generate PDF report");
    } finally {
      document.body.classList.remove("no-animations");
      setLoading(false);
    }
  };

  const generateReadablePlanText = () => {
    let text = "Here is your personalized fitness plan.\n\n";
  
    text += "NUTRITION PLAN:\n";
    if (dietPlan.breakfast) text += `Breakfast: ${dietPlan.breakfast}\n`;
    if (dietPlan.lunch) text += `Lunch: ${dietPlan.lunch}\n`;
    if (dietPlan.dinner) text += `Dinner: ${dietPlan.dinner}\n`;
    if (dietPlan.snacks) text += `Snacks: ${dietPlan.snacks}\n`;
    if (dietPlan.notes) text += `Notes: ${dietPlan.notes}\n\n`;
  
    text += "WORKOUT PLAN:\n";
    workoutDays.forEach((day, i) => {
      text += `Day ${i + 1}: ${day.day}. Focus: ${day.focus}.\n`;
  
      day.exercises.forEach((ex) => {
        text += ` - ${ex.name}, ${ex.sets} sets, ${ex.reps} reps, rest ${ex.rest}.\n`;
        if (ex.notes) text += `   Notes: ${ex.notes}\n`;
      });
  
      text += "\n";
    });
  
    text += "RECOMMENDATIONS:\n";
    recommendations.forEach((r) => (text += ` - ${r}\n`));
  
    return text;
  };
  
  

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            Your Personalized Fitness Plan
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Carefully crafted based on your goals, preferences, and fitness level
          </p>
        </motion.div>

        <div className="flex items-center gap-3 mb-5">
      <AnimatePresence mode="wait">
        {!loadingTTS ? (
          <motion.button
            key="speak"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>speak(generateReadablePlanText())}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold
              transition-all duration-300 ease-in-out
             
            `}
          >
            <FaVolumeUp className="text-lg" />
            <span>Read Aloud</span>
          </motion.button>
        ) : (
          <motion.button
            key="stop"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>stop()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaStop className="text-lg" />
            <span>Stop</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loadingTTS && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 text-green-600 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FaSpinner />
            </motion.div>
            <span className="text-sm font-medium whitespace-nowrap">
              Generating voice...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                    <FaUtensils className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Nutrition Plan</h2>
                    <p className="text-teal-100">Fuel your body for optimal performance</p>
                  </div>
                </div>
                <div className="text-white text-right">
                  <div className="text-sm opacity-90">Daily Intake</div>
                  <div className="text-xl font-bold">{dietPlan.calories || 'Custom'} Calories</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {meals.map((meal, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-200 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{meal.icon}</div>
                    <h3 className="font-bold text-teal-800 text-lg mb-2">{meal.time}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{meal.meal}</p>
                  </motion.div>
                ))}
              </div>

              {dietPlan.notes && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200"
                >
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                    <FaHeartbeat className="mr-2" />
                    Dietary Notes
                  </h4>
                  <p className="text-amber-700 text-sm">{dietPlan.notes}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                    <FaDumbbell className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Workout Plan</h2>
                    <p className="text-emerald-100">{workoutDays.length} days per week • Build strength and endurance</p>
                  </div>
                </div>
                <div className="text-white text-right">
                  <div className="text-sm opacity-90">Weekly Schedule</div>
                  <div className="text-xl font-bold">{workoutDays.length} Training Days</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {workoutDays.map((day, dayIndex) => (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-300"
                  >

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="bg-emerald-500 p-3 rounded-xl mr-4">
                          <FaCalendarAlt className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{day.day}</h3>
                          <p className="text-emerald-600 font-semibold">
                            {day.exercises?.length || 0} Exercises
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Focus Area</div>
                        <div className="font-semibold text-emerald-700">
                          {day.focus || 'Full Body'}
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {day.exercises?.map((exercise, exIndex) => (
                        <motion.div
                          key={exIndex}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {getExerciseIcon(exercise.name)}
                              </span>
                              <h4 className="font-bold text-gray-800 text-sm leading-tight">
                                {exercise.name}
                              </h4>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-gray-600">
                                <span>Sets</span>
                              </div>
                              <span className="font-bold text-gray-800">{exercise.sets}</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-gray-600">
                                <FaFire className="mr-1 text-orange-500" />
                                <span>Repetitions</span>
                              </div>
                              <span className="font-bold text-gray-800">{exercise.reps}</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-gray-600">
                                <FaClock className="mr-1 text-blue-500" />
                                <span>Rest</span>
                              </div>
                              <span className="font-bold text-gray-800">{exercise.rest}</span>
                            </div>
                          </div>

                          {exercise.notes && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-600 italic">{exercise.notes}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {day.notes && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200"
                      >
                        <p className="text-sm text-blue-700">{day.notes}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                  <FaRunning className="text-white text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Pro Tips & Recommendations</h2>
                  <p className="text-amber-100">Expert advice to maximize your results</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start p-4 bg-amber-50 rounded-xl border border-amber-200 hover:border-amber-300 transition-all duration-300"
                  >
                    <div className="bg-amber-500 p-2 rounded-lg mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaArrowLeft className="mr-3" />
            Create New Plan
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgb(240, 253, 244)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateReport}
            className="flex items-center justify-center px-8 py-4 border-2 border-emerald-500 text-emerald-600 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-300"
          >
            <FaDownload className="mr-3" />
            Download PDF
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl border border-green-200"
        >
          <p className="text-green-700 font-semibold text-lg">
            🎉 Your personalized fitness journey starts now! Stay consistent and track your progress.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanResults;