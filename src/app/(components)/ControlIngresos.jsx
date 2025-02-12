"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { parse } from "date-fns"
import { Calendar, DollarSign, Users, CreditCard, PieChart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabaseClient } from "@/supabase/client"


const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
]

const colorScheme = {
    X2: "#8884d8",
    X3: "#82ca9d",
    Libre: "#ffc658",
    Curso: "#ff7300",
}

// Función para simular la obtención de datos de una base de datos
const fetchDataFromDB = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { fecha: "01/01/2023", tipoPlan: "X2", monto: 100, modoPago: "Tarjeta" },
                { fecha: "05/01/2023", tipoPlan: "X3", monto: 150, modoPago: "Transferencia" },
                { fecha: "10/01/2023", tipoPlan: "Libre", monto: 200, modoPago: "PayPal" },
                { fecha: "15/01/2023", tipoPlan: "Curso", monto: 80, modoPago: "Tarjeta" },
                { fecha: "20/01/2023", tipoPlan: "X2", monto: 100, modoPago: "Transferencia" },
                { fecha: "01/02/2023", tipoPlan: "X3", monto: 150, modoPago: "Tarjeta" },
                { fecha: "10/02/2023", tipoPlan: "Libre", monto: 200, modoPago: "PayPal" },
                { fecha: "15/02/2023", tipoPlan: "Curso", monto: 80, modoPago: "Transferencia" },
                { fecha: "20/02/2023", tipoPlan: "X2", monto: 100, modoPago: "Tarjeta" },
                { fecha: "01/03/2023", tipoPlan: "X3", monto: 150, modoPago: "PayPal" },
            ])
        }, 1000) // Simula un retraso de 1 segundo
    })
}

export default function ControlIngresos() {
    const [selectedMonth, setSelectedMonth] = useState("1")
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [ingresos, setIngresos] = useState();

    useEffect(() => {

        const getSupabaseOficial = async () => {
            setIsLoading(true)

            let data = await supabaseClient
                .from("pagos")
                .select("*").order('id', { ascending: true })

            setData(data.data)
            setIsLoading(false)
        }

        // replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')
        getSupabaseOficial()
        // const loadData = async () => {
        //     setIsLoading(true)
        //     try {
        //         const fetchedData = await fetchDataFromDB()
        //         setData(fetchedData)
        //     } catch (error) {
        //         console.error("Error fetching data:", error)
        //     } finally {
        //         setIsLoading(false)
        //     }
        // }

        // loadData()
    }, [])

    // Filtrar datos basados en el mes seleccionado
    const filteredData = data.filter((item) => {
        const itemDate = parse(item.fechaPago, "dd/MM/yyyy", new Date())
        return itemDate.getMonth() === Number.parseInt(selectedMonth) - 1
    })

    // Calcular totales
    const totals = filteredData.reduce((acc, item) => {
        if (!acc[item.tipoPlan]) {
            acc[item.tipoPlan] = { count: 0, amount: 0 }
        }
        acc[item.tipoPlan].count++
        acc[item.tipoPlan].amount += Number(item.monto.replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, ''))
        return acc
    }, {})

    const totalMonto = Object.values(totals).reduce((acc, { amount }) => acc + amount, 0)
    const totalSuscripciones = Object.values(totals).reduce((acc, { count }) => acc + count, 0)

    // Datos para el gráfico
    const chartData = Object.entries(totals).map(([plan, { count, amount }]) => ({
        plan,
        count,
        amount,
    }))

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Cargando datos...</div>
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Panel de Planes y Cursos</h1>
                <div className="flex items-center space-x-2">
                    <Calendar className="text-gray-500" />
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[180px] text-black">
                            <SelectValue placeholder="Seleccionar mes" />
                        </SelectTrigger>
                        <SelectContent>
                            {meses.map((mes, index) => (
                                <SelectItem key={index + 1} value={(index + 1).toString()}>
                                    {mes}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(totals).map(([plan, { count, amount }]) => (
                    <Card key={plan} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{plan}</CardTitle>
                            <PieChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{count}</div>
                            <p className="text-xs text-muted-foreground">Total: ${amount.toLocaleString()}</p>
                            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${(count / totalSuscripciones) * 100}%`,
                                        backgroundColor: colorScheme[plan],
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Resumen de Suscripciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="plan" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="count" name="Cantidad" fill="#8884d8" />
                                <Bar yAxisId="right" dataKey="amount" name="Monto ($)" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                <Card className="col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Resumen General</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-around items-center">
                        <div className="text-center">
                            <Users className="h-8 w-8 mx-auto text-blue-500" />
                            <p className="mt-2 text-sm text-gray-600">Total Suscripciones</p>
                            <p className="text-3xl font-bold text-gray-800">{totalSuscripciones}</p>
                        </div>
                        <div className="text-center">
                            <DollarSign className="h-8 w-8 mx-auto text-green-500" />
                            <p className="mt-2 text-sm text-gray-600">Monto Total</p>
                            <p className="text-3xl font-bold text-gray-800">${totalMonto.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                            <CreditCard className="h-8 w-8 mx-auto text-purple-500" />
                            <p className="mt-2 text-sm text-gray-600">Promedio por Suscripción</p>
                            <p className="text-3xl font-bold text-gray-800">
                                ${totalSuscripciones > 0 ? (totalMonto / totalSuscripciones).toFixed(2) : "0.00"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalles de Suscripciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Tipo de Plan</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Modo de Pago</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.fechaPago}</TableCell>
                                    <TableCell>{item.tipoPlan}</TableCell>
                                    <TableCell>{item.monto.toLocaleString()}</TableCell>
                                    <TableCell>{item.modoPago}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}












// useEffect(() => {
// const getSupabaseOficial = async () => {
//     let data = await supabaseClient
//         .from("pagos")
//         .select("*").order('id', { ascending: true })

//     setIngresos(data.data)
// }

// // replace(/\./g, '').replace(/\$/g, '').replace(/[^0-9\.]/g, '')
// getSupabaseOficial()
// }, [])