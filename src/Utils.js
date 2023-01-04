export function celsiusToFahrenheit(celsius) {
    const fahrenheit = celsius * (9/5) + 32;

    return fahrenheit.toFixed(0);
  }
  
export function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * (5/9);
    
    return celsius.toFixed(0);
  }