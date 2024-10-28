"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Papa from 'papaparse';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cityDataUrl = '/dataset/city_data.csv';
const stationDataUrl = '/dataset/stations_data.csv';

export default function PredictCard() {
  const [predictOption, setPredictOption] = useState('city');
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [selectOption, setSelectOption] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [endTime, setEndTime] = useState('00:00');
  const [isWithRange, setIsWithRange] = useState(false);
  const today = new Date();
  const router = useRouter();

  useEffect(() => {
    Papa.parse(cityDataUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const cityList = results.data.map(({ City, State }) => `${City}, ${State}`);
        setCities(cityList);
      },
    });

    Papa.parse(stationDataUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const stationList = results.data.reduce((acc, { State, City, StationName, StationId, Status }) => {
          if (!acc[State]) acc[State] = {};
          if (!acc[State][City]) acc[State][City] = [];
          acc[State][City].push({ name: StationName, status: Status, id: StationId});
          return acc;
        }, {});
        setStations(stationList);
      },
    });
  }, []);

  const handleOptionChange = (e) => {
    setPredictOption(e.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setAvailableCities(Object.keys(stations[e.target.value] || {}));
  };

const handleTimeChange = (e) => {
  const selectedHour = parseInt(e.target.value, 10);
  const currentHour = new Date().getHours();

  if (selectedHour <= currentHour) {
    alert('Please select a start hour in the future.');
  } else {
    setSelectedTime(`${String(selectedHour).padStart(2, '0')}:00:00`);
  }
};

const handleEndTimeChange = (e) => {
  const selectedEndHour = parseInt(e.target.value, 10);
  const startHour = parseInt(selectedTime.split(':')[0], 10);
  const currentHour = new Date().getHours();
  const diffHours = selectedEndHour - startHour;

  if (selectedEndHour <= startHour) {
    alert('End hour must be after the start hour.');
  } else if (diffHours > 5) {
    alert('The difference between start hour and end hour should not exceed 5 hours.');
  } else if (selectedEndHour <= currentHour) {
    alert('Please select an end hour in the future.');
  } else {
    setEndTime(`${String(selectedEndHour).padStart(2, '0')}:00:00`);
  }
};

  const handleStartDateChange = (date) => {
    if (date) {
        setSelectedDate(date);
        if (selectOption === 'hourly' || selectOption === 'datetime') {
            setSelectedTime('00:00:00');
        }
    }
};
  
  const handleEndDateChange = (date) => {
    const diffInDays = (date - selectedDate) / (1000 * 60 * 60 * 24);
    const diffInHours = (date - selectedDate) / (1000 * 60 * 60);

    if (selectOption === 'date' && diffInDays > 5) {
      alert('The difference between start date and end date should not exceed 5 days.');
    } else if (selectOption === 'hourly' && diffInHours > 5) {
      alert('The difference between start hour and end hour should not exceed 5 hours.');
    } else if (selectOption === 'datetime' && diffInDays > 5) {
      alert('The difference between start date and end date should not exceed 5 days.');
    } else {
      setEndDate(date);
    }
  };

  const handlePredict = () => {
    if (!selectedCity && predictOption === 'city') {
        alert("Please select a city.");
        return;
    }
    if (selectOption !== 'hourly' && !selectedDate) {
      alert("Please select a date.");
      return;
  }

    if (selectOption === 'hourly' && !selectedTime) {
        alert("Please select a time.");
        return;
    }

    if (isWithRange && (!endDate || (selectOption === 'hourly' && !endTime))) {
        alert("Please select an end date/time for range.");
        return;
    }

    const formattedDate = selectedDate.toLocaleDateString('sv-SE');
    let payload = {}
    
    if (predictOption === 'city') {
        const cityName = selectedCity.split(',')[0];
        if (!isWithRange) {
            if (selectOption === 'date') {
                payload = { number: 1, city: cityName, date: formattedDate };
            } else if (selectOption === 'hourly') {
              const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${selectedTime}`;
              payload = { number: 2, city: cityName, datetime: todayFormatted };
            } else if (selectOption === 'datetime') {
              const selectedDateTime = selectedDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              payload = { number: 3, city: cityName, datetime: selectedDateTime };
            }
        } else {
            if (selectOption === 'date') {
              payload = { number: 4, city: cityName, startDate: formattedDate, endDate: endDate.toLocaleDateString('sv-SE') };
            } else if (selectOption === 'hourly') {
                const selectedStarthour = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${selectedTime}`;
                payload = { number: 5, city: cityName, startHour: selectedStarthour, endHour: `${today.toISOString().split('T')[0]} ${endTime}` };
            } else if (selectOption === 'datetime') {
              const selectedDateTime = selectedDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              const endDateTime = endDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              payload = { number: 6, city: cityName, startDateTime: selectedDateTime, endDateTime: endDateTime };         
            }
        }
    }

    if (predictOption === 'station' && selectedCity) {
        const station = stations[selectedState][selectedCity].find((stn) => stn.status === 'Active');
        if (!station) {
            alert("Please select an active station.");
            return;
        }
        if (!isWithRange) {
            if (selectOption === 'date') {
              payload = { number: 7, stationId: station.id, date: formattedDate };
            } else if (selectOption === 'hourly') {
              const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${selectedTime}`;
              payload = { number: 8, stationId: station.id, datetime: todayFormatted };
            } else if (selectOption === 'datetime') {
              const selectedDateTime = selectedDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              payload = { number: 9, stationId: station.id, datetime: selectedDateTime };
            }
        } else {
            if (selectOption === 'date') {
                payload = { number: 10, stationId: station.id, startDate: formattedDate, endDate: endDate.toISOString().split('T')[0] };
            } else if (selectOption === 'hourly') {
              const selectedStarthour = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} ${selectedTime}`;
              payload = { number: 11, stationId: station.id, startHour: selectedStarthour, endHour: `${today.toISOString().split('T')[0]} ${endTime}` };
            } else if (selectOption === 'datetime') {
              const selectedDateTime = selectedDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              const endDateTime = endDate.toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' }).replace('T', ' ');
              payload = { number: 12, stationId: station.id, startDateTime: selectedDateTime, endDateTime: endDateTime };
            }
        }
    }

    fetch(process.env.NEXT_PUBLIC_DJANGO_API_MAIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        const queryParams = new URLSearchParams({
          data: encodeURIComponent(JSON.stringify(payload)),
        }).toString();
        window.location.href = `/results?${queryParams}`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};

  return (
    <>
    <h3 className="text-3xl font-bold text-left oswald_card_title">Predict AQI</h3>
    <div className="input-boxes">
      <div className="flex flex-row gap-4">
        <div className='flex flex-col items-start'>
          <label htmlFor="predict-option" className="text-lg mt-2 text-left josefin_sans_dropdowns">Select an Option.</label>
          <select id="predict-option" onChange={handleOptionChange} className="mt-2 mb-5 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
            <option value="city">Predict by City</option>
            <option value="station">Predict by Station</option>
          </select>
        </div>
        <div className='flex flex-col items-start'>
          {predictOption === 'city' && (
            <>
              <label htmlFor="city-select" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select a City.</label>
              <select id="city-select" onChange={(e) => setSelectedCity(e.target.value)} className="mt-2 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
                <option value="">--Select a city--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className='flex flex-col items-start'>
          {predictOption === 'station' && (
            <>
              <label htmlFor="state-select" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select a State.</label>
              <select id="state-select" onChange={handleStateChange} className="mt-2 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
                <option value="">--Select a state--</option>
                {Object.keys(stations).map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      {predictOption === 'station' && selectedState && (
        <div className="flex flex-row">
          <div className="flex flex-col items-start mr-8">
            <label htmlFor="city-select" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select A City.</label>
            <select id="city-select" onChange={(e) => setSelectedCity(e.target.value)} className="mt-2 mb-5 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
              <option value="">--Select a city--</option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {selectedCity && (
            <div className="flex flex-col items-start">
              <label htmlFor="station-select" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select a Station.</label>
              <select id="station-select" className="mt-2 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
                <option value="">--Select a station--</option>
                {stations[selectedState][selectedCity].map((station, index) => (
                  <option key={index} value={station.name} disabled={station.status !== "Active"}>
                    {station.name} {station.status !== "Active" ? '(Inactive)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
    <div className="secondary-input-boxes">
    <div className='flex flex-row gap-12'>
      <div className='flex flex-col items-start'>
        <label htmlFor="select-option" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select an Option.</label>
        <select id="select-option" value={selectOption} onChange={(e) => setSelectOption(e.target.value)} className="mt-2 mb-5 p-2 border rounded josefin_sans uniform-width-aqi-dropdown">
          <option value="date">Predict Date wise</option>
          <option value="hourly">Predict Hourly</option>
          <option value="datetime">Predict DateTime wise</option>
        </select>
      </div>
      <div className='flex flex-row gap-1 items-center mt-3'>
        <input
          type="checkbox"
          id="with-range"
          onChange={(e) => setIsWithRange(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="with-range" className="text-lg text-left josefin_sans_dropdowns">With Range</label>
      </div>
    </div>
  </div>

  <div className='actual-input-boxes'>
    {selectOption === 'date' && (
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col items-start'>
          <label htmlFor="date-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">
            {isWithRange ? 'Select a Start Date.' : 'Select a Date.'}
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={handleStartDateChange}
            className="mt-2 p-2 mb-5 border rounded josefin_sans uniform-width-aqi-dropdown"
            dateFormat="yyyy-MM-dd"
            minDate={today}
          />
        </div>
        {isWithRange && (
          <div className='flex flex-col items-start'>
            <label htmlFor="end-date-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select an End Date.</label>
            <DatePicker
              id="end-date-picker"
              selected={endDate}
              onChange={handleEndDateChange}
              className="mt-2 p-2 border rounded josefin_sans uniform-width-aqi-dropdown"
              dateFormat="yyyy-MM-dd"
              minDate={selectedDate ? new Date(selectedDate) : today}
            />
          </div>
        )}
      </div>
    )}
    {selectOption === 'hourly' && (
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col items-start'>
          <label htmlFor="time-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">
            {isWithRange ? 'Select a Start Hour.' : 'Select an Hour.'}
          </label>
          <select
          value={selectedTime.split(':')[0]}
          onChange={handleTimeChange}
          className="mt-2 p-2 mb-5 border rounded josefin_sans uniform-width-aqi-dropdown"
        >
          {Array.from({ length: 24 }, (_, i) => {
            const currentHour = new Date().getHours();
            return (
              <option
                key={i}
                value={String(i).padStart(2, '0')}
                disabled={i <= currentHour}
              >
                {String(i).padStart(2, '0')}
              </option>
            );
          })}
        </select>
        </div>
        {isWithRange && (
          <div className='flex flex-col items-start'>
            <label htmlFor="end-time-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select an End Hour.</label>
            <select
              value={endTime.split(':')[0]}
              onChange={handleEndTimeChange}
              className="mt-2 p-2 mb-5 border rounded josefin_sans uniform-width-aqi-dropdown"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const startHour = parseInt(selectedTime.split(':')[0], 10);
                return (
                  <option
                    key={i}
                    value={String(i).padStart(2, '0')}
                    disabled={i <= startHour || i - startHour > 5}
                  >
                    {String(i).padStart(2, '0')}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    )}

    {selectOption === 'datetime' && (
      <div className='flex flex-row gap-4'>
        <div className='flex flex-col items-start'>
          <label htmlFor="datetime-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">
            {isWithRange ? 'Select a Start DateTime.' : 'Select a DateTime.'}
          </label>
          <DatePicker
            id="datetime-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="mt-2 p-2 mb-5 border rounded josefin_sans uniform-width-aqi-dropdown"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={today}
          />
        </div>
        {isWithRange && (
          <div className='flex flex-col items-start'>
            <label htmlFor="end-datetime-picker" className="mt-2 text-lg text-left josefin_sans_dropdowns">Select an End DateTime.</label>
            <DatePicker
              id="end-datetime-picker"
              selected={endDate}
              onChange={handleEndDateChange}
              className="mt-2 p-2 border rounded josefin_sans uniform-width-aqi-dropdown"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={selectedDate || today}
            />
          </div>
        )}
      </div>
    )}
  </div>
  <button 
        onClick={handlePredict}
        className="mt-4 text-white font-bold p-2 rounded questrial predict-button">Predict</button>
    </>
  );
}
