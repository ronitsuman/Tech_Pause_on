const SidebarForgot = ({ currentStep }) => {
    const steps = [
      { label: "Verify Email", completed: currentStep > 1 },
      { label: "Verify OTP", completed: currentStep > 2 },
      { label: "Change Password", completed: currentStep === 3 },
    ];
  
    return (
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Steps</h2>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className={`flex items-center ${step.completed ? 'text-green-600' : 'text-gray-600'}`}>
              {step.completed ? (
                <span className="mr-2">✔️</span>
              ) : (
                <span className="mr-2">🔲</span>
              )}
              {step.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default SidebarForgot;