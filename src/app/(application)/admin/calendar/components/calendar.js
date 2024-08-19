import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Calendar() {
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);
    return (
    <div className='full-calendar w-[75rem] bg-primary-card rounded px-6 py-7 border-0 shadow-lg'>
        <FullCalendar
                cla
                plugins={[
                resourceTimelinePlugin,
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
                ]}
                headerToolbar={{
                left: 'prev next today',
                center: 'title',
                right: 'dayGridMonth timeGridWeek timeGridDay'
                }}
                buttonText={{
                customMonth: 'Month', // Custom label for Month view
                customWeek: 'Week',   // Custom label for Week view
                customDay: 'Day'      // Custom label for Day view
                }}
                views={{
                customMonth: { type: 'dayGridMonth' }, // Assign dayGridMonth view to customMonth
                customWeek: { type: 'timeGridWeek' },  // Assign timeGridWeek view to customWeek
                customDay: { type: 'timeGridDay' }     // Assign timeGridDay view to customDay
                }}
                initialView='dayGridMonth'
                nowIndicator={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                resources={[
                { id: 'a', title: 'Auditorium A', eventColor : 'green'},
                { id: 'b', title: 'Auditorium B', eventColor: 'blue' },
                { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
                ]}
                initialEvents={[
                { title: 'Test Event 1', start: new Date(), resourceId : 'a' },
                { title: 'Test Event 3', start: fiveDaysFromNow, resourceId : 'c' },
                ]}
                eventClassNames={()=>{return ["custom-event-button"]}}
            />
    </div>
  )
}