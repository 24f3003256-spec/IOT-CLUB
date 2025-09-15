import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Environment, OrbitControls } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quizData = [
  {
    id: 1,
    question: "What does IoT stand for?",
    options: [
      "Internet of Tools",
      "Internet of Things",
      "Internet of Technology", 
      "Internet of Televisions"
    ],
    correct: 1,
    animal: "owl"
  },
  {
    id: 2,
    question: "Which of these is an IoT device?",
    options: [
      "Smart Bulb",
      "USB Pen Drive",
      "Calculator",
      "DVD Player"
    ],
    correct: 0,
    animal: "monkey"
  },
  {
    id: 3,
    question: "IoT devices often use which type of network?",
    options: [
      "4G/5G",
      "HDMI",
      "USB-C",
      "VGA"
    ],
    correct: 0,
    animal: "fox"
  },
  {
    id: 4,
    question: "Which protocol is commonly used in IoT?",
    options: [
      "MQTT",
      "FTP",
      "SMTP",
      "HDMI"
    ],
    correct: 0,
    animal: "parrot"
  },
  {
    id: 5,
    question: "A smart watch is an example of:",
    options: [
      "Wearable IoT Device",
      "Computer Peripheral",
      "Home Appliance",
      "Server"
    ],
    correct: 0,
    animal: "squirrel"
  }
];

const ForestScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#4a90e2" />
      <pointLight position={[-5, 2, 0]} intensity={0.2} color="#00ffff" />
      
      {/* Floating Trees */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[-6, -2, -5]} rotation={[0, 0.3, 0]}>
          <coneGeometry args={[1, 3, 8]} />
          <meshStandardMaterial color="#0f4a3c" />
        </mesh>
      </Float>

      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[6, -1, -4]} rotation={[0, -0.2, 0]}>
          <coneGeometry args={[0.8, 2.5, 8]} />
          <meshStandardMaterial color="#0a5d4a" />
        </mesh>
      </Float>

      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.15}>
        <mesh position={[-4, 1, -6]} rotation={[0, 0.5, 0]}>
          <coneGeometry args={[1.2, 3.5, 8]} />
          <meshStandardMaterial color="#134e3a" />
        </mesh>
      </Float>

      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.25}>
        <mesh position={[4, 0, -7]} rotation={[0, -0.4, 0]}>
          <coneGeometry args={[0.9, 2.8, 8]} />
          <meshStandardMaterial color="#0f5c42" />
        </mesh>
      </Float>

      {/* Mist effect with particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={0.2 + i * 0.05} rotationIntensity={0} floatIntensity={0.1}>
          <mesh position={[
            (Math.random() - 0.5) * 15, 
            Math.random() * 3 - 1, 
            -8 + Math.random() * 4
          ]}>
            <sphereGeometry args={[0.05 + Math.random() * 0.1]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1 + Math.random() * 0.2} 
            />
          </mesh>
        </Float>
      ))}

      <Environment preset="forest" />
      <fog attach="fog" args={['#1a1a2e', 5, 15]} />
    </Canvas>
  );
};

const AnimalScoreboard = ({ 
  animal, 
  isCorrect, 
  show 
}: { 
  animal: string; 
  isCorrect: boolean; 
  show: boolean; 
}) => {
  if (!show) return null;

  const messages = {
    correct: ["Great Job!", "Excellent!", "Well Done!", "Perfect!", "Amazing!"],
    incorrect: ["Try Again!", "Not Quite!", "Keep Learning!", "Almost There!", "Good Try!"]
  };

  const message = isCorrect 
    ? messages.correct[Math.floor(Math.random() * messages.correct.length)]
    : messages.incorrect[Math.floor(Math.random() * messages.incorrect.length)];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, rotate: 180, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="absolute top-4 right-4 z-20"
    >
      <div className="glass rounded-xl p-6 shadow-elegant border border-iot-teal/30 bg-gradient-glass backdrop-blur-xl">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-5xl mb-3 filter drop-shadow-lg"
          >
            {animal === 'owl' && '🦉'}
            {animal === 'monkey' && '🐵'}
            {animal === 'fox' && '🦊'}
            {animal === 'parrot' && '🦜'}
            {animal === 'squirrel' && '🐿️'}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-sm font-paradox font-bold tracking-wider ${
              isCorrect ? 'text-iot-teal' : 'text-iot-yellow'
            }`}
          >
            {message}
          </motion.div>
          {isCorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="mt-2"
            >
              ✨
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizData[currentQuestion].correct) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 2500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-iot-navy">
        <div className="absolute inset-0 opacity-20">
          <ForestScene />
        </div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 text-center"
        >
          <Card className="glass p-12 max-w-md mx-4">
            <h2 className="text-4xl font-paradox font-bold text-iot-teal mb-6">
              Quiz Complete! 🎉
            </h2>
            <p className="text-xl text-iot-glow mb-4">
              Your Score: {score}/{quizData.length}
            </p>
            <p className="text-muted-foreground mb-8">
              {score === quizData.length ? "Perfect! You're ready for IoT!" : 
               score >= quizData.length * 0.7 ? "Great job! Keep learning!" :
               "Good try! Practice more IoT concepts."}
            </p>
            <Button 
              onClick={restartQuiz}
              className="bg-gradient-accent text-black font-semibold hover:scale-105 transition-transform"
            >
              Try Again
            </Button>
          </Card>
        </motion.div>
      </section>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-iot-navy">
      {/* 3D Forest Background */}
      <div className="absolute inset-0 opacity-30">
        <ForestScene />
      </div>

      {/* Quiz Content */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <AnimatePresence>
          <AnimalScoreboard 
            animal={question.animal}
            isCorrect={selectedAnswer === question.correct}
            show={showResult}
          />
        </AnimatePresence>

        <motion.div
          key={currentQuestion}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Card className="glass p-8 shadow-elegant border border-iot-teal/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-iot-navy/50 rounded-full border border-iot-teal/30">
                <span className="text-sm text-iot-teal font-paradox font-semibold tracking-wide">
                  QUESTION {currentQuestion + 1}
                </span>
                <span className="text-sm text-muted-foreground font-paradox">
                  OF {quizData.length}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    variant="outline"
                    className={`w-full p-4 text-left justify-start transition-all duration-300 border-2 ${
                      showResult && index === question.correct 
                        ? 'border-iot-teal bg-iot-teal/20 text-iot-teal shadow-glow' 
                        : showResult && index === selectedAnswer && index !== question.correct
                        ? 'border-red-500 bg-red-500/20 text-red-400'
                        : 'border-iot-navy/50 hover:border-iot-teal/50 hover:bg-iot-teal/10 hover:shadow-elegant'
                    }`}
                  >
                    <span className="mr-4 font-paradox font-bold text-iot-teal">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="font-medium">{option}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="w-full bg-iot-navy/50 rounded-full h-3 border border-iot-teal/20 overflow-hidden">
                <motion.div 
                  className="bg-gradient-accent h-full rounded-full shadow-glow"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(correctAnswers / quizData.length) * 100}%` 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-muted-foreground font-paradox">
                  Progress: {Math.round((correctAnswers / quizData.length) * 100)}%
                </span>
                <span className="text-sm text-iot-glow font-paradox">
                  Score: {score}/{quizData.length}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizSection;