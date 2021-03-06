import React, { useContext } from 'react'
import placeIcon from '../icons/place.svg'
import { Context } from '../ContextProvider'
import icons from '../icons'

export default function TodayWeather({
  todayWeather,
  dateToDisplay,
  dataByCity,
}) {
  const { converted } = useContext(Context)
  const weatherIcon = icons.find(
    (icon) => icon.name === todayWeather.weather_state_name
  )
  console.log(weatherIcon)
  return (
    <section className='today-wrapper'>
      <img
        src={weatherIcon && weatherIcon.src}
        alt={todayWeather.weather_state_name}
        className='today-icon'
      />
      <h3 className='temperature'>
        {converted ? (
          <>
            <span className='today-degree'>{`${Math.round(
              todayWeather.the_temp * (9 / 5) + 32
            )}`}</span>
            <span className='today-degree-sign'>°F</span>
          </>
        ) : (
          <>
            <span className='today-degree'>{`${Math.round(
              todayWeather.the_temp
            )}`}</span>
            <span className='today-degree-sign'>°C</span>
          </>
        )}
      </h3>
      <p className='today-weather-state'>{todayWeather.weather_state_name}</p>
      <p className='today-date'>
        Today . {dateToDisplay(todayWeather.applicable_date)}
      </p>
      <p className='location'>
        <img src={placeIcon} alt='' className='place-icon' />
        {dataByCity.title || 'Nairobi'}
      </p>
    </section>
  )
}
