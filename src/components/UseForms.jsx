import { motion } from "framer-motion";
import { FaUser, FaWeight, FaRulerVertical, FaBullseye, FaVenusMars, FaFire, FaUtensilSpoon, FaMapMarkerAlt } from "react-icons/fa";

const UserForms = ({ userDetails, handleChange, generatePlan, loading }) => {
  const formFields = [
    {
      name: "name",
      label: "Name",
      icon: <FaUser className="text-emerald-500" />,
      type: "text",
      placeholder: "Enter your Name"
    },
    {
      name: "age",
      label: "Age",
      icon: <FaUser className="text-emerald-500" />,
      type: "number",
      placeholder: "Enter your age"
    },
    {
      name: "weight",
      label: "Weight (kg)",
      icon: <FaWeight className="text-emerald-500" />,
      type: "number",
      placeholder: "Enter your weight"
    },
    {
      name: "height",
      label: "Height (cm)",
      icon: <FaRulerVertical className="text-emerald-500" />,
      type: "number",
      placeholder: "Enter your height"
    },
    {
      name: "gender",
      label: "Gender",
      icon: <FaVenusMars className="text-emerald-500" />,
      type: "select",
      options: ["Male", "Female", "Other"]
    },
    {
      name: "goal",
      label: "Fitness Goal",
      icon: <FaBullseye className="text-emerald-500" />,
      type: "select",
      options: ["Weight Loss", "Muscle Gain", "Maintenance", "Endurance", "General Fitness"]
    },
    {
      name: "fitness_level",
      label: "Activity Level",
      icon: <FaFire className="text-emerald-500" />,
      type: "select",
      options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"]
    },
    {
      name: "diet",
      label: "Dietary Preferences",
      icon: <FaUtensilSpoon className="text-emerald-500" />,
      type: "select",
      options: ["Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "No Restrictions"]
    },
    {
      name: "location",
      label: "Workout Location",
      icon: <FaMapMarkerAlt className="text-emerald-500" />,
      type: "select",
      options: ["Gym", "Home", "Others"]
    },
  ];

  const getFieldValue = (fieldName) => {
    return userDetails[fieldName] || "";
  };

  const isFormValid = () => {
    return Object.values(userDetails).every(value => value !== "" && value !== undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">

          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Tell Us About Yourself
            </motion.h2>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-emerald-100"
            >
              Help us create your perfect fitness plan
            </motion.p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    {field.icon}
                    <span className="ml-2">{field.label}</span>
                  </label>
                  
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={getFieldValue(field.name)}
                      onChange={handleChange}
                      className="w-full p-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={getFieldValue(field.name)}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full p-3 border-2 border-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ 
                scale: isFormValid() ? 1.02 : 1,
                boxShadow: isFormValid() ? "0 10px 30px rgba(5, 150, 105, 0.4)" : "none"
              }}
              whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
              onClick={generatePlan}
              disabled={!isFormValid() || loading}
              className={`w-full mt-8 p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isFormValid() 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg cursor-pointer" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Generating Your Plan...
                </div>
              ) : (
                "Generate My Fitness Plan"
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserForms;