'use client';

import React, {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import FinancialDataDisplay from '@/components/financial-data-display';
import {getFinancialAdvice} from '@/ai/flows/financial-advice';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Icons} from '@/components/icons';

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

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const accountId = '1234567890';
  const [financialData, setFinancialData] = useState({expenses: 0, earnings: 0, typeOfExpenses: ''});

  useEffect(() => {
    // Generate initial random data
    const initialData = generateRandomData();
    setFinancialData(initialData);
  }, []);

  const handleLogin = () => {
    if (email === 'holubnyc@uiwtx.edu' && password === 'Qwerty1234') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleGetAdvice = async () => {
    setIsLoading(true);
    const adviceResult = await getFinancialAdvice({
      question: question,
      accountId: accountId,
      expenses: financialData.expenses,
      earnings: financialData.earnings,
      typeOfExpenses: financialData.typeOfExpenses,
    });
    setAdvice(adviceResult.advice);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {!isLoggedIn ? (
          <Card className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Enter your credentials to log in.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin}>Login</Button>
              {loginError && (
                <Alert variant="destructive">
                  <Icons.close className="h-4 w-4"/>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Invalid username or password. Please try again.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Data Visualization Card */}
            <Card className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
              <CardHeader>
                <CardTitle>Financial Data</CardTitle>
                <CardDescription>Expenses and Earnings Overview.</CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialDataDisplay expenses={financialData.expenses}
                  earnings={financialData.earnings}
                  typeOfExpenses={financialData.typeOfExpenses}/>
              </CardContent>
            </Card>

            {/* AI Chat Interface Card */}
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>AI Financial Advisor</CardTitle>
                <CardDescription>Ask questions and get financial advice.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Textarea
                  placeholder="Ask me anything..."
                  className="mb-2"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                />
                <Button onClick={handleGetAdvice} disabled={isloading}>
                  {isloading ? 'Loading...' : 'Get Advice'}
                </Button>
                {advice && (
                  <div className="mt-4">
                    <CardDescription>
                      {advice}
                    </CardDescription>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
