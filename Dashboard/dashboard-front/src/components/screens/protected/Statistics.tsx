import { useEffect, useState } from 'react';
import { apiServices } from '~/api/APIservices';
import Head from '~/components/shared/Head';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import MeetingsTable from '~/components/utils/meetingsTable';

interface Meeting {
  companyId: string;
  companyName: string;
  location: string;
  meetingDate: Date;
  summary: string;
}

export default function Statistics() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const getMeetings = async () => {
    const meetings = await apiServices.meetings.getAll();
    setMeetings(meetings);
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const getMeetingsPerDay = () => {
    const meetingsPerDay: { [key: string]: number } = {};
    meetings.forEach((meeting) => {
      const date = new Date(meeting.meetingDate).toDateString();
      meetingsPerDay[date] = (meetingsPerDay[date] || 0) + 1;
    });
    const sortedMeetingsPerDay = Object.entries(meetingsPerDay).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
    return {
      labels: sortedMeetingsPerDay.map(([date]) => date),
      datasets: [
        {
          label: 'Number of Meetings',
          data: sortedMeetingsPerDay.map(([_, count]) => count),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getMeetingsForCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const meetingsForCurrentMonth = meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.meetingDate);
      return meetingDate.getMonth() === currentMonth && meetingDate.getFullYear() === currentYear;
    });
    return meetingsForCurrentMonth.length;
  };

  const getMeetingsPercentagePerDay = () => {
    const meetingsPerDay: { [key: string]: number } = {};
    const totalMeetings = meetings.length;
    meetings.map((meeting) => {
      const date = new Date(meeting.meetingDate).toDateString();
      meetingsPerDay[date] = (meetingsPerDay[date] || 0) + 1;
    });
    const sortedMeetingsPerDay = Object.entries(meetingsPerDay).sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );

    return {
      labels: sortedMeetingsPerDay.map(([date]) => date),
      datasets: [
        {
          label: 'Percentage of Meetings',
          data: sortedMeetingsPerDay.map(([_, count]) => {
            const percentage = (count / totalMeetings) * 100;
            return percentage.toFixed(2);
          }),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const meetingsPerDayData = getMeetingsPerDay();
  const meetingsForCurrentMonth = getMeetingsForCurrentMonth();
  const meetingsPercentagePerDayData = getMeetingsPercentagePerDay();

  return (
    <>
      <Head title="Statistics" />
      <div className="hero flex-grow">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold">Statistics</h1>
            <div className="card-body" style={{ minWidth: 650 }}>
              <div>
                <div>
                  <h1>Number of meetings per day:</h1>
                  <Bar data={meetingsPerDayData} />
                </div>
                <div>
                  <h2>Number of meetings for the existing month:</h2>
                  <p>{meetingsForCurrentMonth}</p>
                </div>
                <div>
                  <h2>Percentage of the number of meetings per day:</h2>
                  <Bar data={meetingsPercentagePerDayData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}