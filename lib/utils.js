// lib/utils.js
//prekonvertuje dátum z formátu "Sun, 10/15/2023" na formát "October 15, 2023"
export function formatDate(dateString) {
    const parts = dateString.split(', ')[1].split('/');
    const year = parts[2];
    const month = parts[0] - 1; // Mesiace v JavaScripte sú indexované od 0
    const day = parts[1];
    const date = new Date(year, month, day);
  
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }