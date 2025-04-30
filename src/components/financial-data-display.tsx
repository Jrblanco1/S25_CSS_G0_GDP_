'use client';

import React, {useState, useEffect} from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

interface DataItem {
  name: string;
  expenses: number;
  earnings: number;
  typeOfExpenses: string;
}

// Define types for expense categories
const expenseCategories = ['Food', 'Rent', 'Travel', 'Entertainment', 'Utilities'];

// Helper function to generate a random number within a range
const getRandomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Helper function to generate random data for expenses and earnings
const generateRandomData = () => {
  const expenses = getRandomValue(50, 500);
  const earnings = getRandomValue(200, 1000);
  const typeOfExpenses = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];

  return {
    expenses,
    earnings,
    typeOfExpenses,
  };
};

// Function to generate daily data
const generateDailyData = (): DataItem[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    ...generateRandomData(),
  }));
};

// Function to generate weekly data
const generateWeeklyData = (): DataItem[] => {
  return Array.from({length: 4}, (_, i) => ({
    name: `Week ${i + 1}`,
    ...generateRandomData(),
  }));
};

// Function to generate monthly data
const generateMonthlyData = (): DataItem[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    ...generateRandomData(),
  }));
};

// Function to generate yearly data
const generateYearlyData = (): DataItem[] => {
  const years = ['2021', '2022', '2023', '2024'];
  return years.map(year => ({
    name: year,
    ...generateRandomData(),
  }));
};

interface FinancialDataDisplayProps {
  expenses: number;
  earnings: number;
  typeOfExpenses: string;
}

const FinancialDataDisplay: React.FC<FinancialDataDisplayProps> = ({expenses, earnings, typeOfExpenses}) => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [dailyData, setDailyData] = useState<DataItem[]>(generateDailyData());
  const [weeklyData, setWeeklyData] = useState<DataItem[]>(generateWeeklyData());
  const [monthlyData, setMonthlyData] = useState<DataItem[]>(generateMonthlyData());
  const [yearlyData, setYearlyData] = useState<DataItem[]>(generateYearlyData());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Generate initial random data
    setDailyData(generateDailyData());
    setWeeklyData(generateWeeklyData());
    setMonthlyData(generateMonthlyData());
    setYearlyData(generateYearlyData());
  }, []);

  const data =
    timePeriod === 'daily'
      ? dailyData
      : timePeriod === 'weekly'
        ? weeklyData
        : timePeriod === 'monthly'
          ? monthlyData
          : yearlyData;

  // Filter data by selected category
  const filteredData = selectedCategory === 'All' ? data : data.filter(item => item.typeOfExpenses === selectedCategory);

  const hasData = filteredData.length > 0;

  return (
    <div>
      <Tabs value={timePeriod} onValueChange={setTimePeriod} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        {/* Category Filter */}
        <div>
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <TabsContent value="daily">
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="expenses" stroke="#8884d8" name="Expenses" formatter={(value) => value.toFixed(2)}/>
                <Line type="monotone" dataKey="earnings" stroke="#82ca9d" name="Earnings" formatter={(value) => value.toFixed(2)}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>The data is not available for this day.</div>
          )}
        </TabsContent>
        <TabsContent value="weekly">
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="expenses" fill="#8884d8" name="Expenses" formatter={(value) => value.toFixed(2)}/>
                <Bar dataKey="earnings" fill="#82ca9d" name="Earnings" formatter={(value) => value.toFixed(2)}/>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div>The data is not available for this week.</div>
          )}
        </TabsContent>
        <TabsContent value="monthly">
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="expenses" stroke="#8884d8" name="Expenses" formatter={(value) => value.toFixed(2)}/>
                <Line type="monotone" dataKey="earnings" stroke="#82ca9d" name="Earnings" formatter={(value) => value.toFixed(2)}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>The data is not available for this month.</div>
          )}
        </TabsContent>
        <TabsContent value="yearly">
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="expenses" fill="#8884d8" name="Expenses" formatter={(value) => value.toFixed(2)}/>
                <Bar dataKey="earnings" fill="#82ca9d" name="Earnings" formatter={(value) => value.toFixed(2)}/>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div>The data is not available for this year.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDataDisplay;
