"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", visitors: 1000 },
  { name: "Feb", visitors: 1200 },
  { name: "Mar", visitors: 1500 },
  { name: "Apr", visitors: 1800 },
  { name: "May", visitors: 2000 },
  { name: "Jun", visitors: 2200 },
]

export function VisitorChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

