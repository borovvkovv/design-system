export enum InactiveRule {
  TestBetween2023And2026 = 'between20232026',
  TestJune2024NotAllowed = 'juneNotAllowed',
  TestAllFifthDays2024NotAllowed = 'fifthDayNotAllowed',
}

export const isInactiveRules: { [Value in InactiveRule]: (date: Date) => boolean } = {
  [InactiveRule.TestBetween2023And2026]: (date) => date.getFullYear() < 2023 || date.getFullYear() > 2026,
  [InactiveRule.TestJune2024NotAllowed]: (date) => date.getMonth() === 5 && date.getFullYear() === 2024,
  [InactiveRule.TestAllFifthDays2024NotAllowed]: (date) => date.getDate() === 5 && date.getFullYear() === 2024,
};

export const inactiveRuleErrorTexts: { [Value in InactiveRule]: string } = {
  [InactiveRule.TestBetween2023And2026]: 'Допустимы года с 2023 по 2026',
  [InactiveRule.TestJune2024NotAllowed]: 'Не допутсимо указывать июнь 2024 года',
  [InactiveRule.TestAllFifthDays2024NotAllowed]: 'Не допустимо указывать пятые числа 2024 года',
};
