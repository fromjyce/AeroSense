export default function InfoDisplay({ 
    date, 
    datetime, 
    city, 
    stationName, 
    startDate, 
    endDate, 
    startDatetime, 
    endDatetime 
  }) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold oswald gauge-project-text mb-4">Prediction Parameters</h2>
        <div className="flex justify-between items-center">
          <div>
            {date && (
              <p className="poppins info-text">
                <span className="font-bold prefix">Date:</span> <span className="font-medium suffix">{date}</span>
              </p>
            )}
            {datetime && (
              <p className="poppins info-text">
                <span className="font-bold prefix">DateTime:</span> <span className="font-medium suffix">{datetime}</span>
              </p>
            )}
            {startDate && (
              <p className="poppins info-text">
                <span className="font-bold prefix">Start Date:</span> <span className="font-medium suffix">{startDate}</span>
              </p>
            )}
            {endDate && (
              <p className="poppins info-text">
                <span className="font-bold prefix">End Date:</span> <span className="font-medium suffix">{endDate}</span>
              </p>
            )}
            {startDatetime && (
              <p className="poppins info-text">
                <span className="font-bold prefix">Start DateTime:</span> <span className="font-medium suffix">{startDatetime}</span>
              </p>
            )}
            {endDatetime && (
              <p className="poppins info-text">
                <span className="font-bold prefix">End DateTime:</span> <span className="font-medium suffix">{endDatetime}</span>
              </p>
            )}
          </div>
          <div className="text-right">
            {city && (
              <p className="poppins info-text">
                <span className="font-bold prefix">City:</span> <span className="font-medium suffix">{city}</span>
              </p>
            )}
            {stationName && (
              <p className="poppins info-text">
                <span className="font-bold prefix">Station:</span> <span className="font-medium suffix">{stationName}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  