const iconCodes = [

            {
                code: 1000,
                icon: "weather-sunny"
            },

            {
                code: 1003,
                icon: "weather-partly-cloudy"
            },

            {
                code: 1006,
                icon: "cloud-outline"
            },

            {
                code: 1009,
                icon: "weather-cloudy-alert"
            },

        ]

export const getWeatherIcon = (code?: number) => {
    const iconName = iconCodes.find(icon => icon.code === code)
    return iconName?.icon || "weather-sunny-off"
}

