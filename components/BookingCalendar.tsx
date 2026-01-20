
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { formatRangeDate } from '@/utils/datesUtils';


export default function BookingCalendar() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    key: 'selection',
  });

  const handleSelect = (ranges: any) => {
    setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  return (
    <div>
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        moveRangeOnFirstSelection={false}
      />
      <p>
        {formatRangeDate(selectionRange.startDate, selectionRange.endDate)}
      </p>
    </div>
  );
}
