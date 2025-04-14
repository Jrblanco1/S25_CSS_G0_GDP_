/**
 * Represents a bank account.
 */
export interface BankAccount {
  /**
   * The account ID.
   */
  accountId: string;
  /**
   * The account balance.
   */
  balance: number;
}

/**
 * Asynchronously retrieves bank account information.
 *
 * @param accountId The ID of the account to retrieve.
 * @returns A promise that resolves to a BankAccount object containing account information.
 */
export async function getBankAccount(accountId: string): Promise<BankAccount> {
  // TODO: Implement this by calling a Bank API.

  return {
    accountId: '1234567890',
    balance: 1000,
  };
}
