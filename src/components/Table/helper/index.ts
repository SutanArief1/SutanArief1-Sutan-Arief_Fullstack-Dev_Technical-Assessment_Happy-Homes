import { ICalculation } from "@/types/";

export const calculateTotalEarnings = (rows: ICalculation[]) => {  
  let totalMinutes = 0;
  let ratePerMinute = 0;
  rows.forEach(row => {
    const parts = row.duration.split(' ');
    const days = parseInt(parts[0]) || 0;
    const hours = parseInt(parts[2]) || 0;
    const minutes = parseInt(parts[4]) || 0;
    totalMinutes += (days * 24 * 60) + (hours * 60) + minutes;
    ratePerMinute = row.user.rate
  });
  ratePerMinute / 60
  const totalHours = totalMinutes / 60;
  return totalHours * ratePerMinute;
}


export const calculateTotalDuration = (rows: ICalculation[]) => {
  let totalMinutes = 0;
  rows.forEach(row => {
    const parts = row.duration.split(' ');
    const days = parseInt(parts[0]) || 0;
    const hours = parseInt(parts[2]) || 0;
    const minutes = parseInt(parts[4]) || 0;
    totalMinutes += (days * 24 * 60) + (hours * 60) + minutes;
  });
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const totalDays = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;
  return `${totalDays} Hari ${remainingHours} Jam ${remainingMinutes} Menit`;
}