interface WeatherDay {
  date: string
  icon: string
  temp: string
  sunset: string
}

interface Weather {
  days: WeatherDay[]
  alert: string
  recommendation: string
}

export function WeatherAlert({ weather }: { weather: Weather }) {
  return (
    <div className="rounded-md border-l-4 border-[#FFC700] bg-[#FFF3CD] p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-base">⚠️</span>
        <span className="text-sm font-semibold text-[#8B6914]">Weather Window Closing</span>
      </div>

      <div className="mb-3 border-t border-dotted border-[#E9C46A]" />

      <div className="space-y-2">
        {weather.days.map((day, index) => (
          <div key={index} className="flex items-center gap-3 text-sm text-[#8B6914]">
            <span className="w-16 font-medium">{day.date}</span>
            <span>{day.icon}</span>
            <span>{day.temp}</span>
            {day.sunset && <span className="text-xs text-[#9B8A4A]">{day.sunset}</span>}
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-dotted border-[#E9C46A]" />

      <div className="text-sm text-[#8B6914]">
        <div className="mb-2">🌸 {weather.alert}</div>
      </div>

      <div className="mt-3 border-t border-dotted border-[#E9C46A]" />

      <div className="mt-3 text-sm font-semibold text-[#8B6914]">{weather.recommendation}</div>
    </div>
  )
}
