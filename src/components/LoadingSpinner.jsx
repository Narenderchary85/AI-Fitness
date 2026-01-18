import { motion } from "framer-motion";
import { FaDumbbell, FaHeartbeat } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-2xl mb-6 inline-block"
        >
          <FaDumbbell className="text-white text-4xl" />
        </motion.div>
        
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Crafting Your Perfect Plan
        </motion.h3>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mx-auto mb-2"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 flex items-center justify-center"
        >
          <FaHeartbeat className="mr-2 text-emerald-500 animate-pulse" />
          Analyzing your profile...
        </motion.p>
      </div>
    </motion.div>
  );
  
}

export default LoadingSpinner;