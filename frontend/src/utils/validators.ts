export const isValidDate = (dateString: string) => {
  // verifica o padrão via regex (DD/MM/YYYY)
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }

  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Verifica os intervalos numéricos
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Ajustes para ano bissexto
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Por fim, verifica os intervalos de dias corrigidos com ano bissexto
  return day > 0 && day <= monthLength[month - 1];
};
