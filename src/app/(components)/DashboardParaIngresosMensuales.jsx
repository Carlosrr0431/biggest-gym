'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CalendarIcon } from 'lucide-react'

// Simulación de datos
const generateData = (month) => ({



    planX2: { inscriptos: Math.floor(Math.random() * 100), total: Math.floor(Math.random() * 10000) },
    planX3: { inscriptos: Math.floor(Math.random() * 100), total: Math.floor(Math.random() * 10000) },
    planLibre: { inscriptos: Math.floor(Math.random() * 100), total: Math.floor(Math.random() * 10000) },
    cursos: { inscriptos: Math.floor(Math.random() * 100), total: Math.floor(Math.random() * 10000) },
})

export default function Dashboard() {
    const [selectedMonth, setSelectedMonth] = useState('enero')
    const data = generateData(selectedMonth)

    const totalInscriptos = Object.values(data).reduce((sum, plan) => sum + plan.inscriptos, 0)
    const totalMonto = Object.values(data).reduce((sum, plan) => sum + plan.total, 0)

    const PlanCard = ({ title, inscriptos, total }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{inscriptos}</div>
                <p className="text-xs text-muted-foreground">
                    Total: ${total.toLocaleString()}
                </p>
            </CardContent>
        </Card>
    )

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard de Inscripciones</h1>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px]">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Seleccionar mes" />
                    </SelectTrigger>
                    <SelectContent>
                        {['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'].map((month) => (
                            <SelectItem key={month} value={month}>
                                {month.charAt(0).toUpperCase() + month.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PlanCard title="Plan x2" inscriptos={data.planX2.inscriptos} total={data.planX2.total} />
                <PlanCard title="Plan x3" inscriptos={data.planX3.inscriptos} total={data.planX3.total} />
                <PlanCard title="Plan Libre" inscriptos={data.planLibre.inscriptos} total={data.planLibre.total} />
                <PlanCard title="Cursos" inscriptos={data.cursos.inscriptos} total={data.cursos.total} />
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Total de Todos los Planes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Inscriptos: {totalInscriptos}</div>
                    <p className="text-muted-foreground">
                        Monto Total: ${totalMonto.toLocaleString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}