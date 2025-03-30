

import React, { useState } from 'react';
import './learningPlan1.css';

// Main Dashboard
function LearningPlansDashboard() {
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [existingPlans, setExistingPlans] = useState([
    { 
      id: 1, 
      title: 'Learn React', 
      status: 'Published', 
      startDate: '2025-03-20', 
      endDate: '2025-04-10', 
      resources: [{ name: 'React Docs', checked: false }, { name: 'React Tutorial', checked: false }] 
    },
    { 
      id: 2, 
      title: 'Master Python', 
      status: 'Published', 
      startDate: '2025-03-15', 
      endDate: '2025-04-05', 
      resources: [{ name: 'Python Docs', checked: false }, { name: 'Python Tutorials', checked: false }] 
    },
    { 
      id: 3, 
      title: 'JavaScript Fundamentals', 
      status: 'Ongoing', 
      startDate: '2025-03-18', 
      endDate: '2025-03-30', 
      resources: [{ name: 'JS Guide', checked: false }, { name: 'MDN Docs', checked: true }] 
    }  ]);

  const handleAddNewPlan = () => {
    setIsAddingPlan(true);
  };

  const handleCloseForm = () => {
    setIsAddingPlan(false);
    setIsEditingPlan(false);
    setCurrentPlanId(null);
  };

  const handleSavePlan = (plan) => {
    if (isEditingPlan) {
      // Update the plan
      setExistingPlans(existingPlans.map((existingPlan) => 
        existingPlan.id === plan.id ? plan : existingPlan
      ));
      setIsEditingPlan(false);
    } else {
      // Add new plan
      setExistingPlans([...existingPlans, plan]);
    }
    handleCloseForm();
  };

  const handleEditPlan = (planId) => {
    const planToEdit = existingPlans.find((plan) => plan.id === planId);
    setCurrentPlanId(planId);
    setIsEditingPlan(true);
    setIsAddingPlan(true);
  };

  const handleDeletePlan = (id) => {
    setExistingPlans(existingPlans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="lpbuttondashboard">
      <h1 className='lph1'>My Learning Plans</h1>

      {/* Button to Add New Plan */}
      <div className="lpbuttonlist">
        <button className="addnewplan btn"onClick={handleAddNewPlan}>Add New Learning Plan</button>
      </div>

      {/* Show the Add or Edit Learning Plan form */}
      {isAddingPlan && <LearningPlanForm plan={existingPlans.find(plan => plan.id === currentPlanId)} onSave={handleSavePlan} onClose={handleCloseForm} />}

      {/* Show existing plans */}
      <LearningPlansList
        plans={existingPlans}
        onDelete={handleDeletePlan}
        onEdit={handleEditPlan}
      />
    </div>
  );
}


// Form to Add or Edit Learning Plan
function LearningPlanForm({ plan, onSave, onClose }) {
  const [title, setTitle] = useState(plan ? plan.title : '');
  const [startDate, setStartDate] = useState(plan ? plan.startDate : '');
  const [endDate, setEndDate] = useState(plan ? plan.endDate : '');
  const [resources, setResources] = useState(plan ? plan.resources : [{ name: '', checked: false }]);

  const handleAddResource = () => {
    setResources([...resources, { name: '', checked: false }]);
  };

  const handleResourceChange = (index, value) => {
    const updatedResources = [...resources];
    updatedResources[index].name = value;
    setResources(updatedResources);
  };

  const handleDeleteResource = (index) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  };

  const handleSave = () => {
    const newPlan = {
      id: plan ? plan.id : Date.now(),  // Use existing plan ID if editing, else generate new ID
      title,
      startDate,
      endDate,
      resources,
    };
    onSave(newPlan);
  };

  return (
    <div className="lppopup-form">
      <h2>{plan ? 'Edit Learning Plan' : 'Create New Learning Plan'}</h2>
      <div>
        <label>Learning Plan Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>Resources</label>
        {resources.map((resource, index) => (
          <div key={index} className="resource-item">
            <input
              type="text"
              value={resource.name}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="Enter resource"
            />
            <button 
              onClick={() => handleDeleteResource(index)} 
              className="delete-resource-btn">
              -
            </button>
          </div>
        ))}
        <button className="resousebtn" onClick={handleAddResource}>+ </button>
      </div>
      <div className="lpbutton-container">
        <button className ="savebtn"onClick={handleSave}>Save</button>
        <button className ="delbtn"onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// Display List of Learning Plans with Edit and Delete Options
function LearningPlansList({ plans, onDelete, onEdit }) {
  const calculateTimeRemaining = (endDate) => {
    if (!endDate) return 'No End Date';
  
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
  
    if (diffTime < 0) {
      return 'Expired';
    }
  
    const remainingDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Days
    const remainingHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
  
    return `${remainingDays} day(s) and ${remainingHours} hour(s) remaining`;
  };
  

  return (
    <div className="savedlplist">
      <h2 className='exist'>Existing Learning Plans</h2>
      {plans.length === 0 ? (
        <p>No plans available.</p>
      ) : (
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              <h3>{plan.title}</h3>
              <p>Status: {plan.status}</p>
              
              <p><strong>Time Remaining:</strong> {calculateTimeRemaining(plan.endDate)}</p>
              <div className="plan-actions">
                <button onClick={() => onEdit(plan.id)}>Edit</button>
                <button onClick={() => onDelete(plan.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



export default LearningPlansDashboard;

