
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Filter, Plus, RefreshCw } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  startTime: string;
  duration: number;
  color: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  appointments: Appointment[];
}

const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: '田中美容',
    role: 'オーナー/トップスタイリスト',
    appointments: [
      { id: '1', clientName: '山田太郎', service: 'カット', startTime: '09:00', duration: 60, color: 'bg-blue-200' },
      { id: '2', clientName: '田中真美', service: 'スパ', startTime: '11:00', duration: 90, color: 'bg-green-200' }
    ]
  },
  {
    id: '2',
    name: '鈴木良子',
    role: 'シニアスタイリスト',
    appointments: [
      { id: '3', clientName: '佐藤花子', service: 'カット', startTime: '10:00', duration: 45, color: 'bg-pink-200' },
      { id: '4', clientName: '高橋健太', service: 'カット', startTime: '11:30', duration: 120, color: 'bg-red-200' }
    ]
  },
  {
    id: '3',
    name: '中村あかり',
    role: 'シニアスタイリスト',
    appointments: [
      { id: '5', clientName: '森田翔', service: 'パーマ', startTime: '10:30', duration: 180, color: 'bg-green-200' },
      { id: '6', clientName: '清水香織', service: 'カラー', startTime: '12:00', duration: 90, color: 'bg-blue-200' }
    ]
  },
  {
    id: '4',
    name: '佐藤健一',
    role: 'ジュニアスタイリスト',
    appointments: [
      { id: '7', clientName: '松本真一', service: 'カット', startTime: '09:30', duration: 60, color: 'bg-blue-200' },
      { id: '8', clientName: '吉田優子', service: 'スパ', startTime: '11:00', duration: 75, color: 'bg-green-200' }
    ]
  },
  {
    id: '5',
    name: '山田翔太',
    role: 'ジュニアスタイリスト',
    appointments: [
      { id: '9', clientName: '石井理恵', service: 'カット', startTime: '11:30', duration: 90, color: 'bg-blue-200' },
      { id: '10', clientName: '岡本剛', service: 'トリート', startTime: '12:30', duration: 60, color: 'bg-green-200' }
    ]
  }
];

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00'];
const availabilityNumbers = [5, 4, 3, 3, 4, 6, 5, 5, 4, 5, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 16)); // June 16, 2025

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1));
  };

  const getTimeSlotPosition = (startTime: string, duration: number) => {
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const startPosition = ((startHour - 9) * 120) + (startMinute * 2); // 120px per hour, 2px per minute
    const width = (duration / 60) * 120; // duration in minutes to pixels
    return { left: startPosition, width };
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">カレンダー</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            全てのスタッフ
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            新規予約
          </Button>
        </div>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold">
              {format(currentDate, 'yyyy-MM-dd')}
            </span>
            <Button variant="ghost" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Time Header */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 p-3 font-medium text-gray-700 bg-gray-50">時間</div>
                {timeSlots.map((time, index) => (
                  <div key={time} className="flex-1 p-3 text-center font-medium text-gray-700 bg-gray-50 border-l border-gray-200">
                    {time}
                  </div>
                ))}
              </div>

              {/* Availability Row */}
              <div className="flex border-b border-gray-200">
                <div className="w-48 p-3 font-medium text-gray-700 bg-gray-50">空き容量</div>
                {availabilityNumbers.slice(0, timeSlots.length).map((num, index) => (
                  <div key={index} className="flex-1 p-3 text-center border-l border-gray-200">
                    <span className={`inline-block w-6 h-6 rounded text-sm font-medium ${
                      num <= 3 ? 'bg-orange-100 text-orange-800' : 
                      num <= 5 ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {num}
                    </span>
                  </div>
                ))}
              </div>

              {/* Staff Rows */}
              {mockStaff.map((staff) => (
                <div key={staff.id} className="flex border-b border-gray-200">
                  <div className="w-48 p-3 border-r border-gray-200">
                    <div className="font-medium text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-500">{staff.role}</div>
                  </div>
                  <div className="flex-1 relative h-20">
                    {/* Time Grid Background */}
                    {timeSlots.map((_, index) => (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 border-l border-gray-200"
                        style={{ left: `${index * 20}%` }}
                      />
                    ))}
                    
                    {/* Appointments */}
                    {staff.appointments.map((appointment) => {
                      const position = getTimeSlotPosition(appointment.startTime, appointment.duration);
                      return (
                        <div
                          key={appointment.id}
                          className={`absolute top-2 bottom-2 ${appointment.color} border border-gray-300 rounded px-2 py-1 text-xs`}
                          style={{
                            left: `${(position.left / 600) * 100}%`,
                            width: `${(position.width / 600) * 100}%`
                          }}
                        >
                          <div className="font-medium truncate">{appointment.clientName}</div>
                          <div className="text-gray-600 truncate">{appointment.service}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">予約状況＆サービス凡例</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="font-medium mb-2">予約タイプ:</div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">直接予約</Badge>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">ホットペッパービューティー</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">オンライン予約</Badge>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">休憩</Badge>
              </div>
            </div>
            <div>
              <div className="font-medium mb-2">サービス:</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">カット</Badge>
                <Badge variant="outline">カラー</Badge>
                <Badge variant="outline">パーマ</Badge>
                <Badge variant="outline">トリート</Badge>
                <Badge variant="outline">スパ</Badge>
                <Badge variant="outline">カット+カラー</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
