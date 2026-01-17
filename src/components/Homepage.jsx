import { motion } from "framer-motion";
import { FaDumbbell, FaHeartbeat, FaUtensils, FaChartLine, FaRunning } from "react-icons/fa";

const Homepage=({ onStart })=> {
  const features = [
    {
      icon: <FaHeartbeat className="text-3xl" />,
      title: "Personalized Plans",
      description: "AI-generated workout and nutrition plans tailored just for you"
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      title: "Diet Planning",
      description: "Custom meal plans based on your goals and preferences"
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed analytics"
    }
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-center items-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg"
              >
                <FaDumbbell className="text-white text-5xl" />
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-6">
              FitAI Trainer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your intelligent fitness companion. Get personalized workout routines and 
              nutrition plans powered by artificial intelligence.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <section className="bg-white/80 backdrop-blur-sm py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 text-center group hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-emerald-500 mb-4 inline-block group-hover:text-emerald-600 transition-colors"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-6 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Fitness?
          </h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Join thousands who have achieved their fitness goals with AI-powered guidance
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Your Plan Now
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default Homepage;