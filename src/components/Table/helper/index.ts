import { IActivity, ICalculation } from "@/types/";

export const calculateTotalEarnings = (rows: IActivity[]) => {
  let totalMinutes = 0;
  let totalEarnings = 0;

  rows.forEach(row => {
    const parts = row.duration.split(' ');
    const days = parseInt(parts[0]) || 0;
    const hours = parseInt(parts[2]) || 0;
    const minutes = parseInt(parts[4]) || 0;
    totalMinutes += (days * 24 * 60) + (hours * 60) + minutes;

    if (row.user && typeof row.user.rate === 'number') {
      const ratePerMinute = row.user.rate;
      const earnings = (totalMinutes / 60) * ratePerMinute;
      totalEarnings += earnings;
    } else {
      console.warn(`User or rate is undefined for activity: ${row}`);
    }
  });

  return totalEarnings;
};

export const calculateTotalDuration = (rows: IActivity[]) => {
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