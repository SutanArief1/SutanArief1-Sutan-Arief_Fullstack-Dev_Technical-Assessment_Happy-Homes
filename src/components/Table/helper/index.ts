import { IActivity } from "@/types/";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

export const calculateTotalDuration = (activities: IActivity[]) => {  
  let totalDuration = dayjs.duration(0);

  activities.forEach(activity => {
    const durationParts = activity.duration.split(' ');

    let days = 0;
    let hours = 0;
    let minutes = 0;

    for (let i = 0; i < durationParts.length; i += 2) {
      const value = parseInt(durationParts[i]) || 0;
      const unit = durationParts[i + 1];

      if (unit === 'Hari') {
        days += value;
      } else if (unit === 'Jam') {
        hours += value;
      } else if (unit === 'menit') {
        minutes += value;
      }
    }

    totalDuration = totalDuration.add(dayjs.duration({
      days: days,
      hours: hours,
      minutes: minutes,
    }));
  });

  const totalDays = Math.floor(totalDuration.asDays());
  const remainingHours = totalDuration.subtract(dayjs.duration({ days: totalDays })).hours();
  const remainingMinutes = totalDuration.subtract(dayjs.duration({ days: totalDays, hours: remainingHours })).minutes();

  return `${totalDays} Hari ${remainingHours} Jam ${remainingMinutes} Menit`;
}