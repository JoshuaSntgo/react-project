import StepperControl from './components/StepperControl'
import Stepper from './components/Stepper'
import React, { useState } from 'react'
import '../App.css'
import PersonalInfo from './components/StepForms/PersonalInformation/Personalnfo'
import EdBackground from './components/StepForms/EdBackground/EdBackground'
import { UseContextProvider } from "./components/contexts/StepperContext";
function App() {

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Personal Information",
    "Educational Background",
    "3",
    "4",
    "5",
    "Done"
  ]

  const displayStep = (steps) =>{
    switch(steps){
      case 1:
        return <PersonalInfo />
      case 2:
        return <EdBackground/>
      default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>

      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  )
}

export default App