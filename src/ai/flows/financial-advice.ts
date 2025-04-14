'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing financial advice based on user data.
 *
 * It exports:
 * - `getFinancialAdvice`: A function to trigger the financial advice flow.
 * - `FinancialAdviceInput`: The input type for the `getFinancialAdvice` function.
 * - `FinancialAdviceOutput`: The output type for the `getFinancialAdvice` function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getBankAccount} from '@/services/bank';

const FinancialAdviceInputSchema = z.object({
  question: z.string().describe('The user\u0027s question about financial advice.'),
  accountId: z.string().describe('The user\u0027s bank account ID.'),
  expenses: z.number().describe('The user expenses data.'),
  earnings: z.number().describe('The user earnings data.'),
  typeOfExpenses: z.string().describe('The user expenses type.'),
});

export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The financial advice provided by the AI.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}

const financialAdvicePrompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The user\u0027s question about financial advice.'),
      balance: z.number().describe('The user\u0027s bank account balance.'),
      expenses: z.number().describe('The user expenses data.'),
      earnings: z.number().describe('The user earnings data.'),
      typeOfExpenses: z.string().describe('The user expenses type.'),
      isFinancialQuestion: z.boolean().describe('Indicates if the user question is related to their financial data.'),
    }),
  },
  output: {
    schema: z.object({
      advice: z.string().describe('The financial advice provided by the AI.'),
    }),
  },
  prompt: `You are a financial advisor. A user has asked the following question: {{{question}}}.\n\nConsidering their bank account balance is {{{balance}}}, their expenses are {{{expenses}}}, their earnings are {{{earnings}}}, and their type of expenses are {{{typeOfExpenses}}}, what advice would you give them? If the question is not related to financial advice, respond with "I can only provide advice related to your financial data."`,
});

const isFinancialQuestionPrompt = ai.definePrompt({
  name: 'isFinancialQuestionPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The user\u0027s question.'),
    }),
  },
  output: {
    schema: z.object({
      isFinancialQuestion: z.boolean().describe('Whether or not the question is related to financial data.'),
    }),
  },
  prompt: `Determine whether the following question is related to financial data.
Question: {{{question}}}
Is the question related to financial data? Answer with true or false.`,
});

const financialAdviceFlow = ai.defineFlow<
  typeof FinancialAdviceInputSchema,
  typeof FinancialAdviceOutputSchema
>({
  name: 'financialAdviceFlow',
  inputSchema: FinancialAdviceInputSchema,
  outputSchema: FinancialAdviceOutputSchema,
}, async input => {
  const isFinancialOutput = await isFinancialQuestionPrompt({
    question: input.question,
  });

  const bankAccount = await getBankAccount(input.accountId);
  const {output} = await financialAdvicePrompt({
    question: input.question,
    balance: bankAccount.balance,
    expenses: input.expenses,
    earnings: input.earnings,
    typeOfExpenses: input.typeOfExpenses,
    isFinancialQuestion: isFinancialOutput!.isFinancialQuestion,
  });
  return output!;
});
