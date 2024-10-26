# **AeroSense: AI-Driven Air Quality Prediction and Forecasting**

The **AeroSense** web application is an advanced tool designed for real-time prediction, monitoring of the Air Quality Index (AQI) across major cities and stations in India. Utilizing cutting-edge machine learning models, deep learning techniques, and time-series forecasting, AeroSense offers users comprehensive insights into current and future air quality, empowering individuals and policymakers to make data-driven decisions regarding environmental health.
![image](https://github.com/user-attachments/assets/4506c0b5-c80e-4731-aebf-13ae35dbad45)

## **Key Features**

### **AQI Prediction**
![image](https://github.com/user-attachments/assets/9e3e1e2d-6ec4-437e-9b27-9e3a1ba49ec1)
AeroSense allows users to predict air quality precisely across any city or station in India. The application leverages sophisticated **time-series models** to forecast pollutant concentrations, which are then processed through deep learning networks to compute AQI based on **CPCB AQI calculation standards**. Users can:

- Select a city or monitoring station.
- Specify a future date and time for prediction.
- Receive immediate air quality predictions based on forecasted pollutant levels.

### **Real-time AQI Monitoring**
Access live AQI data for **12 major metro cities** in India, along with a nationwide overview. The intuitive dashboard enables users to:

- Track current AQI levels in real-time.
- Compare air quality across different cities.
- Obtain an at-a-glance summary of the nation’s overall air quality.

### **AQI Forecasting**
Analyze AQI trends with predictions covering **four days prior** and **four days ahead** of any selected date. This feature provides users with valuable insight into historical and forecasted air quality, helping to anticipate and prepare for environmental changes by:

- Reviewing historical air quality data.
- Exploring future AQI trends.
- Making informed decisions based on forecasted air quality conditions.

### **Weather Integration**
Weather conditions are seamlessly integrated into the dashboard, providing users with up-to-date information on:
![image](https://github.com/user-attachments/assets/98d6a5a5-5f60-4219-9507-6b96b324b637)

- Current **temperature, humidity, precipitation, and wind speed**.
- **5-day weather forecast**, helping users plan ahead based on both weather and air quality predictions.

### **Lightweight LSTM Neural Network for Air Quality Prediction**
AeroSense utilizes **Lightweight Long Short-Term Memory (LSTM) Neural Networks** for time-series forecasting of air quality. This model is optimized to:

- Predict future AQI values with minimal computational resources by efficiently analyzing historical pollutant data.

- Process data from various air quality stations, including PM2.5, NO2, CO, SO2, O3, and other key pollutants.
 
- Leverage temporal features like date, time, and seasonality, while maintaining fast and accurate predictions on low-power devices.

## **Technology Stack**

- **Frontend:** HTML5, CSS3 (Tailwind CSS), JavaScript (Next.JS)
- **Backend:** Python & Django
- **Machine Learning & Deep Learning:** TensorFlow, Keras, LSTM Neural Networks
- **Data Processing:** Pandas, NumPy, Scikit-learn
- **API Integration:** Real-time AQI data APIs and weather forecast APIs

## **How AeroSense Works**

1. **Data Collection:** Real-time AQI and weather data are continuously fetched from monitoring stations and external APIs.
2. **Data Preprocessing:** The raw data is processed, including **feature scaling** and **sequence creation**, to prepare it for prediction.
3. **Prediction Engine:** Using **LSTM models**, future pollutant concentrations are forecasted, and AQI values are computed.
4. **Interactive User Interface:** Users can explore predictions through an intuitive interface, selecting cities, and dates.
5. **Insights:** Input environmental factors such as temperature and vehicular traffic, and visualize their real-time effect on future AQI.

## **Future Enhancements**

- Development of a **mobile application** for on-the-go AQI monitoring and forecasting.
- Enhanced **AI-driven suggestions** with more granular insights into health risks and mitigation strategies.
- Expansion of AQI monitoring to cover additional cities and rural regions across India.
- Global AQI tracking for international comparison and insights into air quality trends worldwide.

## Contact

If you come across any issues, have suggestions for improvement, or want to discuss further enhancements, feel free to contact me at [jaya2004kra@gmail.com](mailto:jaya2004kra@gmail.com). Your feedback is greatly appreciated.

## License

All the code and resources in this repository are licensed under the GNU General Public License. You are free to use, modify, and distribute the code under the terms of this license. However, I do not take responsibility for the accuracy or reliability of the programs.

## Our Social Profiles:

- [**LINKEDIN - Jayashre**](https://www.linkedin.com/in/jayashrek/)
- [**LINKEDIN - Harshitha**](https://www.linkedin.com/in/harshitha-sundar-118840259/)
- [**LINKEDIN - Padmajaa**](https://www.linkedin.com/in/padmajaa-sridhar/)
- [**LINKEDIN - Mridulla**](https://www.linkedin.com/in/mridulla-k-madhu-2b1618258/)
