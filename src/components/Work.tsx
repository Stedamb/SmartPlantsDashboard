"use client"

import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
} from '@/components/ui/chart';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    Label,
} from 'recharts';
type ChartConfig = Record<string, { label: string; color?: string }>;
// Line chart configuration
const lineChartConfig = {
    line: {
        label: 'Sensor Data',
        color: 'hsl(var(--chart-1))',
    },
};

const radialChartConfig = {
    percentage: {
        label: 'Percentage',
    },
};

export function Work() {
    const [lineChartData, setLineChartData] = useState<{ timestamp: string; value: number }[]>([]);
    const [radialChartData, setRadialChartData] = useState<{ browser: string; visitors: number; fill: string }[]>([
        { browser: "safari", visitors: 0, fill: "hsl(var(--chart-1))" }
    ]);
    const [endAngle, setEndAngle] = useState(360);

    useEffect(() => {
        // Dynamically load the grandeur-js script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/grandeur-js';
        script.onload = () => {
            const project = (window as any).grandeur.init(
                'grandeurlzyjijbs0w640ik9cog43v6x',
                'e60f9f8bf9fd76d4a4350137b3f38832e068d6e565bfd96de6943702cc72c253',
                'f6cd9f58726b4da58619a7fd4154d8c17c6855d16d1aebbc091e55f3e46d243a'
            );

            project.auth().token('f6cd9f58726b4da58619a7fd4154d8c17c6855d16d1aebbc091e55f3e46d243a').then(() => {
                project.devices().device('devicelzzqxida1h8v0ik9655nc4og').data().on('percentageValue', (path: string, value: any) => {
                    const newPercentageValue = Number(value);

                    // Update the line chart data with timestamp
                    setLineChartData((prevData) => {
                        const newData = [
                            ...prevData,
                            { timestamp: new Date().toLocaleTimeString(), value: newPercentageValue }
                        ];

                        // Keep only the last 10 entries
                        if (newData.length > 10) {
                            return newData.slice(-10);
                        }

                        return newData;
                    });

                   // Calculate endAngle based on the newPercentageValue
                   const newEndAngle = 360 * (newPercentageValue / 100);

                    // Update the radial chart data
                    setRadialChartData([
                        { browser: "safari", visitors: newPercentageValue, fill: "hsl(var(--chart-2))" }
                    ]);
                    setEndAngle(newEndAngle);
                });
            }).catch((error: Error) => {
                console.error('Login failed:', error);
            });
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    // Get the latest timestamp for the footer
    const lastTimestamp = lineChartData.length > 0 ? lineChartData[lineChartData.length - 1].timestamp : '...';

    return (
        <div className="container-xl flex flex-wrap items-start justify-center">
            <div className="w-full lg:w-1/2 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Soil Moisture Variation</CardTitle>
                        <CardDescription>Sensor data updates every 5 seconds</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={lineChartConfig}>
                            <LineChart
                                data={lineChartData}
                                margin={{ left: 12, right: 12 }}
                                width={600}
                                height={300}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="timestamp"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    dataKey="value"
                                    type="monotone"
                                    stroke={lineChartConfig.line.color}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full lg:w-1/2 p-4">
            {/* Radial Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Soil Moisture Percentage</CardTitle>
                    <CardDescription>Sensor data updates every 5 seconds</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={radialChartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <RadialBarChart
                            data={radialChartData}
                            startAngle={0}
                            endAngle={endAngle}
                            innerRadius={80}
                            outerRadius={110}
                        >
                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-muted last:fill-background"
                                polarRadius={[86, 74]}
                            />
                            <RadialBar dataKey="visitors" background cornerRadius={10} />
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-white text-4xl font-bold"
                                                    >
                                                        {radialChartData[0].visitors.toFixed(1)}%
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Moisture
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PolarRadiusAxis>
                        </RadialBarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Updated at {lastTimestamp} <TrendingUp className="h-4 w-4" />
                    </div>
                </CardFooter>
            </Card>
        </div>
        </div >
    );
}
