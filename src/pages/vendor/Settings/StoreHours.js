import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function StoreHours() {
  const [timeSlots, setTimeSlots] = useState(
    daysOfWeek.map((day) => ({
      day,
      slots: [{ opening: "", closing: "" }],
    }))
  );

  const handleAddSlot = (index) => {
    const newSlots = [...timeSlots];
    newSlots[index].slots.push({ opening: "", closing: "" });
    setTimeSlots(newSlots);
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const newSlots = [...timeSlots];
    if (newSlots[dayIndex].slots.length > 1) {
      newSlots[dayIndex].slots.splice(slotIndex, 1);
      setTimeSlots(newSlots);
    }
  };

  const handleTimeChange = (dayIndex, slotIndex, field, value) => {
    const newSlots = [...timeSlots];
    newSlots[dayIndex].slots[slotIndex][field] = value;
    setTimeSlots(newSlots);
  };

  // Function to handle the save button click
  const handleSave = () => {
    console.log("Store Hours Settings:", timeSlots);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 col-12 mb-5 d-flex justify-content-start">
          <label className="form-label fw-bold">Enable Store Hours</label>
        </div>
        <div className="col-md-6 col-12 mb-5">
          <input
            type="checkbox"
            className="form-check"
            name="hideEmail"
          />
        </div>
        <div className="col-md-6 col-12 mb-5 d-flex justify-content-start">
          <label className="form-label fw-bold">Enable Purchase During OFF Time</label>
        </div>
        <div className="col-md-6 col-12 mb-5">
          <input
            type="checkbox"
            className="form-check"
            name="hidePhone"
          />
        </div>
        <div className="form-group mb-3 d-flex justify-content-between ">
          <label className="fw-bold">
            Set Week OFF
          </label>
          <select
            type="text"
            className='form-select w-50'>
            <option selected></option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
      </div>

      <h4 className="text-primary my-5">Daily Basis Opening & Closing Hours</h4>

      {timeSlots.map((day, dayIndex) => (
        <Card key={dayIndex} className="mb-3">
          <Card.Header className="text-primary">{day.day} Time Slots</Card.Header>
          <Card.Body>
            {day.slots.map((slot, slotIndex) => (
              <div key={slotIndex} className="row">
                <div className="col-md-5 co-12">
                  <input
                    type="time"
                    value={slot.opening}
                    onChange={(e) =>
                      handleTimeChange(dayIndex, slotIndex, "opening", e.target.value)
                    }
                    className="form-control me-2 mb-3"
                    placeholder="Opening"
                  />
                </div>
                <div className="col-md-5 co-12">
                  <input
                    type="time"
                    value={slot.closing}
                    onChange={(e) =>
                      handleTimeChange(dayIndex, slotIndex, "closing", e.target.value)
                    }
                    className="form-control me-2"
                    placeholder="Closing"
                  />
                </div>
                <div className="col-md-2 col-12 d-lg-flex mt-3">
                  <button
                    className="btn btn-sm rounded"
                    onClick={() => handleAddSlot(dayIndex)}
                  >
                    <FaPlus />
                  </button>
                  {slotIndex > 0 && (
                    <button
                      className="btn btn-outline-danger ms-2 btn-sm"
                      onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
      <div className="text-end mt-4 mb-3">
        <button onClick={handleSave} className="btn btn-sm btn-outline-primary" >
          Save
        </button>
      </div>
    </div>
  );
}

export default StoreHours;
