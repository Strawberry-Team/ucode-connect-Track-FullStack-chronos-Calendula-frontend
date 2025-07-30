import React, {JSX} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
    Pencil,
    Trash2,
    X,
    Calendar,
    BriefcaseBusiness,
    Briefcase,
    Palette,
    Crown,
    UsersRound,
    Check,
    Video,
    BellRing,
    BookmarkCheck,
    Sofa,
    CalendarFold,
    ChevronDownIcon,
} from "lucide-react";
import {format} from "date-fns";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {ColorPicker} from "@/components/calendar/ColorPiker.tsx";
import {useDispatch} from "react-redux";
import {updateEventColorApi} from "@/components/redux/actions/eventActions.ts";
import {UiMessages} from "@/constants/uiMessages.ts";

interface User {
    id: number;
    fullName: string;
    email: string;
    profilePicture: string;
    attendanceStatus?: "yes" | "no" | "maybe";
    color?: string;
}

interface EventDetailsPopoverProps {
    position: { x: number; y: number };
    event: {
        id: string;
        title: string;
        start: string;
        end: string;
        description?: string;
        category?: string;
        type?: string;
        creationByUserId: number;
        calendarTitle?: string;
        calendarType?: string;
        calendarId: number;
        creator: User;
        participants: User[];
        color?: string;
        notifyBeforeMinutes?: number;
    };
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
    currentUserId?: number;
    onAttendanceChange?: (userId: number, status: "yes" | "no" | "maybe" | undefined) => void;
    onColorChange?: (eventId: string, newColor: string) => void;
}

export default function EventDetailsPopover({
                                                position,
                                                event,
                                                onEdit,
                                                onDelete,
                                                onClose,
                                                currentUserId,
                                                onAttendanceChange,
                                                onColorChange,
                                            }: EventDetailsPopoverProps) {
    const dispatch = useDispatch();

    const currentUserParticipant = event.participants.find(
        (p) => p.id === currentUserId
    );
    const initialColor = event.color || currentUserParticipant?.color || "#039BE5";
    const [color, setColor] = React.useState<string>(initialColor);

    React.useEffect(() => {
        const updatedCurrentUserParticipant = event.participants.find(
            (p) => p.id === currentUserId
        );
        const updatedColor = event.color || updatedCurrentUserParticipant?.color || "#039BE5";
        setColor(updatedColor);
    }, [event.color, event.participants, currentUserId]);

    const startDateTime = new Date(event.start);
    const endDateTime = new Date(event.end);
    const isCreator = currentUserId === event.creationByUserId;

    const isAllDay =
        startDateTime.getHours() === 0 &&
        startDateTime.getMinutes() === 0 &&
        endDateTime.getHours() === 23 &&
        endDateTime.getMinutes() === 59;

    const isSpecialCalendar = event.calendarType === "holidays" || event.calendarType === "birthdays";

    const typeIcons: { [key: string]: JSX.Element } = {
        meeting: <Video strokeWidth={3} className="w-4 h-4 mr-1 mt-0.5"/>,
        reminder: <BellRing strokeWidth={3} className="w-4 h-4 mr-1 mt-0.5"/>,
        task: <BookmarkCheck strokeWidth={3} className="w-4 h-4 mr-1 mt-0.5"/>,
    };

    const categoryIcons: { [key: string]: JSX.Element } = {
        work: <BriefcaseBusiness strokeWidth={3} className="w-4 h-4 mr-1"/>,
        home: <Sofa strokeWidth={3} className="w-4 h-4 mr-1"/>,
        hobby: <Palette strokeWidth={3} className="w-4 h-4 mr-1"/>,
    };

    const participantsWithoutCreator = event.participants.filter(
        (participant) => participant.id !== event.creator.id
    );

    const totalParticipants = event.participants.length;

    const statusIcons: { [key: string]: JSX.Element } = {
        yes: <Check className="w-4 h-4 text-green-500 bg-green-100 rounded-lg border"/>,
        no: <X className="w-4 h-4 text-red-500 bg-red-100 rounded-lg border"/>,
        maybe: (
            <div className="bg-gray-100 rounded-lg w-4 h-4 flex items-center justify-center border">
                <span className="text-black text-sm font-medium">?</span>
            </div>
        ),
    };

    const allParticipants = [...event.participants];
    const statusCounts = {
        yes: allParticipants.filter((p) => p.attendanceStatus === "yes").length,
        no: allParticipants.filter((p) => p.attendanceStatus === "no").length,
        maybe: allParticipants.filter((p) => p.attendanceStatus === "maybe").length,
        unanswered: allParticipants.filter((p) => !p.attendanceStatus).length,
    };

    const sortedParticipants = participantsWithoutCreator.sort((a, b) => {
        const order = {yes: 0, no: 1, maybe: 2, undefined: 3};
        const statusA = a.attendanceStatus || "undefined";
        const statusB = b.attendanceStatus || "undefined";
        return order[statusA] - order[statusB];
    });

    const handleAttendanceChange = (status: "yes" | "no" | "maybe" | undefined) => {
        if (currentUserId && onAttendanceChange) {
            onAttendanceChange(currentUserId, status);
        }
    };

    const currentUserStatus = event.participants.find((p) => p.id === currentUserId)?.attendanceStatus;

    const handleColorChange = async (newColor: string) => {
        if (!currentUserId) {
            return;
        }

        setColor(newColor);
        const eventId = parseInt(event.id, 10);
        const result = await updateEventColorApi(dispatch, eventId, newColor);
        if (result.success) {
            if (onColorChange) {
                onColorChange(event.id, newColor);
            }
        } else {
            setColor(initialColor);
        }
    };

    const getNotificationText = (minutes?: number) => {
        if (!minutes) return "No reminder";
        if (minutes === 10) return UiMessages.EVENTS.TEN_MINUTES;
        if (minutes === 30) return UiMessages.EVENTS.THIRTY_MINUTES;
        if (minutes === 60) return UiMessages.EVENTS.HOUR;
        if (minutes === 1440) return UiMessages.EVENTS.DAY;
        return `${minutes} minutes before`;
    };

    // Define the environment
    const isProduction = import.meta.env.PROD;

    // Configure the API URL based on the environment
    const BASE_AVATAR_URL = isProduction 
        ? '/profile-pictures/' // For production, use relative path
        : `${import.meta.env.VITE_API_BASE_URL}/profile-pictures/`; // For development

    return (
        <Popover open={true} onOpenChange={(open) => !open && onClose()}>
            <PopoverContent
                className="w-[390px] h-auto p-4 space-y-3 bg-white border rounded-lg shadow-lg"
                style={{position: "absolute", top: position.y, left: position.x}}
            >
                <div className="flex justify-between items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h3 className="text-lg font-semibold truncate max-w-[280px]">
                                    {event.title}
                                </h3>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{event.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="flex gap-2">
                        {isCreator && (
                            <>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="ghost" size="sm" onClick={onEdit} tabIndex={-1}>
                                                <Pencil className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit event</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant="ghost" size="sm" onClick={onDelete}>
                                                <Trash2 className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete event</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </>
                        )}
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>

                <div className="-mt-3 text-sm text-gray-600 flex items-center gap-3">
                    {format(startDateTime, "EEEE, MMMM d")}
                    {!isAllDay && (
                        <span>
                            {format(startDateTime, "HH:mm")} - {format(endDateTime, "HH:mm")}
                        </span>
                    )}
                </div>

                {event.description && (
                    <div className="text-sm text-gray-600 space-y-2">
                        <p>{event.description}</p>
                    </div>
                )}

                {(event.type || event.category || event.calendarTitle) && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        {event.type && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center">
                                            {typeIcons[event.type] || <Calendar className="w-4 h-4 mr-1"/>}
                                            <span className="px-1 capitalize">{event.type}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>Type</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        {event.category && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center">
                                            {categoryIcons[event.category] || <Briefcase className="w-4 h-4 mr-1"/>}
                                            <span className="px-1 capitalize">{event.category}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>Category</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        {event.calendarTitle && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CalendarFold strokeWidth={3} className="w-4 h-4 mr-1 flex-shrink-0"/>
                                            <span className="px-1 truncate max-w-[150px]">{event.calendarTitle}</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Calendar '{event.calendarTitle}'</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center text-sm text-gray-600">
                                    <BellRing strokeWidth={3} className="mr-1 h-4 w-4"/>
                                    <span className="px-1">{getNotificationText(event.notifyBeforeMinutes)}</span>

                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Reminder</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {!isSpecialCalendar && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                variant="outline"
                                                className="flex items-center w-13 h-7 border"
                                            >
                                                <div
                                                    className="-ml-4 w-4 h-4 rounded-xl"
                                                    style={{backgroundColor: color}}
                                                />
                                                <ChevronDownIcon className=" -mr-4 w-1 h-1 text-gray-500"/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="w-auto"
                                                        onOpenAutoFocus={(event) => event.preventDefault()}>
                                            <div className="flex gap-2">
                                                <ColorPicker selectedColor={color} onChange={handleColorChange}/>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TooltipTrigger>
                                <TooltipContent>Event color</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                {!isSpecialCalendar && (
                    <>
                        <div className="flex items-center text-sm text-gray-600">
                            <UsersRound strokeWidth={3} className="w-4 h-4 mr-1 mt-1"/>
                            <div>
                                <div className="flex items-center px-1">
                                    <span className="font-medium">
                                        {totalParticipants} participant{totalParticipants > 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="flex flex-wrap -mt-1 px-1">
                                    <span className="flex items-center">
                                        {[
                                            statusCounts.yes > 0 ? `${statusCounts.yes} yes` : null,
                                            statusCounts.no > 0 ? `${statusCounts.no} no` : null,
                                            statusCounts.maybe > 0 ? `${statusCounts.maybe} maybe` : null,
                                            statusCounts.unanswered > 0 ? `${statusCounts.unanswered} awaiting` : null,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`space-y-1 custom-scroll ${
                                sortedParticipants.length > 1
                                    ? "max-h-[121px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                                    : ""
                            }`}
                        >
                            <div className="flex items-center space-x-2 text-gray-600 relative">
                                <div className="relative">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={`${BASE_AVATAR_URL}${event.creator.profilePicture}`}
                                            alt={event.creator.fullName}
                                        />
                                    </Avatar>
                                    {event.creator.attendanceStatus && (
                                        <div className="absolute bottom-0 left-0 translate-x-[130%] translate-y-[10%]">
                                            {statusIcons[event.creator.attendanceStatus]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <p className="text-sm font-medium">{event.creator.fullName}</p>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Crown className="w-4 h-4 text-yellow-500"/>
                                                </TooltipTrigger>
                                                <TooltipContent>Owner</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-[12px] text-gray-500">{event.creator.email}</p>
                                </div>
                            </div>

                            {sortedParticipants.length > 0 && (
                                <div className="space-y-1">
                                    {sortedParticipants.map((participant) => (
                                        <div
                                            key={participant.id}
                                            className="flex items-center space-x-2 text-gray-600 relative"
                                        >
                                            <div className="relative">
                                                <Avatar className="h-8 w-8 rounded-lg">
                                                    <AvatarImage
                                                        src={`${BASE_AVATAR_URL}${participant.profilePicture}`}
                                                        alt={participant.fullName}
                                                    />
                                                </Avatar>
                                                {participant.attendanceStatus && (
                                                    <div
                                                        className="absolute bottom-0 left-0 translate-x-[130%] translate-y-[10%]">
                                                        {statusIcons[participant.attendanceStatus]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{participant.fullName}</p>
                                                <p className="text-[12px] text-gray-500">{participant.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {currentUserId && event.participants.some((p) => p.id === currentUserId) && !isCreator && (
                    <div className="translate-y-[15%] rounded-lg flex items-center gap-3">
                        <span className="text-[15px] text-gray-700">Will you attend?</span>
                        <div className="flex gap-2">
                            <Button
                                variant={currentUserStatus === "yes" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleAttendanceChange("yes")}
                                className="flex items-center gap-1"
                            >
                                <Check className="w-4 h-4"/>
                                Yes
                            </Button>
                            <Button
                                variant={currentUserStatus === "no" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleAttendanceChange("no")}
                                className="flex items-center gap-1"
                            >
                                <X className="w-4 h-4"/>
                                No
                            </Button>
                            <Button
                                variant={currentUserStatus === "maybe" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleAttendanceChange("maybe")}
                                className="flex items-center gap-1"
                            >
                                <div className="w-4 h-4 flex items-center justify-center">
                                    <span className="text-sm font-medium">?</span>
                                </div>
                                Maybe
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}