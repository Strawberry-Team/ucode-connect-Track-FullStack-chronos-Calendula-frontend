import { Button } from "@/components/ui/button.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input.tsx";
import { useEffect, useState } from "react";
import { SidebarHeader } from "@/components/ui/sidebar.tsx";
import { NavUser } from "@/components/calendar/NavUser.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/components/redux/store.ts";
import { createPortal } from "react-dom";
import { format, sub, add } from "date-fns";

interface CustomToolbarFullCalendarProps {
    calendarApi: {
        prev: () => void;
        next: () => void;
        today: () => void;
        changeView: (view: string) => void;
        getTitle: () => string;
    } | null;
    title?: string;
    currentView?: string;
    events: EventType[];
    onEventSelect: (event: any) => void;
    onDateChange?: (date: Date) => void;
}

interface EventType {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    extendedProps?: {
        attendanceStatus?: "yes" | "no" | "maybe" | undefined;
        calendarId?: number;
        color?: string;
        calendarColor?: string;
        description?: string;
        type?: string;
        calendarType?: string;
    };
}

const DEFAULT_CALENDAR_COLOR = "#039BE5";

export default function CustomToolbarFullCalendar({
                                                      calendarApi,
                                                      title,
                                                      currentView,
                                                      events,
                                                      onEventSelect,
                                                      onDateChange,
                                                  }: CustomToolbarFullCalendarProps) {
    const [selectedView, setSelectedView] = useState("Week");
    const user = useSelector((state: RootState) => state.auth.user);
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const calendars = useSelector((state: RootState) => state.calendars.calendars);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
    const [searchPosition, setSearchPosition] = useState({ x: 0, y: 0, width: 0 });
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredEvents([]);
            return;
        }
        const now = new Date();
        const matchingEvents = events.filter((event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.extendedProps?.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const uniqueEventsMap = new Map<string, EventType>();
        matchingEvents.forEach((event) => {
            const key = event.title.toLowerCase();
            const existingEvent = uniqueEventsMap.get(key);

            if (!existingEvent) {
                uniqueEventsMap.set(key, event);
            } else {
                const existingDiff = Math.abs(existingEvent.start.getTime() - now.getTime());
                const newDiff = Math.abs(event.start.getTime() - now.getTime());
                if (newDiff < existingDiff) {
                    uniqueEventsMap.set(key, event);
                }
            }
        });

        const uniqueEvents = Array.from(uniqueEventsMap.values()).sort(
            (a, b) => Math.abs(a.start.getTime() - now.getTime()) - Math.abs(b.start.getTime() - now.getTime())
        );
        setFilteredEvents(uniqueEvents);

        const inputElement = document.querySelector(".search-input");
        if (inputElement) {
            const rect = inputElement.getBoundingClientRect();
            setSearchPosition({ x: rect.left, y: rect.bottom + 5, width: rect.width });
        }
    }, [searchQuery, events]);

    useEffect(() => {
        if (currentView) {
            const viewMap: { [key: string]: string } = {
                dayGridMonth: "Month",
                timeGridWeek: "Week",
                timeGridDay: "Day",
            };
            setSelectedView(viewMap[currentView] || "Week");
        }
    }, [currentView]);

    const handleViewChange = (view: string) => {
        setSelectedView(view);
        if (calendarApi) {
            switch (view) {
                case "Month":
                    calendarApi.changeView("dayGridMonth");
                    break;
                case "Week":
                    calendarApi.changeView("timeGridWeek");
                    break;
                case "Day":
                    calendarApi.changeView("timeGridDay");
                    break;
                default:
                    break;
            }
        }
    };

    const handlePrev = () => {
        if (calendarApi && currentView) {
            calendarApi.prev();
            let newDate: Date;
            switch (currentView) {
                case "dayGridMonth":
                    newDate = sub(currentDate, { months: 1 });
                    break;
                case "timeGridWeek":
                    newDate = sub(currentDate, { weeks: 1 });
                    break;
                case "timeGridDay":
                    newDate = sub(currentDate, { days: 1 });
                    break;
                default:
                    newDate = sub(currentDate, { weeks: 1 });
            }
            setCurrentDate(newDate);
            onDateChange?.(newDate);
        }
    };

    const handleNext = () => {
        if (calendarApi && currentView) {
            calendarApi.next();
            let newDate: Date;
            switch (currentView) {
                case "dayGridMonth":
                    newDate = add(currentDate, { months: 1 });
                    break;
                case "timeGridWeek":
                    newDate = add(currentDate, { weeks: 1 });
                    break;
                case "timeGridDay":
                    newDate = add(currentDate, { days: 1 });
                    break;
                default:
                    newDate = add(currentDate, { weeks: 1 });
            }
            setCurrentDate(newDate);
            onDateChange?.(newDate);
        }
    };

    const handleToday = () => {
        if (calendarApi) {
            calendarApi.today();
            const newDate = new Date();
            setCurrentDate(newDate);
            onDateChange?.(newDate);
        }
    };

    const getCalendarColor = (calendarId: number | undefined): string => {
        if (!currentUser?.id || !calendarId) {
            return DEFAULT_CALENDAR_COLOR;
        }
        const calendar = calendars.find((cal) => cal.id === calendarId);
        if (!calendar || !calendar.participants) {
            return DEFAULT_CALENDAR_COLOR;
        }
        const participant = calendar.participants.find((p) => p.userId === currentUser.id);
        return participant?.color || DEFAULT_CALENDAR_COLOR;
    };

    const handleEventClick = async (event: EventType) => {
        const eventId = parseInt(event.id, 10);
        const response = await import("@/components/redux/actions/eventActions.ts").then(
            (module) => module.getEventById(eventId)
        );
        if (response.success) {
            const currentUserParticipant = response.data.participants.find(
                (p: any) => p.userId === currentUser?.id
            );
            const calendarColor = getCalendarColor(response.data.calendarId);
            const eventColor = event.extendedProps?.color || currentUserParticipant?.color || calendarColor;
            const eventData = {
                id: response.data.id.toString(),
                title: response.data.title,
                start: response.data.startAt,
                end: response.data.endAt,
                description: response.data.description,
                category: response.data.category,
                type: response.data.type,
                creationByUserId: response.data.creationByUserId,
                calendarTitle: response.data.calendar?.title,
                calendarType: response.data.calendar?.type,
                calendarId: response.data.calendarId,
                color: eventColor,
                notifyBeforeMinutes: response.data.notifyBeforeMinutes,
                creator: {
                    id: response.data.creator.id,
                    fullName: response.data.creator.fullName,
                    email: response.data.creator.email,
                    profilePicture: response.data.creator.profilePicture,
                    attendanceStatus: response.data.participants.find(
                        (p: any) => p.userId === response.data.creator.id
                    )?.attendanceStatus,
                },
                participants: response.data.participants.map((p: any) => ({
                    id: p.user.id,
                    fullName: p.user.fullName,
                    email: p.user.email,
                    profilePicture: p.user.profilePicture,
                    attendanceStatus: p.attendanceStatus,
                    color: p.color,
                })),
            };
            onEventSelect(eventData);
            setSearchQuery("");
            setFilteredEvents([]);
        }
    };

    return (
        <div className="flex items-center justify-between gap-4 w-full relative">
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={handleToday}
                    disabled={!calendarApi}
                    className="text-[16px] py-5 px-7 rounded-full font-medium"
                >
                    Today
                </Button>
                <div className="flex gap-0">
                    <Button
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={!calendarApi}
                        className="text-[16px] py-5 px-7 rounded-full"
                    >
                        <ChevronLeft strokeWidth={3} />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleNext}
                        disabled={!calendarApi}
                        className="text-[16px] py-5 px-7 rounded-full"
                    >
                        <ChevronRight strokeWidth={3} />
                    </Button>
                </div>
            </div>
            {title && <span className="text-[21px] font-medium">{title}</span>}
            <div className="relative flex items-center gap-4 flex-1 justify-center">
                <Input
                    className={`search-input text-[16px] py-5 px-5 font-medium w-full transition-all ${
                        searchQuery ? "rounded-t-full rounded-b-none" : "rounded-full"
                    }`}
                    type="text"
                    placeholder="Find events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && createPortal(
                    <div
                        className="bg-white border border-gray-200 shadow-lg max-h-[200px] custom-scroll overflow-y-auto"
                        style={{
                            position: "absolute",
                            top: searchPosition.y - 6,
                            left: searchPosition.x,
                            width: searchPosition.width,
                            zIndex: 10001,
                        }}
                    >
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleEventClick(event)}
                                >
                                    <p className="text-sm font-medium">
                                        {event.title}
                                        <span className="text-xs text-gray-500 ml-2">
                                            {format(event.start, "MMM d, yyyy")}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {event.extendedProps?.description || "No description"}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-sm text-gray-500">
                                Not found
                            </div>
                        )}
                    </div>,
                    document.body
                )}
            </div>
            <div className="flex items-center gap-0">
                <Select
                    value={selectedView}
                    onValueChange={handleViewChange}
                    disabled={!calendarApi}
                >
                    <SelectTrigger className="text-[16px] py-5 px-5 rounded-full font-medium cursor-pointer">
                        <SelectValue placeholder="Выберите вид" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Month" className="cursor-pointer">Month</SelectItem>
                        <SelectItem value="Week" className="cursor-pointer">Week</SelectItem>
                        <SelectItem value="Day" className="cursor-pointer">Day</SelectItem>
                    </SelectContent>
                </Select>
                <SidebarHeader>
                    {user ? <NavUser user={user} /> : <span>Loading...</span>}
                </SidebarHeader>
            </div>
        </div>
    );
}