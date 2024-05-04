import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../App.css'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function Calendar() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
        const data = await response.json();
        return data.map((training) => {
            // Luo uusi Date objecti training ajankohdan alulle
            const eventStart = new Date(training.date);
            // Lisää training.duration eventStart muuttujaan jotta saadaan treenin pituus
            eventStart.setMinutes(eventStart.getMinutes() + training.duration);

            return {
                // aseta kalenteriin activity sekä asiakkaan etu- ja sukunimi jos etu- tai sukunimi ovat tyhjiä aseta ''
                title: `${training.activity} - ${training.customer?.firstname || ''} ${training.customer?.lastname || ''}`,
                start: training.date,
                end: eventStart.toISOString(),
            };
        });
    };

    useEffect(() => {
        fetchEvents().then(setEvents).catch(console.error);
    }, []);

    const handleMouseEnter = (eventinfo) => {
        // const ajan formatoimiseen
        const timeFormat = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });
        // const eventin aloitusajalle
        const startTime = timeFormat.format(eventinfo.event.start);
        // const eventin lopetusajalle
        const endTime = timeFormat.format(eventinfo.event.end);


        tippy(eventinfo.el, {
            content: `<b>${eventinfo.event.title}</b><br>Start: ${startTime}<br>End: ${endTime}`,
            // allow HTML jotta <br> ja <b> toimii
            allowHTML: true,
        });
    };

    return (
        <div style={{ width: 1500, marginTop: 80, marginBottom: 80 }}>
            <FullCalendar
                nowIndicator={true}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                events={events}
                headerToolbar={{ start: 'today prev,next', center: 'title', end: 'dayGridMonth,timeGridWeek' }}

                // näytä kello muodossa 00:00 pm/am
                slotLabelFormat={[
                    {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: 'short'
                    }
                ]}

                firstDay={1} // aloita viikko maanantaista
                allDaySlot={false} // poista all-day rivi
                dayHeaderFormat={{ day: 'numeric', weekday: 'short' }} //näytä ylärivillä päivänro/viikonpäivä
                slotEventOverlap={false} // älä laita samaan aikaan tapahtuvia trainingeja päällekkäin vaan vierekkäin
                eventMouseEnter={handleMouseEnter} // tippy mouse hover tapahtuma
            />
        </div>
    );
};
