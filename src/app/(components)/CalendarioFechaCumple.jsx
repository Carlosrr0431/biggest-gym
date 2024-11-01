"use client"

import { useState } from "react"
import { format, setYear, setMonth } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function CalendarioFechaCumple({ fecha, mes, ano, setFecha, setMes, setAno }) {

    const [open, setOpen] = useState(false)

    const anoActual = new Date().getFullYear()
    const anos = Array.from({ length: anoActual - 1939 }, (_, i) => anoActual - i)
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]

    const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

    const handleMesChange = (value) => {
        const nuevoMes = parseInt(value)
        setMes(nuevoMes)
        if (fecha) {
            setFecha(setMonth(fecha, nuevoMes))
        }
    }

    const handleAnoChange = (value) => {
        const nuevoAno = parseInt(value)
        setAno(nuevoAno)
        if (fecha) {
            setFecha(setYear(fecha, nuevoAno))
        }
    }

    const handleSelectDate = (selectedDate) => {
        setFecha(selectedDate)
        setOpen(false)
    }

    return (
        <div className="flex flex-col items-center space-y-4 mr-6">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] h-[40px] justify-start text-left font-normal",
                            "bg-white hover:bg-gray-100",
                            "text-gray-700 border border-gray-300 shadow-sm",
                            !fecha && "text-gray-400"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fecha ? format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                    <div className="flex justify-between items-center p-3 border-b">
                        <Select value={mes.toString()} onValueChange={handleMesChange}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Mes" />
                            </SelectTrigger>
                            <SelectContent>
                                {meses.map((nombre, index) => (
                                    <SelectItem key={index} value={index.toString()}>{nombre}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={ano.toString()} onValueChange={handleAnoChange}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Año" />
                            </SelectTrigger>
                            <SelectContent>
                                {anos.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Calendar
                        mode="single"
                        selected={fecha}
                        onSelect={handleSelectDate}
                        month={new Date(ano, mes)}
                        onMonthChange={(newMonth) => {
                            setMes(newMonth.getMonth())
                            setAno(newMonth.getFullYear())
                        }}
                        className="rounded-md border-none"
                        locale={es}
                        classNames={{
                            head_row: "flex border-b border-gray-200",
                            head_cell: "text-gray-500 font-medium text-sm w-9 h-9 flex items-center justify-center",
                            cell: cn(
                                "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:text-primary-foreground first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                "hover:bg-gray-100 rounded-full transition-colors"
                            ),
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today: "bg-accent text-accent-foreground",
                            day_outside: "text-gray-400 opacity-50",
                            day_disabled: "text-gray-400 opacity-50",
                            day_hidden: "invisible",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                        }}
                        components={{
                            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                            IconRight: () => <ChevronRight className="h-4 w-4" />,
                        }}
                        formatters={{
                            formatWeekday: (date) => {
                                return diasSemana[date.getDay()]
                            },
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}