'use server';

/**
 * @fileOverview Summarizes user's financial data to provide key insights and trends.
 *
 * - summarizeFinancialData - A function that summarizes financial data.
 * - SummarizeFinancialDataInput - The input type for the summarizeFinancialData function.
 * - SummarizeFinancialDataOutput - The return type for the summarizeFinancialData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getBankAccount, BankAccount} from '@/services/bank';

const SummarizeFinancialDataInputSchema = z.object({
  accountId: z.string().describe('The ID of the bank account to summarize.'),
  expenses: z.string().describe('The user expenses data.'),
  earnings: z.string().describe('The user earnings data.'),
});
export type SummarizeFinancialDataInput = z.infer<typeof SummarizeFinancialDataInputSchema>;

const SummarizeFinancialDataOutputSchema = z.object({
  summary: z.string().describe('The summary of the financial data.'),
  keyInsights: z.string().describe('The key insights from the financial data.'),
  trends: z.string().describe('The trends observed in the financial data.'),
});
export type SummarizeFinancialDataOutput = z.infer<typeof SummarizeFinancialDataOutputSchema>;

export async function summarizeFinancialData(input: SummarizeFinancialDataInput): Promise<SummarizeFinancialDataOutput> {
  return summarizeFinancialDataFlow(input);
}

const getBankAccountDetails = ai.defineTool({
  name: 'getBankAccountDetails',
  description: 'Retrieves bank account details given an account ID.',
  inputSchema: z.object({
    accountId: z.string().describe('The ID of the bank account.'),
  }),
  outputSchema: z.object({
    accountId: z.string().describe('The account ID.'),
    balance: z.number().describe('The account balance.'),
  }),
}, async input => {
  return await getBankAccount(input.accountId);
});

const prompt = ai.definePrompt({
  name: 'summarizeFinancialDataPrompt',
  tools: [getBankAccountDetails],
  input: {
    schema: z.object({
      accountId: z.string().describe('The ID of the bank account to summarize.'),
      expenses: z.string().describe('The user expenses data.'),
      earnings: z.string().describe('The user earnings data.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the financial data.'),
      keyInsights: z.string().describe('The key insights from the financial data.'),
      trends: z.string().describe('The trends observed in the financial data.'),
    }),
  },
  prompt: `You are a financial advisor. You will summarize the financial data provided by the user, identify key insights, and highlight trends.

  First, if the user provides an accountId, use the getBankAccountDetails tool to retrieve the account balance. If the user does not provide an accountId, skip this step.

  Then, use the following information about expenses and earning to provide financial advice.
  Expenses: {{{expenses}}}
  Earnings: {{{earnings}}}
  `,    
});

const summarizeFinancialDataFlow = ai.defineFlow<
  typeof SummarizeFinancialDataInputSchema,
  typeof SummarizeFinancialDataOutputSchema
>({
  name: 'summarizeFinancialDataFlow',
  inputSchema: SummarizeFinancialDataInputSchema,
  outputSchema: SummarizeFinancialDataOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
